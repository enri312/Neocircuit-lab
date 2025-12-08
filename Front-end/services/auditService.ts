import api from './api';
import { AuditLog } from '../types';

export const auditService = {
    getRecent: async (): Promise<AuditLog[]> => {
        const response = await api.get<AuditLog[]>('/auditlog');
        return response.data;
    },

    getByEntity: async (entityId: string): Promise<AuditLog[]> => {
        const response = await api.get<AuditLog[]>(`/auditlog/entity/${entityId}`);
        return response.data;
    },

    getByUser: async (userId: string): Promise<AuditLog[]> => {
        const response = await api.get<AuditLog[]>(`/auditlog/user/${userId}`);
        return response.data;
    }
};
