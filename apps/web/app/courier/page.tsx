"use client";

import { useEffect, useState } from "react";

export default function CourierPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Courier panelga kirish uchun tizimga kiring.");
      return;
    }
    fetch(`${base}/orders/courier/new`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [base]);

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await fetch(`${base}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
  };

  if (message) return <p className="mx-auto max-w-4xl px-4 py-12 text-[#6b5a2b]">{message}</p>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0f2a1b]">Courier Panel</h1>
      <div className="mt-6 grid gap-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-[#d8c08a] bg-white p-4">
            <p className="text-sm text-[#6b5a2b]">#{o.id}</p>
            <p className="text-sm text-[#6b5a2b]">{o.address}</p>
            <p className="text-sm text-[#6b5a2b]">{o.phone}</p>
            <p className="text-sm text-[#6b5a2b]">{o.itemsSummary}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => updateStatus(o.id, "PREPARING")} className="rounded-full border border-[#caa24a] px-3 py-1 text-xs text-[#173a2a]">Qabul</button>
              <button onClick={() => updateStatus(o.id, "DELIVERED")} className="rounded-full bg-[#173a2a] px-3 py-1 text-xs text-white">Yuborildi</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
