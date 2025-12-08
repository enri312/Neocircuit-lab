using System.ComponentModel.DataAnnotations;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Application.DTOs;

public class CreateEquipoDto
{
    [Required]
    public Guid ClienteId { get; set; }

    [Required]
    public string Marca { get; set; } = string.Empty;

    [Required]
    public string Modelo { get; set; } = string.Empty;

    [Required]
    public TipoEquipo Tipo { get; set; }

    [Required]
    public string NumeroSerie { get; set; } = string.Empty;

    [Required]
    public EstadoFisico EstadoFisico { get; set; }

    public string? Notas { get; set; }
    public string? PasswordDispositivo { get; set; }
}
