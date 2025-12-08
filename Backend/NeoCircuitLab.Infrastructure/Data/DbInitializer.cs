using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(ApplicationDbContext context)
    {
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Check if any clients exist
        if (context.Clientes.Any())
        {
            return; // DB has been seeded
        }

        var clients = new Cliente[]
        {
            new Cliente("Juan Perez", "1234567-1", "0971123456", "juan@example.com", "Av. Espana 123"),
            new Cliente("Maria Gonzalez", "2345678-2", "0981654321", "maria@example.com", "Calle Palma 456"),
            new Cliente("Carlos Lopez", "3456789-3", "0991112233", "carlos@example.com", "Ruta 1 Km 20"),
            new Cliente("Empresa Tech SA", "80001234-5", "021444555", "contacto@techsa.com", "Edificio World Trade Center, Piso 5")
        };

        // Set specific categories
        clients[0].CambiarCategoria(CategoriaCliente.Nuevo);
        clients[1].CambiarCategoria(CategoriaCliente.VIP);
        clients[2].CambiarCategoria(CategoriaCliente.Especial);
        clients[3].CambiarCategoria(CategoriaCliente.VIP);

        context.Clientes.AddRange(clients);
        await context.SaveChangesAsync();
    }
}
