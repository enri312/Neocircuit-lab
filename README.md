# 🔬 NeoCircuit Lab - Sistema de Gestión para Taller de Reparación

## 📋 Información del Proyecto

**Nombre:** NeoCircuit Lab  
**Tipo:** Sistema de Gestión para Taller de Reparación de Computadoras y Notebooks  
**Stack Tecnológico:**
- **Backend:** .NET 10 LTS + C# 14
- **Frontend:** React 19+ TypeScript 5.8.2 (Aplicación Web/Escritorio con Electron)
- **Base de Datos:** PostgreSQL 18.1
- **Automatización:** N8N (Workflows y notificaciones)
- **PDF Generation:** QuestPDF
- **IA Local:** Ollama (DeepSeek-r1:8b) para diagnósticos
- **Containerización:** Docker + Docker Compose
- **Arquitectura:** Clean Architecture / Layered Architecture

---

## 🎯 Objetivos del Sistema

1. **Gestionar eficientemente** un taller de reparación de computadoras y notebooks
2. **Controlar** clientes, equipos, órdenes de reparación, repuestos e historial técnico
3. **Organizar** el trabajo diario del técnico
4. **Mejorar** el control de reparaciones
5. **Profesionalizar** la atención al cliente
6. **Optimizar** tiempos y recursos
7. **Automatizar** notificaciones y procesos repetitivos con N8N
8. **Generar reportes y documentos PDF** automáticamente

---

## 📊 Roadmap por Fases

### **FASE 1: Configuración Inicial del Proyecto (Semana 1)**

#### 1.1 Setup del Backend (.NET)
- [x] Crear solución .NET con estructura Clean Architecture
- [x] Configurar proyectos:
  - `NeoCircuitLab.Domain` - Entidades y reglas de negocio
  - `NeoCircuitLab.Application` - Casos de uso y lógica
  - `NeoCircuitLab.Infrastructure` - Datos y servicios externos
  - `NeoCircuitLab.API` - Controladores y endpoints REST
- [x] Configurar Entity Framework Core
- [x] Setup inicial de dependencias y paquetes NuGet
- [x] Configurar settings (appsettings.json)

#### 1.2 Setup del Frontend (React)
- [x] Integrar proyecto React existente
- [x] Configurar proxy para desarrollo (vite.config.ts)
- [x] Setup de variables de entorno (.env)
- [x] Configurar TypeScript estricto
- [x] Instalar dependencias base (axios, react-router, React Hook Form)
- [ ] Configurar Electron (opcional para app escritorio)

#### 1.3 Diseño de Base de Datos PostgreSQL 18.1
- [x] Diseñar esquema completo (modelo entidad-relación)
- [ ] Entidades principales:
  - **Clientes** (ID, Nombre, Cédula/RUC, Teléfono, Email, Dirección, Categoría, Fecha Registro)
  - **Equipos** (ID, Marca, Modelo, Tipo, Serie, Estado Físico, ID_Cliente)
  - **Órdenes de Reparación** (ID, ID_Cliente, ID_Equipo, Fecha Ingreso, Diagnóstico, Estado, Costo, Técnico)
  - **Repuestos** (ID, Nombre, Precio, Stock, StockMinimo, Proveedor)
  - **Historial Técnico** (ID, ID_Orden, Fecha, Técnico, Detalles, Acción)
  - **Trabajos** (ID_Orden, Descripción, Estado, Fecha)
  - **Categorías de Cliente** (Nuevo, VIP, Especial)
  - **Usuarios** (ID, Username, Password, Rol, Email)
  - **AuditLog** (ID, Entidad, Acción, Usuario, Fecha, DatosAntiguos, DatosNuevos)
- [x] Crear DbContext en Entity Framework
- [x] Configurar migraciones iniciales
- [x] Scripts de seed data (datos de prueba)

#### 1.4 Docker Compose - Stack Completo
- [x] Configurar PostgreSQL 18.1 en Docker
- [x] Configurar N8N con persistencia en PostgreSQL
- [x] Configurar volúmenes para datos persistentes
- [x] Crear Dockerfile para backend
- [x] Crear Dockerfile para frontend
- [x] Configurar networking entre contenedores
- [x] Setup de health checks
- [x] Crear archivo `.env.example`
- [x] Documentar comandos de Docker
- [x] Script de inicialización de BD (`init-db.sql`)

