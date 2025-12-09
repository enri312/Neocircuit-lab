import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save, AlertCircle } from 'lucide-react';
import { Client, ClientCategory, CreateClientDto, UpdateClientDto } from '../types';
import { clientService } from '../services/clientService';
import ClientAuditPanel from './ClientAuditPanel';

interface ClientFormProps {
    client?: Client;
    onClose: () => void;
    onSuccess: () => void;
}

type FormData = CreateClientDto;

export const ClientForm: React.FC<ClientFormProps> = ({ client, onClose, onSuccess }) => {
    const [activeTab, setActiveTab] = useState<'general' | 'history'>('general');
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({
        defaultValues: client ? {
            nombre: client.nombre,
            cedulaRuc: client.cedulaRuc,
            telefono: client.telefono || '',
            email: client.email || '',
            direccion: client.direccion || '',
            categoria: client.categoria || 'Nuevo'
        } : {
            nombre: '',
            cedulaRuc: '',
            telefono: '',
            email: '',
            direccion: '',
            categoria: 'Nuevo'
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            if (client) {
                // Edit mode
                await clientService.update(client.id, data as UpdateClientDto);
            } else {
                // Create mode
                await clientService.create(data);
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving client:', error);
            setError('root', {
                type: 'manual',
                message: 'Ocurrió un error al guardar. Verifique los datos e intente nuevamente.'
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">
                        {client ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex border-b border-gray-100 px-6">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        Datos Generales
                    </button>
                    {client && (
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            Historial
                        </button>
                    )}
                </div>

                {activeTab === 'general' ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                        {errors.root && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm border border-red-100">
                                <AlertCircle size={16} />
                                {errors.root.message}
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Nombre Completo *</label>
                            <input
                                {...register('nombre', { required: 'El nombre es obligatorio' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.nombre ? 'border-red-300' : 'border-gray-200'}`}
                                placeholder="Ej: Juan Pérez"
                            />
                            {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Cédula o RUC *</label>
                            <input
                                {...register('cedulaRuc', { required: 'Este campo es obligatorio' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.cedulaRuc ? 'border-red-300' : 'border-gray-200'}`}
                                placeholder="Ej: 1234567-8"
                                disabled={!!client}
                            />
                            {errors.cedulaRuc && <p className="text-xs text-red-500">{errors.cedulaRuc.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                <input
                                    {...register('telefono')}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="+595 9..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    {...register('email', {
                                        pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="cliente@email.com"
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Dirección</label>
                            <textarea
                                {...register('direccion')}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                placeholder="Dirección completa..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Categoría</label>
                            <select
                                {...register('categoria')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                            >
                                <option value="Nuevo">Nuevo</option>
                                <option value="VIP">VIP</option>
                                <option value="Especial">Especial</option>
                            </select>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30 font-medium text-sm"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Guardar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 h-[400px] overflow-y-auto">
                        {client && <ClientAuditPanel clientId={client.id} />}
                    </div>
                )}
            </div>
        </div>
    );
};


