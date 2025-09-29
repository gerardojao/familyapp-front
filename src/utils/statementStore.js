const KEY = "fa:lastStatement";

export function saveStatementSummary(summary) {
  try { localStorage.setItem(KEY, JSON.stringify(summary)); } catch {}
}

export function loadStatementSummary() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
