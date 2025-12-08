using Microsoft.AspNetCore.Mvc;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuditLogController : ControllerBase
{
    private readonly IAuditLogService _service;

    public AuditLogController(IAuditLogService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AuditLog>>> GetRecent()
    {
        var logs = await _service.GetRecentLogsAsync();
        return Ok(logs);
    }

    [HttpGet("entity/{entityId}")]
    public async Task<ActionResult<IEnumerable<AuditLog>>> GetByEntity(string entityId)
    {
        var logs = await _service.GetLogsByEntityIdAsync(entityId);
        return Ok(logs);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<AuditLog>>> GetByUser(string userId)
    {
        var logs = await _service.GetLogsByUserIdAsync(userId);
        return Ok(logs);
    }
}
