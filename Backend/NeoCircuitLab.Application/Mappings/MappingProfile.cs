using AutoMapper;
using NeoCircuitLab.Application.DTOs;
using NeoCircuitLab.Domain.Entities;

namespace NeoCircuitLab.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Cliente Mappings
        CreateMap<Cliente, ClienteDto>()
            .ForMember(dest => dest.AntiguedadDias, opt => opt.MapFrom(src => src.CalcularAntiguedadDias()))
            .ForMember(dest => dest.Categoria, opt => opt.MapFrom(src => src.Categoria.ToString()));
        CreateMap<CreateClienteDto, Cliente>();
        CreateMap<UpdateClienteDto, Cliente>();
        
        // Equipo Mappings
        CreateMap<Equipo, EquipoDto>()
            .ForMember(dest => dest.ClienteNombre, opt => opt.MapFrom(src => src.Cliente.Nombre));
        CreateMap<CreateEquipoDto, Equipo>();
        CreateMap<UpdateEquipoDto, Equipo>();
    }
}
