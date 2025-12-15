export type TransactionItem = {
  invoiceId: string;
  customer?: { firstName?: string; lastName?: string; name?: string };
  billingFirstName?: string;
  status?: string;
  method?: string;
  subtotal?: number;
  shipping?: number;
  total?: number;
  billingDate?: string;
  createdAt?: string;
};

function getBase() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function fetchRecentTransactions(limit = 8): Promise<TransactionItem[]> {
  const base = getBase();
  const token = getToken();
  const url = `${base}/api/v1/transactions?limit=${limit}`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const json: unknown = await res.json();
    const rawList: unknown =
      typeof json === "object" &&
      json !== null &&
      (Array.isArray((json as { items?: unknown }).items) || Array.isArray((json as { transactions?: unknown }).transactions))
        ? ((json as { items?: unknown; transactions?: unknown }).items ??
           (json as { items?: unknown; transactions?: unknown }).transactions)
        : Array.isArray(json)
        ? json
        : [];
    const list = Array.isArray(rawList) ? (rawList as Record<string, unknown>[]) : [];
    return list.map((t) => {
      const invoiceId = String((t.invoiceId as string) || (t.id as string) || (t.invoice as string) || "");
      const rawBilling = (t.billing as Record<string, unknown>) || (t.customer as Record<string, unknown>) || undefined;
      const customer: TransactionItem["customer"] | undefined = rawBilling
        ? {
            firstName: typeof rawBilling.firstName === "string" ? rawBilling.firstName : undefined,
            lastName: typeof rawBilling.lastName === "string" ? rawBilling.lastName : undefined,
            name: typeof rawBilling.name === "string" ? rawBilling.name : undefined,
          }
        : undefined;
      const status = String((t.status as string) || (t.state as string) || "pending");
      const method = t.method as string | undefined;
      const subtotal = Number(t.subtotal ?? t.amount ?? 0);
      const shipping = Number(t.shipping ?? 0);
      const total = Number(t.total ?? subtotal + shipping);
      const billingDate = (t.billingDate as string) || (t.createdAt as string) || (t.date as string);
      const createdAt = (t.createdAt as string) || (t.billingDate as string) || (t.date as string);
      const billingFirstName = typeof (t.billingFirstName as unknown) === "string" ? (t.billingFirstName as string) : undefined;
      return { invoiceId, customer, billingFirstName, status, method, subtotal, shipping, total, billingDate, createdAt };
    });
  } catch {
    return [];
  }
}

export async function updateTransactionStatus(idOrInvoice: string | number, status: "pending" | "paid" | "failed") {
  const base = getBase();
  const token = getToken();
  const url = `${base}/api/v1/transactions/${idOrInvoice}/status`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "API error");
  return json as { id: number; invoiceId: string; status: string };
}

export async function fetchTransactionStatusSummary(): Promise<{ pending: number; paid: number; failed: number }> {
  const base = getBase();
  const token = getToken();
  const url = `${base}/api/v1/transactions/status`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const json: unknown = await res.json();
    if (!res.ok) throw new Error((json as { message?: string }).message || "API error");
    const obj = (json as Record<string, unknown>) || {};
    const pending = Number(obj.pending ?? 0);
    const paid = Number(obj.paid ?? 0);
    const failed = Number(obj.failed ?? 0);
    return { pending, paid, failed };
  } catch {
    return { pending: 0, paid: 0, failed: 0 };
  }
}
