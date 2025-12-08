using Microsoft.AspNetCore.Mvc;
using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;

namespace NeoCircuitLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteService _service;

    public ClientesController(IClienteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClienteDto>>> GetAll()
    {
        var clientes = await _service.GetAllAsync();
        return Ok(clientes);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ClienteDto>> GetById(Guid id)
    {
        var cliente = await _service.GetByIdAsync(id);
        return cliente == null ? NotFound() : Ok(cliente);
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<ClienteDto>>> Search([FromQuery] string termino)
    {
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
        var cliente = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ClienteDto>> Update(Guid id, UpdateClienteDto dto)
    {
        var cliente = await _service.UpdateAsync(id, dto);
        return cliente == null ? NotFound() : Ok(cliente);
    }

    [HttpPut("{id:guid}/categoria")]
    public async Task<IActionResult> ChangeCategoria(Guid id, [FromBody] string nuevaCategoria)
    {
        var success = await _service.ChangeCategoriaAsync(id, nuevaCategoria);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
