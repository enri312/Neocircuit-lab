import api from './api';
import { Client, CreateClientDto, UpdateClientDto } from '../types';

export const clientService = {
    getAll: async (): Promise<Client[]> => {
        const response = await api.get<Client[]>('/clientes');
        return response.data;
    },

    getById: async (id: string): Promise<Client> => {
        const response = await api.get<Client>(`/clientes/${id}`);
        return response.data;
    },

    search: async (term: string): Promise<Client[]> => {
        const response = await api.get<Client[]>(`/clientes/buscar?termino=${term}`);
        return response.data;
    },

    getByCategory: async (category: string): Promise<Client[]> => {
        const response = await api.get<Client[]>(`/clientes/categoria/${category}`);
        return response.data;
    },

    create: async (dto: CreateClientDto): Promise<Client> => {
        const response = await api.post<Client>('/clientes', dto);
        return response.data;
    },

    update: async (id: string, dto: UpdateClientDto): Promise<Client> => {
        const response = await api.put<Client>(`/clientes/${id}`, dto);
        return response.data;
    },

    changeCategory: async (id: string, category: string): Promise<void> => {
        await api.put(`/clientes/${id}/categoria`, JSON.stringify(category));
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/clientes/${id}`);
    }
};
