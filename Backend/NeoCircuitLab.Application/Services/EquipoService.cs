using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Interfaces;

namespace NeoCircuitLab.Application.Services;

public class EquipoService : IEquipoService
{
    private readonly IEquipoRepository _equipoRepository;
    private readonly IClienteRepository _clienteRepository;

    public EquipoService(IEquipoRepository equipoRepository, IClienteRepository clienteRepository)
    {
        _equipoRepository = equipoRepository;
        _clienteRepository = clienteRepository;
    }

    public async Task<IEnumerable<EquipoDto>> GetAllAsync()
    {
        var equipos = await _equipoRepository.GetAllAsync();
        return equipos.Select(MapToDto);
    }

    public async Task<EquipoDto?> GetByIdAsync(Guid id)
    {
        var equipo = await _equipoRepository.GetByIdAsync(id);
        return equipo == null ? null : MapToDto(equipo);
    }

    public async Task<IEnumerable<EquipoDto>> GetByClienteIdAsync(Guid clienteId)
    {
        var equipos = await _equipoRepository.GetByClienteIdAsync(clienteId);
        return equipos.Select(MapToDto);
    }

    public async Task<EquipoDto> CreateAsync(CreateEquipoDto dto)
    {
        var cliente = await _clienteRepository.GetByIdAsync(dto.ClienteId);
        if (cliente == null)
            throw new Exception("Cliente no encontrado");

        var equipo = new Equipo(
            dto.ClienteId,
            dto.Marca,
            dto.Modelo,
            dto.Tipo,
            dto.NumeroSerie,
            dto.EstadoFisico,
            dto.Notas,
            dto.PasswordDispositivo
        );

        await _equipoRepository.AddAsync(equipo);
        return MapToDto(equipo);
    }

    public async Task<EquipoDto?> UpdateAsync(Guid id, UpdateEquipoDto dto)
    {
        var equipo = await _equipoRepository.GetByIdAsync(id);
        if (equipo == null) return null;

        equipo.ActualizarInformacion(
            dto.Marca,
            dto.Modelo,
            dto.Tipo,
            dto.NumeroSerie,
            dto.EstadoFisico,
            dto.Notas,
            dto.PasswordDispositivo
        );

        await _equipoRepository.UpdateAsync(equipo);
        return MapToDto(equipo);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var equipo = await _equipoRepository.GetByIdAsync(id);
        if (equipo == null) return false;

        await _equipoRepository.DeleteAsync(id);
        return true;
    }

    private static EquipoDto MapToDto(Equipo equipo)
    {
        return new EquipoDto
        {
            Id = equipo.Id,
            ClienteId = equipo.ClienteId,
            Marca = equipo.Marca,
            Modelo = equipo.Modelo,
            Tipo = equipo.Tipo,
            NumeroSerie = equipo.NumeroSerie,
            EstadoFisico = equipo.EstadoFisico,
            Notas = equipo.Notas,
            PasswordDispositivo = equipo.PasswordDispositivo,
            CreatedAt = equipo.CreatedAt,
            ClienteNombre = equipo.Cliente?.Nombre
        };
    }
}
