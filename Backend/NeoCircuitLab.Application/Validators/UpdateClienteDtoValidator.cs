using FluentValidation;
using NeoCircuitLab.Application.DTOs;

namespace NeoCircuitLab.Application.Validators;

public class UpdateClienteDtoValidator : AbstractValidator<UpdateClienteDto>
{
    public UpdateClienteDtoValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .Length(3, 100).WithMessage("El nombre debe tener entre 3 y 100 caracteres");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El email es obligatorio")
            .EmailAddress().WithMessage("El email no es válido");

        RuleFor(x => x.Telefono)
            .NotEmpty().WithMessage("El teléfono es obligatorio");
    }
}
