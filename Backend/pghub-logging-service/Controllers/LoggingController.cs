using Microsoft.AspNetCore.Mvc;
using PgHub.LoggingService.Model;

namespace PgHub.LoggingService.Controllers
{
    [Route("api/logs")]
    [ApiController]
    public class LoggingController : ControllerBase
    {
        private readonly LogStore _store;

        public LoggingController(LogStore store)
        {
            _store = store;
        }

        [HttpPost]
        public IActionResult CreateLog([FromBody] LogRequest request)
        {
            _store.WriteAccessLogLine("POST /api/logs");

            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new
                {
                    error = "message is required"
                });
            }

            var entry = new LogEntry
            {
                Id = Guid.NewGuid().ToString("N"),
                Timestamp = DateTimeOffset.UtcNow,
                Service = string.IsNullOrWhiteSpace(request.Service)
                    ? "pghub-backend"
                    : request.Service,
                Level = string.IsNullOrWhiteSpace(request.Level)
                    ? "INFO"
                    : request.Level.ToUpperInvariant(),
                Message = request.Message,
                Context = request.Context
            };

            _store.Add(entry);

            return Created($"/api/logs/{entry.Id}", entry);
        }

        [HttpGet]
        public IActionResult GetLogs(int? limit, string? level, string? service)
        {
            _store.WriteAccessLogLine("GET /api/logs");

            return Ok(_store.GetRecent(
                limit ?? 100,
                level,
                service
            ));
        }
    }
}