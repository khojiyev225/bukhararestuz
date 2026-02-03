"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
import { auth } from "../../lib/firebase";

type Order = {
  _id: string;
  deliveryAddress?: string;
  status: string;
  total: number;
  items: { name: string; qty: number }[];
};

export default function CourierPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMessage("Courier panelga kirish uchun tizimga kiring.");
        return;
      }
      try {
        const data = await apiFetch("/api/orders");
        setOrders(data.orders || []);
      } catch (error) {
        setOrders([]);
      }
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await apiFetch(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status })
    });
  };

  if (message) return <p className="mx-auto max-w-4xl px-4 py-12 text-neutral-500">{message}</p>;

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">DELIVERY</span>
        <h1 className="text-3xl font-semibold mt-4">Courier panel</h1>
        <p className="text-neutral-400 mt-2">Yetkazib berish buyurtmalari.</p>
      </div>
      <div className="grid gap-4">
        {orders.map((o) => (
          <div key={o._id} className="card">
            <p className="text-sm text-neutral-500">#{o._id}</p>
            <p className="text-sm text-neutral-500">Manzil: {o.deliveryAddress || '—'}</p>
            <p className="text-sm text-neutral-500">Holat: {o.status}</p>
            <p className="text-sm text-neutral-500">Jami: {o.total?.toLocaleString?.() || 0} so'm</p>
            <p className="text-sm text-neutral-500">Taomlar: {o.items?.map((i) => `${i.name} x${i.qty}`).join(', ')}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => updateStatus(o._id, "accepted")} className="button-outline">Qabul</button>
              <button onClick={() => updateStatus(o._id, "in_delivery")} className="button">Yetkazilmoqda</button>
              <button onClick={() => updateStatus(o._id, "completed")} className="button-outline">Yakunlandi</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
