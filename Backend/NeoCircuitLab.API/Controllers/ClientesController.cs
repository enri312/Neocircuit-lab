using Microsoft.AspNetCore.Mvc;
using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;
using FluentValidation;

namespace NeoCircuitLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteService _service;
    private readonly ILogger<ClientesController> _logger;
    private readonly IValidator<CreateClienteDto> _createValidator;
    private readonly IValidator<UpdateClienteDto> _updateValidator;

    public ClientesController(
        IClienteService service,
        ILogger<ClientesController> logger,
        IValidator<CreateClienteDto> createValidator,
        IValidator<UpdateClienteDto> updateValidator)
    {
        _service = service;
        _logger = logger;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClienteDto>>> GetAll()
    {
        _logger.LogInformation("Getting all clients");
        var clientes = await _service.GetAllAsync();
        return Ok(clientes);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ClienteDto>> GetById(Guid id)
    {
        var cliente = await _service.GetByIdAsync(id);
        if (cliente == null)
        {
            _logger.LogWarning("Cliente with Id {Id} not found", id);
            return NotFound();
        }
        return Ok(cliente);
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<ClienteDto>>> Search([FromQuery] string termino)
    {
        _logger.LogInformation("Searching clients with term: {Term}", termino);
        var clientes = await _service.SearchAsync(termino);
        return Ok(clientes);
    }

    [HttpGet("categoria/{categoria}")]
    public async Task<ActionResult<IEnumerable<ClienteDto>>> GetByCategoria(string categoria)
    {
        var clientes = await _service.GetByCategoriaAsync(categoria);
        return Ok(clientes);
    }

    [HttpPost]
    public async Task<ActionResult<ClienteDto>> Create(CreateClienteDto dto)
    {
        _logger.LogInformation("Creating new cliente: {Nombre}", dto.Nombre);

        var validationResult = await _createValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            _logger.LogWarning("Validation failed for CreateCliente: {Errors}", validationResult.Errors);
            return BadRequest(validationResult.Errors);
        }

        try
        {
            var cliente = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning("Duplicate CedulaRuc: {Message}", ex.Message);
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ClienteDto>> Update(Guid id, UpdateClienteDto dto)
    {
        _logger.LogInformation("Updating cliente {Id}", id);

        var validationResult = await _updateValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var cliente = await _service.UpdateAsync(id, dto);
        if (cliente == null) return NotFound();
        return Ok(cliente);
    }

    [HttpPut("{id:guid}/categoria")]
    public async Task<IActionResult> ChangeCategoria(Guid id, [FromBody] string nuevaCategoria)
    {
        _logger.LogInformation("Changing category for cliente {Id} to {Categoria}", id, nuevaCategoria);
        var success = await _service.ChangeCategoriaAsync(id, nuevaCategoria);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        _logger.LogInformation("Deleting cliente {Id}", id);
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }

    [HttpGet("export/excel")]
    public async Task<IActionResult> ExportToExcel([FromServices] IExcelExportService excelService)
    {
        _logger.LogInformation("Exporting clients to Excel");
        var clientes = await _service.GetAllAsync();
        var excelBytes = excelService.ExportClientesToExcel(clientes);

        return File(excelBytes,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"Clientes_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx");
    }
}