#### 1.5 Configuración Inicial de N8N
- [x] Instalar N8N en Docker
- [x] Configurar credenciales de acceso
- [x] Conectar N8N a PostgreSQL (para almacenar workflows)
- [x] Configurar zona horaria (America/Asuncion)
- [x] Configurar webhooks URL
- [x] Crear carpeta para workflows predefinidos

**Entregables Fase 1:**
- Estructura de proyecto completa
- Docker Compose funcional con todos los servicios
- Backend, Frontend, PostgreSQL y N8N corriendo localmente
- Base de datos diseñada con migraciones
- N8N accesible en http://localhost:5678

---

### **FASE 2: Módulo de Gestión de Clientes (Semana 2)**

#### 2.1 Backend - Dominio de Clientes
- [x] Crear entidad `Cliente` con Value Objects
- [x] Enum para `CategoriaCliente` (Nuevo, VIP, Especial)
- [x] Validaciones de negocio (Cédula/RUC válido)
- [x] Método para calcular antigüedad del cliente
- [x] Interfaz `IClienteRepository`

#### 2.2 Backend - Aplicación de Clientes
- [x] Commands: 
  - `CrearClienteCommand`
  - `ActualizarClienteCommand`
  - `EliminarClienteCommand`
  - `CambiarCategoriaClienteCommand`
- [x] Queries: 
  - `ObtenerClientesQuery`
  - `ObtenerClientePorIdQuery`
  - `BuscarClienteQuery`
  - `ObtenerClientesPorCategoriaQuery`
- [x] DTOs para Cliente (con antigüedad calculada)
- [x] Validadores con FluentValidation
- [x] AutoMapper profiles

#### 2.3 Backend - Infraestructura
- [x] Implementar `ClienteRepository`
- [x] Configuración EF Core para Cliente
- [x] Búsqueda por nombre, cédula, teléfono
- [x] Índices de base de datos para optimizar búsquedas

#### 2.4 Backend - API
- [x] `ClientesController` con endpoints CRUD
  - `GET /api/clientes` - Listar todos (con paginación)
  - `GET /api/clientes/{id}` - Obtener por ID
  - `GET /api/clientes/buscar?termino=` - Buscar
  - `GET /api/clientes/categoria/{categoria}` - Filtrar por categoría
  - `POST /api/clientes` - Crear
  - `PUT /api/clientes/{id}` - Actualizar
  - `PUT /api/clientes/{id}/categoria` - Cambiar categoría
  - `DELETE /api/clientes/{id}` - Eliminar
- [x] Validación de datos de entrada
- [x] Logging de todas las operaciones

#### 2.5 Backend - Sistema de Auditoría
- [x] Crear `AuditLogService`
- [x] Registrar cambios en `AuditLog` table
- [x] Middleware para capturar operaciones CRUD
- [x] Endpoint para consultar auditoría: `GET /api/auditlog/clientes/{id}`

#### 2.6 Frontend - UI de Clientes
- [x] Página de listado de clientes (tabla con paginación)
- [x] Formulario para crear/editar cliente
- [x] Modal de confirmación para eliminar
- [x] Búsqueda en tiempo real
- [x] Filtro por categoría
- [x] Badge visual de categoría
- [x] **Cálculo y visualización de antigüedad** (días desde registro)
- [x] **Panel de auditoría** - Mostrar historial de cambios del cliente
- [x] Exportar lista a Excel (preparación)

**Entregables Fase 2:**
- Módulo de clientes completamente funcional
- CRUD completo de clientes
- Sistema de auditoría implementado
- Búsqueda y filtros funcionando

**Cómo Testear Fase 2:**
```bash
# 1. Iniciar servicios Docker
docker-compose up -d

# 2. Ejecutar migraciones
cd Backend/NeoCircuitLab.API
dotnet ef database update --project ../NeoCircuitLab.Infrastructure --startup-project .

# 3. Iniciar Backend
dotnet run

# 4. Probar endpoints con curl o Postman:
# GET todos los clientes
curl http://localhost:5000/api/clientes

# POST crear cliente
curl -X POST http://localhost:5000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","cedulaRuc":"1234567","telefono":"0981123456","email":"test@test.com"}'

# GET exportar a Excel
curl http://localhost:5000/api/clientes/export/excel -o clientes.xlsx
```

