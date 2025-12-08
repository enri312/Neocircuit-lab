using Microsoft.AspNetCore.Mvc;
using NeoCircuitLab.Domain.Entities;
using NeoCircuitLab.Domain.Interfaces;

namespace NeoCircuitLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly IClienteRepository _repository;

    public ClientesController(IClienteRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> Get()
    {
        var clientes = await _repository.GetAllAsync();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cliente>> Get(Guid id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null)
        {
            return NotFound();
        }
        return Ok(cliente);
    }

    [HttpPost]
    public async Task<ActionResult<Cliente>> Post(Cliente cliente)
    {
        await _repository.AddAsync(cliente);
        return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, Cliente cliente)
    {
        if (id != cliente.Id)
        {
            return BadRequest();
        }

        await _repository.UpdateAsync(cliente);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(cliente);
        return NoContent();
    }
}
