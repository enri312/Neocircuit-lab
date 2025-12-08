using Microsoft.EntityFrameworkCore;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Interfaces;
using NeoCircuitLab.Infrastructure.Data;

namespace NeoCircuitLab.Infrastructure.Repositories;

public class ClienteRepository : IClienteRepository
{
    private readonly ApplicationDbContext _context;

    public ClienteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Cliente?> GetByIdAsync(Guid id)
    {
        return await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Cliente>> GetAllAsync()
    {
        return await _context.Clientes.ToListAsync();
    }

    public async Task AddAsync(Cliente cliente)
    {
        await _context.Clientes.AddAsync(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Cliente cliente)
    {
        _context.Clientes.Update(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Cliente cliente)
    {
        _context.Clientes.Remove(cliente);
        await _context.SaveChangesAsync();
    }
}