---

### **FASE 3: Módulo de Gestión de Equipos (Semana 3)**

#### 3.1 Backend - Dominio de Equipos
#### 3.1 Backend - Dominio de Equipos
- [x] Crear entidad `Equipo`
- [x] Enum para `TipoEquipo` (PC, Notebook, Tablet, All-in-One, etc.)
- [x] Enum para `EstadoFisico` (Excelente, Bueno, Regular, Malo, Muy Malo)
- [x] Relación con Cliente (muchos equipos por cliente)
- [x] Interfaz `IEquipoRepository`
- [ ] Método para obtener historial completo del equipo

#### 3.2 Backend - Aplicación de Equipos
- [ ] Commands y Queries para Equipos
- [ ] DTOs con información del cliente asociado
- [ ] Validadores (número de serie único, etc.)
- [ ] Lógica para historial de reparaciones por equipo

#### 3.3 Backend - API
- [ ] `EquiposController` con endpoints:
  - `GET /api/equipos` - Listar todos
  - `GET /api/equipos/{id}` - Obtener por ID
  - `GET /api/equipos/cliente/{clienteId}` - Por cliente
  - `GET /api/equipos/{id}/historial` - Historial completo
  - `POST /api/equipos` - Crear
  - `PUT /api/equipos/{id}` - Actualizar
  - `DELETE /api/equipos/{id}` - Eliminar
- [ ] Auditoría de equipos

#### 3.4 Frontend - UI de Equipos
- [ ] Página de listado de equipos
- [ ] Formulario con selector de cliente (autocomplete)
- [ ] Vista de historial por equipo (timeline)
- [ ] Filtros por tipo y estado físico
- [ ] Badge visual del estado físico
- [ ] Panel de auditoría para equipos

**Entregables Fase 3:**
- Módulo de equipos funcional
- Relación cliente-equipo implementada
- Historial por equipo con auditoría

---

### **FASE 4: Módulo de Órdenes de Reparación (Semanas 4-5)**

#### 4.1 Backend - Dominio de Órdenes
- [ ] Crear entidad `OrdenReparacion`
- [ ] Enum `EstadoOrden` (Pendiente, En Diagnóstico, En Reparación, Listo, Entregado)
- [ ] Relación con Cliente, Equipo y Usuario (Técnico)
- [ ] Relación muchos-a-muchos con Repuestos (tabla intermedia)
- [ ] Cálculo automático de costos (repuestos + mano de obra)
- [ ] Validaciones de cambio de estado
- [ ] Interfaz `IOrdenRepository`

#### 4.2 Backend - Aplicación de Órdenes
- [ ] Commands:
  - `CrearOrdenCommand`
  - `ActualizarEstadoOrdenCommand`
  - `AsignarTecnicoCommand`
  - `CerrarOrdenCommand`
  - `AgregarRepuestoCommand`
  - `RemoverRepuestoCommand`
  - `ActualizarDiagnosticoCommand`
- [ ] Queries:
  - `ObtenerOrdenesActivasQuery`
  - `ObtenerOrdenesPorEstadoQuery`
  - `ObtenerOrdenPorIdQuery`
  - `ObtenerOrdenesPorClienteQuery`
  - `ObtenerOrdenesVencidasQuery` (más de X días sin cerrar)
- [ ] Lógica de cambio de estado con validaciones
- [ ] Auditoría completa de cambios
- [ ] **Servicio de webhooks a N8N**
- [ ] **Integración IA Local (Ollama - deepseek-r1:8b)**
  - [ ] Instalar/Configurar Ollama localmente
  - [ ] Crear servicio `IOllamaService` en Backend
  - [ ] Endpoint para generar pre-diagnóstico basado en notas/síntomas

