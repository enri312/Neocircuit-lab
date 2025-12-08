import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Phone, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { Client, ClientCategory } from '../types';
import { clientService } from '../services/clientService';
import { ClientForm } from './index';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        filterClients();
    }, [searchTerm, selectedCategory, clients]);

    const loadClients = async () => {
        try {
            setLoading(true);
            const data = await clientService.getAll();
            setClients(data);
        } catch (error) {
            console.error('Error loading clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterClients = () => {
        let result = clients;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.nombre.toLowerCase().includes(term) ||
                c.cedulaRuc.includes(term) ||
                (c.email && c.email.toLowerCase().includes(term))
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(c => c.categoria === selectedCategory);
        }

        setFilteredClients(result);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            try {
                await clientService.delete(id);
                loadClients();
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingClient(undefined);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingClient(undefined);
    };

    const handleFormSuccess = () => {
        handleFormClose();
        loadClients();
    };

    const getCategoryColor = (category: ClientCategory) => {
        switch (category) {
            case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Especial': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    if (loading && clients.length === 0) {
        return <div className="flex justify-center items-center h-64 text-gray-500">Cargando clientes...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
                    <p className="text-gray-500 text-sm">Gestiona tu base de datos de clientes</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Nuevo Cliente
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, cédula o email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Todas las categorías</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="VIP">VIP</option>
                        <option value="Especial">Especial</option>
                    </select>
                </div>
            </div>

            {/* Client Table Layout */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-medium">Cliente</th>
                            <th className="px-6 py-3 font-medium">Categoría</th>
                            <th className="px-6 py-3 font-medium">Contacto</th>
                            <th className="px-6 py-3 font-medium">Dirección</th>
                            <th className="px-6 py-3 font-medium">Antigüedad</th>
                            <th className="px-6 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredClients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50 group transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{client.nombre}</div>
                                    <div className="text-xs text-gray-400 font-mono">{client.cedulaRuc}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(client.categoria)}`}>
                                        {client.categoria}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-y-1">
                                    {client.telefono && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone size={14} className="text-gray-400" />
                                            <span>{client.telefono}</span>
                                        </div>
                                    )}
                                    {client.email && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail size={14} className="text-gray-400" />
                                            <span className="truncate max-w-[150px]">{client.email}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {client.direccion && (
                                        <div className="flex items-center gap-2" title={client.direccion}>
                                            <MapPin size={14} className="text-gray-400" />
                                            <span className="truncate max-w-[150px]">{client.direccion}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-1" title="Días registrado">
                                        <Clock size={14} className="text-gray-400" />
                                        <span>{client.antiguedadDias} días</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(client)}
                                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(client.id)}
                                            className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredClients.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-400">
                        <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <p>No se encontraron clientes.</p>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <ClientForm
                    client={editingClient}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}

            {/* Note: In a real app, AuditPanel might be better placed in a "Details" modal/page 
                rather than the Edit Form, but we can add it here if needed or keep it separate.
                For now, keeping it simple as per original scope. 
            */}
        </div>
    );
};

export default ClientList;
