import { Client, RepairOrder } from "../types";

// Helper to download CSV
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(fieldName => {
        const val = row[fieldName as keyof typeof row];
        return JSON.stringify(val); // handle commas/quotes
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Calculate Seniority
export const calculateSeniority = (entryDate: string): { years: number, months: number, days: number } => {
  const start = new Date(entryDate);
  const end = new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = (diffDays % 365) % 30;

  return { years, months, days };
};

export const getClientCategory = (entryDate: string) => {
  const { years, months } = calculateSeniority(entryDate);
  const totalMonths = (years * 12) + months;
  
  if (totalMonths < 6) return 'NEW';
  if (totalMonths >= 24) return 'VIP';
  return 'REGULAR';
};

// Trigger Print for PDF
export const printElement = (elementId: string) => {
  const printContent = document.getElementById(elementId);
  if (!printContent) return;
  
  const windowUrl = 'about:blank';
  const uniqueName = new Date();
  const windowName = 'Print' + uniqueName.getTime();
  
  // Create an iframe to print without losing state
  const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
  
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>NeoCircuit Lab Export</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #1e3a8a; }
            .header { margin-bottom: 20px; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NeoCircuit Lab</h1>
            <p>Reporte Generado: ${new Date().toLocaleDateString()}</p>
          </div>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
};