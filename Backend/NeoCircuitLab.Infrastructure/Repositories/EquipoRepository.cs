using Microsoft.EntityFrameworkCore;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Interfaces;
using NeoCircuitLab.Infrastructure.Data;

namespace NeoCircuitLab.Infrastructure.Repositories;

public class EquipoRepository : IEquipoRepository
{
    private readonly ApplicationDbContext _context;

    public EquipoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Equipo?> GetByIdAsync(Guid id)
    {
        return await _context.Equipos
            .Include(e => e.Cliente)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
    }

    public async Task<IEnumerable<Equipo>> GetAllAsync()
    {
        return await _context.Equipos
            .Include(e => e.Cliente)
            .Where(e => !e.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Equipo>> GetByClienteIdAsync(Guid clienteId)
    {
        return await _context.Equipos
            .Include(e => e.Cliente)
            .Where(e => e.ClienteId == clienteId && !e.IsDeleted)
            .ToListAsync();
    }

    public async Task<Equipo?> GetByNumeroSerieAsync(string numeroSerie)
    {
        return await _context.Equipos
            .FirstOrDefaultAsync(e => e.NumeroSerie == numeroSerie && !e.IsDeleted);
    }

    public async Task AddAsync(Equipo equipo)
    {
        await _context.Equipos.AddAsync(equipo);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Equipo equipo)
    {
        _context.Equipos.Update(equipo);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var equipo = await GetByIdAsync(id);
        if (equipo != null)
        {
            equipo.MarkAsDeleted();
            await _context.SaveChangesAsync();
        }
    }
}