#### 4.3 Backend - Integración con N8N
- [ ] Crear `N8nWebhookService`
- [ ] Método `EnviarEventoOrdenCreada(orden)`
- [ ] Método `EnviarEventoOrdenCambioEstado(orden, estadoAnterior, estadoNuevo)`
- [ ] Método `EnviarEventoOrdenLista(orden)` - Trigger para notificación
- [ ] Método `EnviarEventoOrdenCerrada(orden)`
- [ ] Logging de webhooks enviados
- [ ] Manejo de errores si N8N no responde

#### 4.4 Backend - API
- [ ] `OrdenesController` con endpoints:
  - `GET /api/ordenes` - Listar todas
  - `GET /api/ordenes/activas` - Órdenes activas
  - `GET /api/ordenes/estado/{estado}` - Por estado
  - `GET /api/ordenes/vencidas?dias=30` - Órdenes vencidas
  - `GET /api/ordenes/{id}` - Obtener por ID
  - `GET /api/ordenes/cliente/{clienteId}` - Por cliente
  - `POST /api/ordenes` - Crear orden
  - `PUT /api/ordenes/{id}/estado` - Cambiar estado
  - `PUT /api/ordenes/{id}/tecnico` - Asignar técnico
  - `PUT /api/ordenes/{id}/diagnostico` - Actualizar diagnóstico
  - `POST /api/ordenes/{id}/cerrar` - Cerrar orden
  - `POST /api/ordenes/{id}/repuestos` - Agregar repuesto
  - `DELETE /api/ordenes/{id}/repuestos/{repuestoId}` - Quitar repuesto
- [ ] Auditoría completa en todas las operaciones

#### 4.5 Frontend - Dashboard
- [ ] **Dashboard principal** con métricas:
  - Total de equipos pendientes
  - Órdenes en diagnóstico
  - Órdenes en reparación
  - Equipos listos para entrega
  - Órdenes entregadas hoy
  - Gráfica de órdenes por estado
  - Alertas de órdenes vencidas

#### 4.6 Frontend - UI de Órdenes
- [ ] Página de listado de órdenes (tabla dinámica)
- [ ] Formulario para crear orden (wizard paso a paso):
  - Paso 1: Seleccionar cliente
  - Paso 2: Seleccionar equipo o crear nuevo
  - Paso 3: Diagnóstico inicial
  - Paso 4: Asignar técnico
  - Paso 5: Confirmación
- [ ] Vista detallada de orden con:
  - Información completa
  - Timeline de cambios de estado
  - Lista de repuestos agregados
  - Costo total calculado
  - Panel de auditoría
- [ ] Cambio rápido de estado (botones contextuales)
- [ ] Modal para agregar/quitar repuestos
- [ ] Calcular costo total automáticamente
- [ ] Filtros por estado, técnico, fecha
- [ ] Vista Kanban (opcional) - Drag & drop entre estados

**Entregables Fase 4:**
- Módulo de órdenes completamente funcional
- Gestión de estados con validaciones
- Dashboard con métricas en tiempo real
- Integración inicial con N8N (webhooks)
- Sistema de auditoría completo

---

### **FASE 5: Módulo de Repuestos e Inventario (Semana 6)**

#### 5.1 Backend - Dominio de Repuestos
- [ ] Crear entidad `Repuesto`
- [ ] Propiedades: Nombre, Precio, Stock, StockMinimo, Proveedor
- [ ] Crear entidad `MovimientoInventario`
- [ ] Enum `TipoMovimiento` (Entrada, Salida, Ajuste)
- [ ] Validaciones de stock (no permitir stock negativo)
- [ ] Alertas de stock bajo

#### 5.2 Backend - Aplicación
- [ ] Commands:
  - `CrearRepuestoCommand`
  - `ActualizarRepuestoCommand`
  - `EliminarRepuestoCommand`
  - `RegistrarEntradaStockCommand`
  - `RegistrarSalidaStockCommand`
  - `AjustarStockCommand`
- [ ] Queries:
  - `ObtenerRepuestosQuery`
  - `ObtenerRepuestosPorProveedorQuery`
  - `ObtenerRepuestosStockBajoQuery`
  - `ObtenerMovimientosInventarioQuery`
- [ ] Validación de stock disponible antes de agregar a orden
- [ ] **Servicio de webhooks a N8N para alertas de stock**

