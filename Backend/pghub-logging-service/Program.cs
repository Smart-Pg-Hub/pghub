using Steeltoe.Discovery.Eureka;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEurekaDiscoveryClient();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                      ?? new[] { "http://localhost:5173", "http://localhost:8080" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowConfigured", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<LogStore>();

var app = builder.Build();

app.UseCors("AllowConfigured");

app.MapGet("/health", () =>
    Results.Ok(new
    {
        status = "UP",
        service = "pghub-logging-service"
    }));

app.MapControllers();

app.MapGet("/", () =>
    Results.Ok(new
    {
        service = "pghub-logging-service",
        endpoints = new[]
        {
            "GET /health",
            "POST /api/logs",
            "GET /api/logs"
        }
    }));

app.Run("http://localhost:5101");

public class LogEntry
{
    public string Id { get; set; } = "";
    public DateTimeOffset Timestamp { get; set; }
    public string Service { get; set; } = "";
    public string Level { get; set; } = "";
    public string Message { get; set; } = "";
    public string? Context { get; set; }
}

public class LogStore
{
    private const int MaxEntriesToKeep = 2000;

    private readonly List<LogEntry> _entries = new();
    private readonly object _lock = new();
    private readonly string _logDirectory;

    public LogStore(IConfiguration config)
    {
        _logDirectory = config["Logging:FileDirectory"] ?? "logs";
        Directory.CreateDirectory(_logDirectory);
    }

    public void Add(LogEntry entry)
    {
        lock (_lock)
        {
            _entries.Add(entry);

            while (_entries.Count > MaxEntriesToKeep)
            {
                _entries.RemoveAt(0);
            }
        }

        string logLine =
            $"{entry.Timestamp:O} [{entry.Level}] ({entry.Service}) {entry.Message}";

        if (entry.Context != null)
        {
            logLine += $" | context={entry.Context}";
        }

        string todaysLogFile = Path.Combine(
            _logDirectory,
            $"pghub-{DateTime.UtcNow:yyyy-MM-dd}.log"
        );

        AppendLineToFile(todaysLogFile, logLine);
    }

    public List<LogEntry> GetRecent(
        int limit,
        string? level,
        string? service)
    {
        if (limit < 1)
            limit = 1;

        if (limit > MaxEntriesToKeep)
            limit = MaxEntriesToKeep;

        var matches = new List<LogEntry>();

        lock (_lock)
        {
            for (int i = _entries.Count - 1;
                 i >= 0 && matches.Count < limit;
                 i--)
            {
                LogEntry entry = _entries[i];

                if (level != null &&
                    !entry.Level.Equals(
                        level,
                        StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                if (service != null &&
                    !entry.Service.Equals(
                        service,
                        StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                matches.Add(entry);
            }
        }

        return matches;
    }

    public void WriteAccessLogLine(string line)
    {
        string timestamp =
            DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

        string fileName =
            Path.Combine(_logDirectory, "requests.txt");

        AppendLineToFile(
            fileName,
            $"{timestamp} - {line}"
        );
    }

    private void AppendLineToFile(
        string fileName,
        string line)
    {
        lock (_lock)
        {
            File.AppendAllText(
                fileName,
                line + Environment.NewLine
            );
        }
    }
}