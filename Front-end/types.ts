export enum RepairStatus {
  PENDING = 'Pendiente',
  DIAGNOSTIC = 'En Diagnóstico',
  IN_REPAIR = 'En Reparación',
  READY = 'Listo',
  DELIVERED = 'Entregado'
}

export type View = 'DASHBOARD' | 'CLIENTS' | 'EQUIPMENT' | 'ORDERS' | 'PARTS' | 'HISTORY' | 'REPORTS' | 'SETTINGS' | 'AUDIT';

export type ClientCategory = 'Nuevo' | 'VIP' | 'Especial';

export interface Client {
  id: string;
  nombre: string;
  cedulaRuc: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  categoria: ClientCategory;
  fechaRegistro: string;
  antiguedadDias: number;
}

export interface CreateClientDto {
  nombre: string;
  cedulaRuc: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  categoria?: ClientCategory;
}

export interface UpdateClientDto {
  nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  categoria?: ClientCategory;
}

export interface Equipment {
  id: string;
  brand: string;
  model: string;
  type: 'PC' | 'Notebook';
  serialNumber: string;
  physicalCondition: string;
}

export interface RepairOrder {
  id: string;
  clientId: string;
  clientName: string;
  equipmentId: string;
  equipmentModel: string;
  entryDate: string;
  diagnosis: string;
  observations: string;
  estimatedCost: number;
  status: RepairStatus;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityName: string;
  entityId: string;
  details: string;
  timestamp: string;
  oldValues?: string;
  newValues?: string;
}

export interface LogoGenerationState {
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
}

// --- New Auth & I18n Types ---

export type Role = 'ADMIN' | 'TECHNICIAN' | 'USER';

export type Language = 'es' | 'en';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}