#### 5.3 Backend - Integración con N8N
- [ ] Método `EnviarAlertaStockBajo(repuesto)` en `N8nWebhookService`
- [ ] Trigger automático cuando stock < stockMinimo
- [ ] Incluir información del proveedor en el webhook

#### 5.4 Backend - API
- [ ] `RepuestosController` con endpoints CRUD:
  - `GET /api/repuestos` - Listar todos
  - `GET /api/repuestos/stock-bajo` - Alertas
  - `GET /api/repuestos/{id}/movimientos` - Historial
  - `POST /api/repuestos` - Crear
  - `PUT /api/repuestos/{id}` - Actualizar
  - `DELETE /api/repuestos/{id}` - Eliminar
  - `POST /api/repuestos/{id}/entrada` - Registrar entrada
  - `POST /api/repuestos/{id}/salida` - Registrar salida
- [ ] Auditoría de movimientos de inventario

#### 5.5 Frontend - UI de Repuestos
- [ ] Listado de repuestos con stock actual
- [ ] **Alertas visuales** para stock bajo (badge rojo)
- [ ] Formulario CRUD
- [ ] Modal para registrar entrada/salida de stock
- [ ] Vista de movimientos de inventario (tabla con filtros)
- [ ] Filtros por proveedor
- [ ] Exportación a Excel (preparación)

**Entregables Fase 5:**
- Sistema de inventario funcional
- Control de stock en tiempo real
- Alertas de stock bajo integradas con N8N
- Historial de movimientos

---

### **FASE 6: Generación de PDFs con QuestPDF (Semana 7)**

#### 6.1 Setup de QuestPDF
- [ ] Instalar paquete QuestPDF
- [ ] Configurar licencia Community
- [ ] Crear estructura de carpetas para templates
- [ ] Configurar path para logo del taller

#### 6.2 Templates de Documentos
- [ ] **Template: Orden de Reparación** (`OrdenTemplate.cs`)
  - Header con logo y datos del taller
  - Información del cliente
  - Información del equipo
  - Diagnóstico detallado
  - Lista de repuestos utilizados (tabla)
  - Costo total (repuestos + mano de obra)
  - Estado actual
  - Fecha de ingreso y estimación de entrega
  - Footer con términos y condiciones
  
- [ ] **Template: Comprobante de Entrega** (`ComprobanteTemplate.cs`)
  - Datos de la orden cerrada
  - Resumen de trabajos realizados
  - Costo final
  - Espacio para firma del cliente
  - Fecha y hora de entrega
  - Garantía (si aplica)
  
- [ ] **Template: Listado de Clientes** (`ClientesTemplate.cs`)
  - Header con filtros aplicados
  - Tabla de clientes:
    - Nombre completo
    - Cédula/RUC
    - Teléfono
    - Email
    - Categoría
    - Fecha de registro
    - **Antigüedad calculada** (días/meses/años)
  - Total de clientes
  - Fecha de generación
  
- [ ] **Template: Reporte de Trabajos** (`TrabajosTemplate.cs`)
  - Filtros aplicados (estado, fechas)
  - Tabla de órdenes:
    - ID Orden
    - Cliente
    - Equipo
    - Técnico
    - Estado
    - Fecha ingreso
    - Días transcurridos
    - Costo
  - Totales y estadísticas
  - Gráficas (opcional)

#### 6.3 Servicio de PDF
- [ ] Crear interfaz `IPdfGeneratorService`
- [ ] Implementar `PdfGeneratorService`
- [ ] Método `GenerarPdfOrden(ordenId)` → byte[]
- [ ] Método `GenerarPdfComprobante(ordenId)` → byte[]
- [ ] Método `GenerarPdfListadoClientes(filtros)` → byte[]
- [ ] Método `GenerarPdfReporteTrabajos(filtros)` → byte[]
- [ ] Método para incluir logo/marca del taller
- [ ] Headers y footers personalizables
- [ ] Configuración de márgenes y tamaños de página

#### 6.4 Backend - API de PDFs
- [ ] `PdfController` con endpoints:
  - `GET /api/pdf/orden/{id}` - PDF de orden (download)
  - `GET /api/pdf/orden/{id}/preview` - Preview Base64
  - `GET /api/pdf/comprobante/{id}` - Comprobante
  - `POST /api/pdf/clientes` - Listado con filtros
  - `POST /api/pdf/trabajos` - Reporte con filtros
