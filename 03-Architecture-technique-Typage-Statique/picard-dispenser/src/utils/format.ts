export function eurosToCents(euroStr: string): number | null {
    const normalized = euroStr.replace(",", ".").trim();
    const val = Number(normalized);
    if (!isFinite(val) || val <= 0) return null;
    return Math.round(val * 100);
  }
  
  export function centsToEuros(cents: number): string {
    return (cents / 100).toLocaleString(undefined, {
      style: "currency",
      currency: "EUR",
    });
  }
  