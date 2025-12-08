export const formatCurrency = (amount: number): string => {
  // Multiply by 1000 to simulate realistic repair costs in Guaranies if inputs are small integers,
  // or just format the raw number if your data is already correct.
  // Assuming mock data (e.g., 350) represents thousands for realism in this demo context,
  // or we just format the raw number.
  // Standard PYG formatting usually has no decimals.
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};