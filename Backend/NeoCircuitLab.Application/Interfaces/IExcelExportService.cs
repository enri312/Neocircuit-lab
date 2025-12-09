using NeoCircuitLab.Application.DTOs;

namespace NeoCircuitLab.Application.Interfaces;

public interface IExcelExportService
{
    byte[] ExportClientesToExcel(IEnumerable<ClienteDto> clientes);
}