- [ ] Headers HTTP correctos para download
- [ ] Caché de PDFs generados (Redis opcional)

#### 6.5 Backend - Servicio de Excel
- [ ] Instalar EPPlus o ClosedXML
- [ ] Crear `IExcelGeneratorService`
- [ ] Método `GenerarExcelReporteTrabajos(filtros)` → byte[]
- [ ] Formato profesional con estilos
- [ ] Columnas ajustadas automáticamente

#### 6.6 Backend - API de Excel
- [ ] Endpoint: `POST /api/excel/trabajos` - Exportar trabajos a Excel
- [ ] Endpoint: `POST /api/excel/clientes` - Exportar clientes

#### 6.7 Frontend - Integración PDF y Excel
- [ ] Botón "Generar PDF" en vista de orden
- [ ] Botón "Descargar Comprobante" cuando orden está cerrada
- [ ] Preview de PDF en modal (iframe con Base64)
- [ ] Descarga automática al hacer clic
- [ ] En página de clientes: Botón "Exportar a PDF"
- [ ] En dashboard de trabajos: 
  - Botón "Exportar a PDF"
  - **Botón "Exportar a Excel"**
- [ ] Loading indicators durante generación
- [ ] Manejo de errores (PDF no se pudo generar)

**Entregables Fase 6:**
- Sistema completo de generación de PDFs
- Múltiples templates profesionales
- Exportación a Excel funcional
- Preview de PDFs en navegador

---

### **FASE 7: Workflows de N8N - Automatización Completa (Semana 8)**

#### 7.1 Workflow 1: Notificación de Orden Lista
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Webhook `/webhook/orden-lista`
- [ ] **Nodo 1:** Recibir datos de la orden
- [ ] **Nodo 2:** Validar datos requeridos
- [ ] **Nodo 3:** Obtener datos adicionales del cliente desde PostgreSQL
- [ ] **Nodo 4:** Generar PDF de comprobante (llamar API backend)
- [ ] **Nodo 5:** Enviar Email al cliente:
  - Asunto: "Tu equipo está listo - NeoCircuit Lab"
  - Cuerpo: Detalles de la orden
  - Adjunto: PDF del comprobante
- [ ] **Nodo 6 (Opcional):** Enviar WhatsApp/SMS
- [ ] **Nodo 7:** Registrar notificación enviada en BD
- [ ] Configurar manejo de errores
- [ ] Testing completo

#### 7.2 Workflow 2: Backup Automático Diario
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Schedule (todos los días a las 2:00 AM - America/Asuncion)
- [ ] **Nodo 1:** Ejecutar comando pg_dump en PostgreSQL
  ```sql
  pg_dump -U neocircuit_user -d neocircuitlab -F c -f /backup/neocircuit_$(date +%Y%m%d).backup
  ```
- [ ] **Nodo 2:** Comprimir backup (.tar.gz)
- [ ] **Nodo 3:** Subir a Google Drive (o Dropbox)
  - Carpeta: "NeoCircuitLab/Backups"
  - Nombre: `backup_YYYYMMDD.tar.gz`
- [ ] **Nodo 4:** Listar backups antiguos (> 7 días)
- [ ] **Nodo 5:** Eliminar backups antiguos del Drive
- [ ] **Nodo 6:** Enviar email de confirmación al administrador
  - Asunto: "Backup exitoso - NeoCircuit Lab"
  - Detalles: Tamaño, fecha, ubicación
- [ ] **Nodo 7:** En caso de error, enviar alerta urgente
- [ ] Testing con diferentes escenarios

#### 7.3 Workflow 3: Alertas de Stock Bajo
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Schedule (todos los días a las 9:00 AM)
- [ ] **Nodo 1:** Query a PostgreSQL
  ```sql
  SELECT * FROM repuestos 
  WHERE cantidad < stock_minimo 
  ORDER BY cantidad ASC
  ```
