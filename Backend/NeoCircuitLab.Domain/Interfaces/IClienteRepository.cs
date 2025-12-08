using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Domain.Interfaces;

public interface IClienteRepository
{
    Task<Cliente?> GetByIdAsync(Guid id);
    Task<IEnumerable<Cliente>> GetAllAsync();
    Task AddAsync(Cliente cliente);
    Task UpdateAsync(Cliente cliente);
    Task DeleteAsync(Cliente cliente);
}
