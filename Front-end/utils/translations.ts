import { Language } from '../types';

export const translations = {
  es: {
    // Auth
    loginTitle: "Iniciar Sesión",
    loginSubtitle: "Bienvenido a NeoCircuit Lab",
    userLabel: "Usuario",
    passwordLabel: "Contraseña",
    loginButton: "Ingresar",
    
    // Roles
    roleAdmin: "Administrador",
    roleTech: "Técnico",
    roleUser: "Usuario",

    // Sidebar
    navHome: "Inicio",
    navClients: "Clientes",
    navEquipment: "Equipos",
    navOrders: "Órdenes",
    navParts: "Repuestos",
    navHistory: "Historial",
    navReports: "Reportes",
    navSettings: "Configuración",
    navAudit: "Auditoría",
    logout: "Cerrar Sesión",

    // Header
    searchPlaceholder: "Buscar orden, cliente...",
    systemActive: "Sistema Activo",
    
    // Dashboard
    statsPending: "Pendientes",
    statsInShop: "En Taller",
    statsReady: "Listos",
    statsClients: "Clientes Totales",
    recentOrders: "Órdenes Recientes",
    viewAll: "Ver todo",
    weeklyChart: "Órdenes Semanales",
    
    // Table Headers
    colId: "ID",
    colClient: "Cliente",
    colEquipment: "Equipo",
    colStatus: "Estado",
    colCost: "Costo",
    colAction: "Acción",
    colDate: "Fecha",
    colUser: "Usuario",
    colDetails: "Detalles",
    colCategory: "Categoría",
    colSeniority: "Antigüedad",
    
    // Equipment Headers
    colBrand: "Marca",
    colModel: "Modelo",
    colType: "Tipo",
    colSerial: "N° Serie",
    colCondition: "Estado Físico",
    
    // Actions
    btnManage: "Gestionar",
    btnView: "Ver",
    btnExportExcel: "Exportar Excel",
    btnExportPDF: "Exportar PDF",
    btnNewOrder: "Nueva Orden",
    btnSave: "Guardar Orden",
    btnCancel: "Cancelar",
    btnAiDiagnosis: "Diagnóstico IA",
    
    // Views
    clientsTitle: "Gestión de Clientes",
    ordersTitle: "Registro de Trabajos",
    auditTitle: "Auditoría del Sistema",
    inventoryTitle: "Inventario & Equipos",
    newOrderTitle: "Nueva Orden de Reparación",
    
    // Form Sections
    secClient: "Datos del Cliente",
    secEquipment: "Datos del Equipo",
    secProblem: "Motivo de Ingreso / Problema",
    secDiagnosis: "Observaciones / Diagnóstico",
    aiSuggestion: "Sugerencia IA (Gemini)",
    
    // Form Fields
    fieldFullName: "Nombre Completo",
    fieldDocId: "Cédula / RUC",
    fieldAddress: "Dirección",
    fieldPhone: "Teléfono",
    fieldEquipType: "Tipo de Equipo",
    fieldBrand: "Marca",
    fieldModel: "Modelo",
    fieldSerial: "Nº Serie",
    fieldProblemPlaceholder: "Describa el problema...",
    fieldObsPlaceholder: "Observaciones técnicas...",

    // Categories
    catNew: "Nuevo",
    catRegular: "Regular",
    catVip: "VIP",
    
    // Misc
    newEquipments: "Equipos nuevos",
    activeOrders: "Órdenes activas",
    forDelivery: "Para entrega",
    vsLastMonth: "vs mes anterior",
  },
  en: {
    // Auth
    loginTitle: "Sign In",
    loginSubtitle: "Welcome to NeoCircuit Lab",
    userLabel: "User",
    passwordLabel: "Password",
    loginButton: "Login",

    // Roles
    roleAdmin: "Administrator",
    roleTech: "Technician",
    roleUser: "User",

    // Sidebar
    navHome: "Dashboard",
    navClients: "Clients",
    navEquipment: "Equipment",
    navOrders: "Orders",
    navParts: "Parts",
    navHistory: "History",
    navReports: "Reports",
    navSettings: "Settings",
    navAudit: "Audit",
    logout: "Sign Out",

    // Header
    searchPlaceholder: "Search order, client...",
    systemActive: "System Active",

    // Dashboard
    statsPending: "Pending",
    statsInShop: "In Workshop",
    statsReady: "Ready",
    statsClients: "Total Clients",
    recentOrders: "Recent Orders",
    viewAll: "View All",
    weeklyChart: "Weekly Orders",

    // Table Headers
    colId: "ID",
    colClient: "Client",
    colEquipment: "Equipment",
    colStatus: "Status",
    colCost: "Cost",
    colAction: "Action",
    colDate: "Date",
    colUser: "User",
    colDetails: "Details",
    colCategory: "Category",
    colSeniority: "Seniority",

    // Equipment Headers
    colBrand: "Brand",
    colModel: "Model",
    colType: "Type",
    colSerial: "Serial No.",
    colCondition: "Condition",

    // Actions
    btnManage: "Manage",
    btnView: "View",
    btnExportExcel: "Export Excel",
    btnExportPDF: "Export PDF",
    btnNewOrder: "New Order",
    btnSave: "Save Order",
    btnCancel: "Cancel",
    btnAiDiagnosis: "AI Diagnosis",

    // Views
    clientsTitle: "Client Management",
    ordersTitle: "Job Registry",
    auditTitle: "System Audit",
    inventoryTitle: "Inventory & Equipment",
    newOrderTitle: "New Repair Order",

    // Form Sections
    secClient: "Client Data",
    secEquipment: "Equipment Data",
    secProblem: "Entry Reason / Problem",
    secDiagnosis: "Observations / Diagnosis",
    aiSuggestion: "AI Suggestion (Gemini)",
    
    // Form Fields
    fieldFullName: "Full Name",
    fieldDocId: "ID Document",
    fieldAddress: "Address",
    fieldPhone: "Phone",
    fieldEquipType: "Equipment Type",
    fieldBrand: "Brand",
    fieldModel: "Model",
    fieldSerial: "Serial No.",
    fieldProblemPlaceholder: "Describe the problem...",
    fieldObsPlaceholder: "Technical observations...",

    // Categories
    catNew: "New",
    catRegular: "Regular",
    catVip: "VIP",

    // Misc
    newEquipments: "New equipment",
    activeOrders: "Active orders",
    forDelivery: "For delivery",
    vsLastMonth: "vs last month",
  }
};

export const getTexts = (lang: Language) => translations[lang];