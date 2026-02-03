"use client";

import { useState } from "react";

type OrderItem = { menuItemId: number; quantity: number };

export default function OrderPage() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState<OrderItem[]>([{ menuItemId: 1, quantity: 1 }]);
  const [message, setMessage] = useState("");

  const addItem = () => setItems([...items, { menuItemId: 1, quantity: 1 }]);

  const submit = async () => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Iltimos, buyurtma berish uchun tizimga kiring.");
      return;
    }
    const res = await fetch(`${base}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ address, phone, items }),
    });
    if (!res.ok) {
      setMessage("Buyurtma yuborilmadi.");
      return;
    }
    setMessage("Buyurtma yuborildi!");
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0f2a1b]">Buyurtma berish</h1>
      <div className="mt-6 grid gap-4 rounded-2xl border border-[#d8c08a] bg-white p-6">
        <input className="rounded-lg border border-[#d8c08a] px-4 py-3" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="rounded-lg border border-[#d8c08a] px-4 py-3" placeholder="Manzil" value={address} onChange={(e) => setAddress(e.target.value)} />
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <input className="rounded-lg border border-[#d8c08a] px-4 py-3" placeholder="Menu ID" value={item.menuItemId} onChange={(e) => {
                const next = [...items];
                next[index].menuItemId = Number(e.target.value);
                setItems(next);
              }} />
              <input className="rounded-lg border border-[#d8c08a] px-4 py-3" placeholder="Miqdor" value={item.quantity} onChange={(e) => {
                const next = [...items];
                next[index].quantity = Number(e.target.value);
                setItems(next);
              }} />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={addItem} className="rounded-full border border-[#caa24a] px-4 py-2 text-sm text-[#173a2a]">Yana qo‘shish</button>
          <button onClick={submit} className="rounded-full bg-[#173a2a] px-4 py-2 text-sm text-white">Buyurtma berish</button>
        </div>
        {message && <p className="text-sm text-[#6b5a2b]">{message}</p>}
      </div>
    </section>
  );
}
