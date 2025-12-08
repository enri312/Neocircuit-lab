using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Application.Interfaces;

public interface IEquipoService
{
    Task<IEnumerable<EquipoDto>> GetAllAsync();
    Task<EquipoDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<EquipoDto>> GetByClienteIdAsync(Guid clienteId);
    Task<EquipoDto> CreateAsync(CreateEquipoDto createEquipoDto);
    Task<EquipoDto?> UpdateAsync(Guid id, UpdateEquipoDto updateEquipoDto);
    Task<bool> DeleteAsync(Guid id);
}
