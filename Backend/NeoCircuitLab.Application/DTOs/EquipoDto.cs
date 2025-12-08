using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Application.DTOs;

public class EquipoDto
{
    public Guid Id { get; set; }
    public Guid ClienteId { get; set; }
    public string Marca { get; set; } = string.Empty;
    public string Modelo { get; set; } = string.Empty;
    public TipoEquipo Tipo { get; set; }
    public string NumeroSerie { get; set; } = string.Empty;
    public EstadoFisico EstadoFisico { get; set; }
    public string? Notas { get; set; }
    public string? PasswordDispositivo { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Optional: Include Client Name for display purposes
    public string? ClienteNombre { get; set; }
}
