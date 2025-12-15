export async function apiFetch(path: string, opts: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const incoming: Record<string, string> =
    typeof opts.headers === 'object' && opts.headers !== null && !Array.isArray(opts.headers)
      ? (opts.headers as Record<string, string>)
      : {};
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...incoming };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, { ...opts, headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'API error');
  return json;
}

export async function authLogin(email: string, password: string) {
  return apiFetch('/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function authRegister(firstName: string, lastName: string, email: string, password: string) {
  return apiFetch('/api/v1/auth/signup', { method: 'POST', body: JSON.stringify({ firstName, lastName, email, password }) });
}

export async function getMe() {
  return apiFetch('/api/v1/users/me');
}
