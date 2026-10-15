# PgHub Logging Microservice (.NET)

A tiny, standalone ASP.NET Core web API. The Spring Boot backend calls it
whenever something notable happens (registration, login, a booking or
payment, a complaint) so those events land here too — a small example of
one service talking to another over plain HTTP, the way real microservices do.

## What it does
- `POST /api/logs` — receives one log entry `{ service, level, message, context }`,
  stamps it with a timestamp, keeps the most recent 2000 in memory, and also
  appends it to a file on disk (`logs/pghub-YYYY-MM-DD.log`) so nothing is
  lost if the service restarts.
- `GET /api/logs?level=&service=&limit=` — read back recent log entries,
  optionally filtered by level (INFO/WARN/ERROR) or service name.
- `GET /health` — simple health check.
- Every request is also appended, one plain line at a time, to
  `logs/requests.txt` — handy to just `tail -f` while developing.

Storage is intentionally simple (a plain in-memory list, not a database) —
that's enough for local development. Swap in a real database later if you
want the log history to be queryable at scale.

## Prerequisites
Install the [.NET 10 SDK](https://dotnet.microsoft.com/download) if you don't
have it: `dotnet --version` should print `10.x.x`. Run `dotnet --list-runtimes`
to confirm a `Microsoft.NETCore.App 10.x.x` entry is present — that's the
runtime this project actually needs to launch, separate from the SDK used
to build it.

## Run it
```bash
cd pghub-logging-service
dotnet run
```
It starts on **http://localhost:5101** (see `Properties/launchSettings.json`).

## Try it
```bash
# Send a test log entry
curl -X POST http://localhost:5101/api/logs \
  -H "Content-Type: application/json" \
  -d '{"service":"pghub-backend","level":"INFO","message":"Test log entry"}'

# Read recent entries back
curl http://localhost:5101/api/logs
```

## How the Spring Boot backend talks to it
See `LogClientService.java` in the backend — it POSTs here whenever a
notable event happens. The call is wrapped in a try/catch and given a short
timeout, so **if this service isn't running, the main app keeps working
normally** — it just won't have activity logs for that stretch. You'll see
a one-line "could not reach logging service" warning in the Spring Boot
console when that happens. Set `app.logging-service.enabled=false` in the
backend's `application.properties` to skip calling it entirely.

## Reading the code
Everything lives in one file, `Program.cs`, split into two halves:
1. **Top half** — the actual web API: which URLs exist and what they do.
2. **Bottom half** — three plain C# classes (`LogEntryRequest`, `LogEntry`,
   `LogStore`) with no framework magic — just a list, a lock, and a couple
   of files being written to. Read `LogStore` first; everything else calls into it.
