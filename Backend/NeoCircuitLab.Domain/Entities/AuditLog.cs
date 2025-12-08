using NeoCircuitLab.Domain.Common;

namespace NeoCircuitLab.Domain.Entities;

public class AuditLog : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty; // CREATE, UPDATE, DELETE
    public string EntityName { get; set; } = string.Empty; // Cliente, Equipo, Orden
    public string EntityId { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    // Optional: Snapshot of data
    public string? OldValues { get; set; }
    public string? NewValues { get; set; }

    public AuditLog() { }

    public AuditLog(string userId, string userName, string action, string entityName, string entityId, string details)
    {
        UserId = userId;
        UserName = userName;
        Action = action;
        EntityName = entityName;
        EntityId = entityId;
        Details = details;
        CreatedAt = DateTime.UtcNow;
    }
}
