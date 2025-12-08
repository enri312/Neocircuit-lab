using NeoCircuitLab.Application.DTOs;

namespace NeoCircuitLab.Application.Interfaces;

public interface IClienteService
{
    Task<IEnumerable<ClienteDto>> GetAllAsync();
    Task<ClienteDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClienteDto>> SearchAsync(string term);
    Task<IEnumerable<ClienteDto>> GetByCategoriaAsync(string categoria);
    Task<ClienteDto> CreateAsync(CreateClienteDto dto);
    Task<ClienteDto?> UpdateAsync(Guid id, UpdateClienteDto dto);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ChangeCategoriaAsync(Guid id, string nuevaCategoria);
}
