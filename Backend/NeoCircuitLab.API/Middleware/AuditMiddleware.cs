using System.Text.Json;
using NeoCircuitLab.Application.Interfaces;

namespace NeoCircuitLab.API.Middleware;

/// <summary>
/// Middleware para capturar automáticamente operaciones CRUD y registrarlas en el sistema de auditoría.
/// </summary>
public class AuditMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AuditMiddleware> _logger;

    public AuditMiddleware(RequestDelegate next, ILogger<AuditMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IAuditLogService auditService)
    {
        // Solo auditar operaciones que modifican datos
        var method = context.Request.Method;
        if (method != "POST" && method != "PUT" && method != "DELETE")
        {
            await _next(context);
            return;
        }

        // Capturar el body de la request para auditoría
        context.Request.EnableBuffering();
        var requestBody = string.Empty;

        if (context.Request.ContentLength > 0)
        {
            using var reader = new StreamReader(context.Request.Body, leaveOpen: true);
            requestBody = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;
        }

        // Capturar el response
        var originalBodyStream = context.Response.Body;
        using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;

        try
        {
            await _next(context);

            // Leer el response
            responseBody.Seek(0, SeekOrigin.Begin);
            var responseText = await new StreamReader(responseBody).ReadToEndAsync();
            responseBody.Seek(0, SeekOrigin.Begin);

            // Solo registrar si la operación fue exitosa (2xx)
            if (context.Response.StatusCode >= 200 && context.Response.StatusCode < 300)
            {
                var path = context.Request.Path.Value ?? "";
                var entity = ExtractEntityFromPath(path);
                var action = MapMethodToAction(method);

                if (!string.IsNullOrEmpty(entity))
                {
                    _logger.LogInformation(
                        "Audit: {Action} on {Entity} - Path: {Path}",
                        action, entity, path);

                    // Extraer entityId del path si existe (ej: /api/clientes/123-abc)
                    var entityId = ExtractEntityIdFromPath(path);

                    // Registrar en audit log
                    await auditService.LogAsync(
                        userId: "system", // TODO: Obtener usuario autenticado cuando se implemente auth
                        userName: "System",
                        action: action,
                        entityName: entity,
                        entityId: entityId,
                        details: $"{action} operation on {entity}",
                        oldValues: null,
                        newValues: string.IsNullOrEmpty(responseText) ? null : responseText
                    );
                }
            }
        }
        finally
        {
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }

    private static string ExtractEntityFromPath(string path)
    {
        // Extraer el nombre de la entidad del path (ej: /api/clientes -> Clientes)
        var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (segments.Length >= 2 && segments[0].Equals("api", StringComparison.OrdinalIgnoreCase))
        {
            return char.ToUpper(segments[1][0]) + segments[1][1..];
        }
        return string.Empty;
    }

    private static string ExtractEntityIdFromPath(string path)
    {
        // Extraer el ID de la entidad del path (ej: /api/clientes/123-abc -> 123-abc)
        var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (segments.Length >= 3 && segments[0].Equals("api", StringComparison.OrdinalIgnoreCase))
        {
            return segments[2];
        }
        return string.Empty;
    }

    private static string MapMethodToAction(string method) => method switch
    {
        "POST" => "Create",
        "PUT" => "Update",
        "DELETE" => "Delete",
        _ => "Unknown"
    };
}

public static class AuditMiddlewareExtensions
{
    public static IApplicationBuilder UseAuditMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<AuditMiddleware>();
    }
}
