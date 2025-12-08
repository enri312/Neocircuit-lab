export enum RepairStatus {
  PENDING = 'Pendiente',
  DIAGNOSTIC = 'En Diagnóstico',
  IN_REPAIR = 'En Reparación',
  READY = 'Listo',
  DELIVERED = 'Entregado'
}

export type View = 'DASHBOARD' | 'CLIENTS' | 'EQUIPMENT' | 'ORDERS' | 'PARTS' | 'HISTORY' | 'REPORTS' | 'SETTINGS' | 'AUDIT';

export interface Client {
  id: string;
  fullName: string;
  documentId: string; // Cédula / RUC
  phone: string;
  email: string;
  address: string;
  entryDate: string; // YYYY-MM-DD
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
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
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