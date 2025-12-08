using Microsoft.AspNetCore.Mvc;
using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;
using NeoCircuitLab.Domain.Enums;

namespace NeoCircuitLab.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EquiposController : ControllerBase
{
    private readonly IEquipoService _equipoService;

    public EquiposController(IEquipoService equipoService)
    {
        _equipoService = equipoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EquipoDto>>> GetAll()
    {
        var equipos = await _equipoService.GetAllAsync();
        return Ok(equipos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EquipoDto>> GetById(Guid id)
    {
        var equipo = await _equipoService.GetByIdAsync(id);
        if (equipo == null) return NotFound();
        return Ok(equipo);
    }

    [HttpGet("cliente/{clienteId}")]
    public async Task<ActionResult<IEnumerable<EquipoDto>>> GetByClienteId(Guid clienteId)
    {
        var equipos = await _equipoService.GetByClienteIdAsync(clienteId);
        return Ok(equipos);
    }

    [HttpPost]
    public async Task<ActionResult<EquipoDto>> Create(CreateEquipoDto dto)
    {
        try
        {
            var createdEquipo = await _equipoService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdEquipo.Id }, createdEquipo);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<EquipoDto>> Update(Guid id, UpdateEquipoDto dto)
    {
        var updatedEquipo = await _equipoService.UpdateAsync(id, dto);
        if (updatedEquipo == null) return NotFound();
        return Ok(updatedEquipo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _equipoService.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
