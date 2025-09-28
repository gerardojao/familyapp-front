// utils/date.ts
export function soloFecha(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    const t = value.indexOf('T');
    if (t > 0) return value.slice(0, t); // "YYYY-MM-DD" si viene ISO
  }
  const d = new Date(value);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // evita desfase por TZ
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}
