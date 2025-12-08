import React, { useEffect, useState } from 'react';
import { Clock, User as UserIcon, Activity } from 'lucide-react';
import { AuditLog } from '../types';
import { auditService } from '../services/auditService';

interface ClientAuditPanelProps {
    clientId: string;
}

const ClientAuditPanel: React.FC<ClientAuditPanelProps> = ({ clientId }) => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, [clientId]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            const data = await auditService.getByEntity(clientId);
            setLogs(data);
        } catch (error) {
            console.error('Error loading audit logs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-400 text-sm p-4">Cargando historial...</div>;

    if (logs.length === 0) {
        return (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400">
                <Activity size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay registros de actividad para este cliente.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                Historial de Cambios
            </h3>

            <div className="relative border-l-2 border-gray-100 ml-2 space-y-6 pb-2">
                {logs.map((log) => (
                    <div key={log.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <span className="font-medium text-gray-800 text-sm block">{log.action}</span>
                                <p className="text-xs text-gray-500 mt-0.5">{log.details}</p>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                                <Clock size={12} />
                                {new Date(log.timestamp).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                            <UserIcon size={12} />
                            <span>Por: {log.userName}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientAuditPanel;
