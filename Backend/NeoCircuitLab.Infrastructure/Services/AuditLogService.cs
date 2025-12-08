using Microsoft.EntityFrameworkCore;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Infrastructure.Data;

namespace NeoCircuitLab.Infrastructure.Services;

public class AuditLogService : IAuditLogService
{
    private readonly ApplicationDbContext _context;

    public AuditLogService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(string userId, string userName, string action, string entityName, string entityId, string details, string? oldValues = null, string? newValues = null)
    {
        var log = new AuditLog(userId, userName, action, entityName, entityId, details)
        {
            OldValues = oldValues,
            NewValues = newValues
        };

        _context.Set<AuditLog>().Add(log);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<AuditLog>> GetLogsByEntityIdAsync(string entityId)
    {
        return await _context.Set<AuditLog>()
            .Where(x => x.EntityId == entityId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<AuditLog>> GetLogsByUserIdAsync(string userId)
    {
        return await _context.Set<AuditLog>()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<AuditLog>> GetRecentLogsAsync(int count = 50)
    {
        return await _context.Set<AuditLog>()
            .OrderByDescending(x => x.CreatedAt)
            .Take(count)
            .ToListAsync();
    }
}
