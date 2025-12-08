using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Enums;
using NeoCircuitLab.Domain.Interfaces;

namespace NeoCircuitLab.Application.Services;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;

    public ClienteService(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ClienteDto>> GetAllAsync()
    {
        var clientes = await _repository.GetAllAsync();
        return clientes.Select(MapToDto);
    }

    public async Task<ClienteDto?> GetByIdAsync(Guid id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        return cliente == null ? null : MapToDto(cliente);
    }

    public async Task<IEnumerable<ClienteDto>> SearchAsync(string term)
    {
        var clientes = await _repository.GetAllAsync();
        var filtered = clientes.Where(c =>
            c.Nombre.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            c.CedulaRuc.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            (c.Telefono != null && c.Telefono.Contains(term, StringComparison.OrdinalIgnoreCase)));
        return filtered.Select(MapToDto);
    }

    public async Task<IEnumerable<ClienteDto>> GetByCategoriaAsync(string categoria)
    {
        var clientes = await _repository.GetAllAsync();
        if (Enum.TryParse<CategoriaCliente>(categoria, true, out var cat))
        {
            return clientes.Where(c => c.Categoria == cat).Select(MapToDto);
        }
        return [];
    }

    public async Task<ClienteDto> CreateAsync(CreateClienteDto dto)
    {
        var cliente = new Cliente(dto.Nombre, dto.CedulaRuc, dto.Telefono, dto.Email, dto.Direccion);
        await _repository.AddAsync(cliente);
        return MapToDto(cliente);
    }

    public async Task<ClienteDto?> UpdateAsync(Guid id, UpdateClienteDto dto)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return null;

        cliente.ActualizarDatos(dto.Nombre, dto.Telefono, dto.Email, dto.Direccion);
        await _repository.UpdateAsync(cliente);
        return MapToDto(cliente);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return false;

        await _repository.DeleteAsync(cliente);
        return true;
    }

    public async Task<bool> ChangeCategoriaAsync(Guid id, string nuevaCategoria)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return false;

        if (!Enum.TryParse<CategoriaCliente>(nuevaCategoria, true, out var cat))
            return false;

        cliente.CambiarCategoria(cat);
        await _repository.UpdateAsync(cliente);
        return true;
    }

    private static ClienteDto MapToDto(Cliente c) => new(
        c.Id,
        c.Nombre,
        c.CedulaRuc,
        c.Telefono,
        c.Email,
        c.Direccion,
        c.Categoria.ToString(),
        c.FechaRegistro,
        c.CalcularAntiguedadDias()
    );
}
