using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Enums;
using NeoCircuitLab.Domain.Interfaces;
using AutoMapper;

namespace NeoCircuitLab.Application.Services;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;
    private readonly IMapper _mapper;

    public ClienteService(IClienteRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ClienteDto>> GetAllAsync()
    {
        var clientes = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ClienteDto>>(clientes);
    }

    public async Task<ClienteDto?> GetByIdAsync(Guid id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        return cliente == null ? null : _mapper.Map<ClienteDto>(cliente);
    }

    public async Task<IEnumerable<ClienteDto>> SearchAsync(string term)
    {
        var clientes = await _repository.GetAllAsync();
        var filtered = clientes.Where(c =>
            c.Nombre.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            c.CedulaRuc.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            (c.Telefono != null && c.Telefono.Contains(term, StringComparison.OrdinalIgnoreCase)));
        return _mapper.Map<IEnumerable<ClienteDto>>(filtered);
    }

    public async Task<IEnumerable<ClienteDto>> GetByCategoriaAsync(string categoria)
    {
        var clientes = await _repository.GetAllAsync();
        if (Enum.TryParse<CategoriaCliente>(categoria, true, out var cat))
        {
            var filtered = clientes.Where(c => c.Categoria == cat);
            return _mapper.Map<IEnumerable<ClienteDto>>(filtered);
        }
        return [];
    }

    public async Task<ClienteDto> CreateAsync(CreateClienteDto dto)
    {
        // Check for duplicate CedulaRuc
        var existingCliente = await _repository.GetByCedulaRucAsync(dto.CedulaRuc);
        if (existingCliente != null)
        {
            throw new InvalidOperationException($"Ya existe un cliente con la Cédula/RUC: {dto.CedulaRuc}");
        }

        // Parse categoria from string to enum (default to Nuevo)
        var categoria = CategoriaCliente.Nuevo;
        if (!string.IsNullOrEmpty(dto.Categoria) && Enum.TryParse<CategoriaCliente>(dto.Categoria, true, out var parsedCategoria))
        {
            categoria = parsedCategoria;
        }

        // Manual mapping for creation to ensure domain invariants via constructor
        var cliente = new Cliente(dto.Nombre, dto.CedulaRuc, dto.Telefono, dto.Email, dto.Direccion, categoria);

        await _repository.AddAsync(cliente);
        return _mapper.Map<ClienteDto>(cliente);
    }

    public async Task<ClienteDto?> UpdateAsync(Guid id, UpdateClienteDto dto)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return null;

        cliente.ActualizarDatos(dto.Nombre, dto.Telefono, dto.Email, dto.Direccion);
        await _repository.UpdateAsync(cliente);
        return _mapper.Map<ClienteDto>(cliente);
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
}
