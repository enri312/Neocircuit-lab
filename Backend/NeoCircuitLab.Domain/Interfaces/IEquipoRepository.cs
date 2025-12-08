using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Domain.Interfaces;

public interface IEquipoRepository
{
    Task<Equipo?> GetByIdAsync(Guid id);
    Task<IEnumerable<Equipo>> GetAllAsync();
    Task<IEnumerable<Equipo>> GetByClienteIdAsync(Guid clienteId);
    Task<Equipo?> GetByNumeroSerieAsync(string numeroSerie);
    Task AddAsync(Equipo equipo);
    Task UpdateAsync(Equipo equipo);
    Task DeleteAsync(Guid id);
}
