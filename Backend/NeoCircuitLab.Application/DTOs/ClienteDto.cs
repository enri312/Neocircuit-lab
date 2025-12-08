namespace NeoCircuitLab.Application.DTOs;

public record ClienteDto(
    Guid Id,
    string Nombre,
    string CedulaRuc,
    string? Telefono,
    string? Email,
    string? Direccion,
    string Categoria,
    DateTime FechaRegistro,
    int AntiguedadDias
);

public record CreateClienteDto(
    string Nombre,
    string CedulaRuc,
    string? Telefono,
    string? Email,
    string? Direccion
);

public record UpdateClienteDto(
    string Nombre,
    string? Telefono,
    string? Email,
    string? Direccion
);
