namespace PgHub.LoggingService.Model
{
    public class LogRequest
    {
        public string Service { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }
        public string Context { get; set; }
    }
}
