using NeoCircuitLab.Domain.Common;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Domain.Entities;

public class Equipo : BaseEntity
{
    public Guid ClienteId { get; private set; }
    public string Marca { get; private set; }
    public string Modelo { get; private set; }
    public TipoEquipo Tipo { get; private set; }
    public string NumeroSerie { get; private set; }
    public EstadoFisico EstadoFisico { get; private set; }
    public string? Notas { get; private set; }
    public string? PasswordDispositivo { get; private set; } // Optional: Customer's device password/pin
    
    // Navigation Property
    public virtual Cliente Cliente { get; private set; } = null!;

    public Equipo(Guid clienteId, string marca, string modelo, TipoEquipo tipo, string numeroSerie, EstadoFisico estadoFisico, string? notas = null, string? passwordDispositivo = null)
    {
        Id = Guid.NewGuid();
        ClienteId = clienteId;
        Marca = marca;
        Modelo = modelo;
        Tipo = tipo;
        NumeroSerie = numeroSerie;
        EstadoFisico = estadoFisico;
        Notas = notas;
        PasswordDispositivo = passwordDispositivo;
        CreatedAt = DateTime.UtcNow;
        IsDeleted = false;
    }

    // Empty constructor for EF Core
    protected Equipo() { }

    public void ActualizarInformacion(string marca, string modelo, TipoEquipo tipo, string numeroSerie, EstadoFisico estadoFisico, string? notas, string? passwordDispositivo)
    {
        Marca = marca;
        Modelo = modelo;
        Tipo = tipo;
        NumeroSerie = numeroSerie;
        EstadoFisico = estadoFisico;
        Notas = notas;
        PasswordDispositivo = passwordDispositivo;
        UpdatedAt = DateTime.UtcNow;
    }
}
