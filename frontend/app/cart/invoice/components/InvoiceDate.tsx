"use client";
type Props = { invId: string; invoiceDate: string; dueDate: string; methodLabel: string; note: string };
export default function InvoiceDate({ invId, invoiceDate, dueDate, methodLabel, note }: Props) {
  return (
    <div className="rounded-2xl bg-white border border-[#E8D9C6] p-6 w-full max-w-[420px]">
      <div className="space-y-3 text-[#2a1a13]">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="text-[#7a6555]">Invoice #</div><div className="font-semibold">{invId}</div>
          <div className="text-[#7a6555]">Invoice date</div><div className="font-semibold">{invoiceDate}</div>
          <div className="text-[#7a6555]">Due date</div><div className="font-semibold">{dueDate}</div>
          <div className="text-[#7a6555]">Payment</div><div className="font-semibold">{methodLabel}</div>
        </div>
        <div className="text-[#7a6555]">{note}</div>
      </div>
    </div>
  );
}