- [ ] **Nodo 2:** IF - Verificar si hay resultados
- [ ] **Nodo 3:** Formatear lista HTML de repuestos críticos
- [ ] **Nodo 4:** Enviar email al administrador
  - Asunto: "⚠️ Alerta: Stock bajo en repuestos"
  - Lista de repuestos con:
    - Nombre
    - Stock actual
    - Stock mínimo
    - Proveedor
  - Sugerencia de pedido
- [ ] **Nodo 5:** Registrar alerta en tabla de logs
- [ ] Testing con datos reales

#### 7.4 Workflow 4: Reporte Semanal Automático
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Schedule (Lunes a las 9:00 AM)
- [ ] **Nodo 1:** Llamar API `/api/reportes/semanal`
  - Órdenes creadas
  - Órdenes cerradas
  - Ingresos totales
  - Repuestos más usados
  - Clientes atendidos
- [ ] **Nodo 2:** Generar PDF del reporte (llamar API)
- [ ] **Nodo 3:** Enviar email al dueño del taller
  - Asunto: "Reporte Semanal - NeoCircuit Lab"
  - Adjunto: PDF con estadísticas
- [ ] **Nodo 4:** Guardar PDF en Google Drive
  - Carpeta: "NeoCircuitLab/Reportes/Semanales"
- [ ] Testing con diferentes períodos

#### 7.5 Workflow 5: Recordatorio de Equipos Sin Retirar
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Schedule (cada 3 días)
- [ ] **Nodo 1:** Query a PostgreSQL
  ```sql
  SELECT o.*, c.nombre, c.telefono, c.email, e.marca, e.modelo
  FROM ordenes_reparacion o
  JOIN clientes c ON o.cliente_id = c.id
  JOIN equipos e ON o.equipo_id = e.id
  WHERE o.estado = 'Listo' 
  AND o.fecha_estado_listo < NOW() - INTERVAL '7 days'
  AND (o.ultima_notificacion IS NULL OR o.ultima_notificacion < NOW() - INTERVAL '3 days')
  ```
- [ ] **Nodo 2:** Loop - Para cada orden pendiente
- [ ] **Nodo 3:** Enviar SMS/WhatsApp al cliente
  - Mensaje: "Hola [Cliente], te recordamos que tu [Equipo] está listo para retirar desde el [Fecha]. Taller NeoCircuit Lab."
- [ ] **Nodo 4:** Enviar email de recordatorio
- [ ] **Nodo 5:** Actualizar campo `ultima_notificacion` en BD
- [ ] **Nodo 6:** Registrar notificación enviada
- [ ] Testing con órdenes de prueba

#### 7.6 Workflow 6: Webhook de Orden Creada
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Webhook `/webhook/orden-creada`
- [ ] **Nodo 1:** Recibir datos de la nueva orden
- [ ] **Nodo 2:** Enviar email de confirmación al cliente
  - Asunto: "Recibimos tu equipo - NeoCircuit Lab"
  - Detalles: Número de orden, equipo, fecha estimada
- [ ] **Nodo 3:** Notificar al técnico asignado (opcional)
- [ ] Testing

#### 7.7 Workflow 7: Alertas de Órdenes Vencidas
- [ ] Crear workflow en N8N
- [ ] **Trigger:** Schedule (Lunes, Miércoles, Viernes a las 10:00 AM)
- [ ] **Nodo 1:** Query órdenes con más de 30 días sin cerrar
- [ ] **Nodo 2:** IF - Verificar si hay órdenes vencidas
- [ ] **Nodo 3:** Formatear lista de órdenes
- [ ] **Nodo 4:** Enviar email al administrador
  - Asunto: "⚠️ Órdenes vencidas - Requieren atención"
  - Lista con cliente, equipo, días transcurridos
- [ ] Testing

#### 7.8 Configuración de Credenciales en N8N
- [ ] Configurar credenciales de Gmail/SMTP
- [ ] Configurar API de WhatsApp Business (opcional)
- [ ] Configurar credenciales de Google Drive
- [ ] Configurar PostgreSQL credentials
- [ ] Configurar HTTP credentials para API backend

#### 7.9 Documentación de Workflows
- [ ] Documentar cada workflow creado
- [ ] Exportar workflows como JSON (backup)
- [ ] Crear guía de troubleshooting
- [ ] Manual de uso para el administrador

