using Microsoft.EntityFrameworkCore;
using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Cliente> Clientes { get; }
    DbSet<AuditLog> AuditLogs { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
