using Microsoft.EntityFrameworkCore;
using NeoCircuitLab.Infrastructure.Data;
using NeoCircuitLab.Domain.Interfaces;
using NeoCircuitLab.Infrastructure.Repositories;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Application.Services;
using NeoCircuitLab.Infrastructure.Services;
using NeoCircuitLab.API.Middleware;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
builder.Services.AddScoped<IEquipoService, EquipoService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();
builder.Services.AddScoped<IExcelExportService, ExcelExportService>();

// Validations & Mapper
builder.Services.AddAutoMapper(typeof(NeoCircuitLab.Application.Mappings.MappingProfile));
builder.Services.AddValidatorsFromAssemblyContaining<NeoCircuitLab.Application.Validators.CreateClienteDtoValidator>();

var app = builder.Build();

// Seed Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await DbInitializer.InitializeAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Audit Middleware - captura operaciones CRUD
app.UseAuditMiddleware();

app.MapControllers();

app.Run();
