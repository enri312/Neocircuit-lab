namespace NeoCircuitLab.Domain.ValueObjects;

/// <summary>
/// Value Object para validar Cédula de Identidad o RUC paraguayo.
/// Formatos válidos:
/// - Cédula: 1.234.567 o 1234567 (sin puntos)
/// - RUC: 80012345-6 o 800123456
/// </summary>
public record DocumentoIdentidad
{
    public string Valor { get; }
    public TipoDocumento Tipo { get; }

    private DocumentoIdentidad(string valor, TipoDocumento tipo)
    {
        Valor = valor;
        Tipo = tipo;
    }

    public static DocumentoIdentidad Crear(string valor)
    {
        if (string.IsNullOrWhiteSpace(valor))
            throw new ArgumentException("El documento de identidad no puede estar vacío.");

        // Limpiar el valor (quitar puntos y guiones)
        var valorLimpio = valor.Replace(".", "").Replace("-", "").Trim();

        if (valorLimpio.Length < 5)
            throw new ArgumentException("El documento de identidad debe tener al menos 5 caracteres.");

        // Determinar tipo: RUC tiene 8-9 dígitos, Cédula tiene 6-8
        var tipo = valorLimpio.Length >= 8 ? TipoDocumento.RUC : TipoDocumento.Cedula;

        // Validar que solo contenga números
        if (!valorLimpio.All(char.IsDigit))
            throw new ArgumentException("El documento de identidad solo puede contener números.");

        return new DocumentoIdentidad(valorLimpio, tipo);
    }

    public static bool EsValido(string valor)
    {
        try
        {
            Crear(valor);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public override string ToString() => Valor;
}

public enum TipoDocumento
{
    Cedula,
    RUC
}
