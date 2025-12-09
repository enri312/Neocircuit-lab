using ClosedXML.Excel;
using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Application.Interfaces;

namespace NeoCircuitLab.Infrastructure.Services;

public class ExcelExportService : IExcelExportService
{
    public byte[] ExportClientesToExcel(IEnumerable<ClienteDto> clientes)
    {
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Clientes");

        // Header row
        worksheet.Cell(1, 1).Value = "Nombre";
        worksheet.Cell(1, 2).Value = "Cédula/RUC";
        worksheet.Cell(1, 3).Value = "Teléfono";
        worksheet.Cell(1, 4).Value = "Email";
        worksheet.Cell(1, 5).Value = "Dirección";
        worksheet.Cell(1, 6).Value = "Categoría";
        worksheet.Cell(1, 7).Value = "Fecha Registro";
        worksheet.Cell(1, 8).Value = "Antigüedad (días)";

        // Style header
        var headerRange = worksheet.Range(1, 1, 1, 8);
        headerRange.Style.Font.Bold = true;
        headerRange.Style.Fill.BackgroundColor = XLColor.LightBlue;
        headerRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

        // Data rows
        var row = 2;
        foreach (var cliente in clientes)
        {
            worksheet.Cell(row, 1).Value = cliente.Nombre;
            worksheet.Cell(row, 2).Value = cliente.CedulaRuc;
            worksheet.Cell(row, 3).Value = cliente.Telefono ?? "";
            worksheet.Cell(row, 4).Value = cliente.Email ?? "";
            worksheet.Cell(row, 5).Value = cliente.Direccion ?? "";
            worksheet.Cell(row, 6).Value = cliente.Categoria;
            worksheet.Cell(row, 7).Value = cliente.FechaRegistro.ToString("dd/MM/yyyy");
            worksheet.Cell(row, 8).Value = cliente.AntiguedadDias;
            row++;
        }

        // Auto-fit columns
        worksheet.Columns().AdjustToContents();

        // Return as byte array
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }
}
