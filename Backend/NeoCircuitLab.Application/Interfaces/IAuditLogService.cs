using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Application.Interfaces;

public interface IAuditLogService
{
    Task LogAsync(string userId, string userName, string action, string entityName, string entityId, string details, string? oldValues = null, string? newValues = null);
    Task<IEnumerable<AuditLog>> GetLogsByEntityIdAsync(string entityId);
    Task<IEnumerable<AuditLog>> GetLogsByUserIdAsync(string userId);
    Task<IEnumerable<AuditLog>> GetRecentLogsAsync(int count = 50);
}