#### 7.10 Testing e Integración
- [ ] Probar cada workflow individualmente
- [ ] Verificar recepción de webhooks desde backend
- [ ] Probar flujo completo end-to-end
- [ ] Configurar logging y monitoreo
- [ ] Ajustar horarios según zona horaria

**Entregables Fase 7:**
- 7 workflows de N8N completamente funcionales
- Sistema de notificaciones automáticas
- Backups automáticos configurados
- Alertas de stock y órdenes
- Documentación completa de workflows

---

### **FASE 8: Módulo de Historial Técnico y Reportes (Semana 9)**

#### 8.1 Backend - Historial
- [ ] Entidad `HistorialTecnico` ya implementada en auditoría
- [ ] Queries avanzadas para reportes:
  - Historial completo por orden
  - Historial por equipo
  - Historial por cliente
  - Historial por técnico
  - Historial por rango de fechas
- [ ] Endpoint para obtener timeline completo

#### 8.2 Backend - Sistema de Reportes
- [ ] Crear `ReportesService`
- [ ] Queries para estadísticas:
  - **Órdenes por mes** (últimos 12 meses)
  - **Órdenes por estado** (actual)
  - **Equipos más reparados** (top 10)
  - **Clientes más frecuentes** (top 10)
  - **Repuestos más usados** (top 10)
  - **Ingresos por período** (día/semana/mes/año)
  - **Técnicos más productivos**
  - **Tiempo promedio de reparación** por tipo de equipo
  - **Órdenes vencidas** (más de X días)
- [ ] Endpoint `/api/reportes/dashboard` - Métricas principales
- [ ] Endpoint `/api/reportes/semanal` - Reporte semanal completo
- [ ] Endpoint `/api/reportes/mensual` - Reporte mensual

#### 8.3 Frontend - UI de Historial
- [ ] Vista cronológica de historial (timeline)
- [ ] Filtros avanzados:
  - Por fecha (desde/hasta)
  - Por tipo de acción
  - Por usuario
  - Por entidad (Cliente/Equipo/Orden)
- [ ] Exportar historial a PDF/Excel

#### 8.4 Frontend - Dashboard de Reportes
- [ ] **Dashboard Ejecutivo** con:
  - Tarjetas de KPIs principales
  - Gráfica de órdenes por mes (line chart)
  - Gráfica de órdenes por estado (pie chart)
  - Top 5 equipos más reparados (bar chart)
  - Top 5 clientes frecuentes
  - Ingresos del mes actual vs mes anterior
  - Alertas visuales (órdenes vencidas, stock bajo)
- [ ] Usar Recharts o Chart.js
- [ ] Filtros de período (hoy/semana/mes/año)
- [ ] Actualización en tiempo real
- [ ] Exportar dashboard a PDF

**Entregables Fase 8:**
- Sistema de auditoría y historial completo
- Dashboard con métricas del negocio
- Reportes exportables

---

### **FASE 9: Autenticación y Roles (Semana 10)**

#### 9.1 Backend - Identity
- [ ] Configurar ASP.NET Core Identity
- [ ] Entidad `Usuario` extendiendo IdentityUser
- [ ] Roles: 
  - **Administrador** - Acceso completo
  - **Técnico** - Gestión de órdenes y repuestos
  - **Usuario** - Solo registro y consulta
- [ ] Crear usuarios por defecto en seed
- [ ] Gestión de contraseñas seguras
- [ ] Políticas de contraseñas

#### 9.2 Backend - JWT
- [ ] Implementar autenticación JWT
- [ ] Configurar tokens con claims (rol, userId, email)
- [ ] Refresh tokens
- [ ] Token expiration (60 minutos)
- [ ] Proteger endpoints por rol con `[Authorize(Roles = "...")]`

#### 9.3 Backend - API de Autenticación
- [ ] `AuthController`:
  - `POST /api/auth/login` - Login
  - `POST /api/auth/refresh` - Refresh token
  - `POST /api/auth/logout` - Logout
  - `POST /api/auth/change-password` - Cambiar contraseña
  - `GET /api/auth/me` - Usuario actual
- [ ] `UsuariosController` (solo Admin):
  - `GET /api/usuarios` -
