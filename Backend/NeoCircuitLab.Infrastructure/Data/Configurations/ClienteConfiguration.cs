using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Infrastructure.Data.Configurations;

public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
{
    public void Configure(EntityTypeBuilder<Cliente> builder)
    {
        builder.ToTable("Clientes");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.CedulaRuc)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(c => c.Email)
            .HasMaxLength(100);

        builder.Property(c => c.Telefono)
            .HasMaxLength(20);

        builder.Property(c => c.Direccion)
            .HasMaxLength(200);

        // Índices para optimizar búsquedas
        builder.HasIndex(c => c.Nombre)
            .HasDatabaseName("IX_Clientes_Nombre");

        builder.HasIndex(c => c.CedulaRuc)
            .IsUnique()
            .HasDatabaseName("IX_Clientes_CedulaRuc");

        builder.HasIndex(c => c.Telefono)
            .HasDatabaseName("IX_Clientes_Telefono");

        builder.HasIndex(c => c.Categoria)
            .HasDatabaseName("IX_Clientes_Categoria");

        builder.HasIndex(c => c.IsDeleted)
            .HasDatabaseName("IX_Clientes_IsDeleted");
    }
}
