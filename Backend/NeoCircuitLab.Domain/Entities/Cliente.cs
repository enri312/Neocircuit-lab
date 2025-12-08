using NeoCircuitLab.Domain.Common;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Domain.Entities;

public class Cliente : BaseEntity
{
    public string Nombre { get; private set; } = string.Empty;
    public string CedulaRuc { get; private set; } = string.Empty;
    public string? Telefono { get; private set; }
    public string? Email { get; private set; }
    public string? Direccion { get; private set; }
    public CategoriaCliente Categoria { get; private set; } = CategoriaCliente.Nuevo;
    public DateTime FechaRegistro { get; private set; } = DateTime.UtcNow;

    // Entity Framework Constructor
    protected Cliente() { }

    public Cliente(string nombre, string cedulaRuc, string? telefono, string? email, string? direccion)
    {
        Nombre = nombre;
        CedulaRuc = cedulaRuc;
        Telefono = telefono;
        Email = email;
        Direccion = direccion;
    }

    public void ActualizarDatos(string nombre, string? telefono, string? email, string? direccion)
    {
        Nombre = nombre;
        Telefono = telefono;
        Email = email;
        Direccion = direccion;
        UpdatedAt = DateTime.UtcNow;
    }

    public void CambiarCategoria(CategoriaCliente nuevaCategoria)
    {
        Categoria = nuevaCategoria;
        UpdatedAt = DateTime.UtcNow;
    }

    public int CalcularAntiguedadDias()
    {
        return (DateTime.UtcNow - FechaRegistro).Days;
    }
}
