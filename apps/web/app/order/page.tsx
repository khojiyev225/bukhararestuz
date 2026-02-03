"use client";

import { useMemo, useState } from "react";
import { apiFetch } from "../../lib/api";

type OrderItem = { name: string; price: number; qty: number };

export default function OrderPage() {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [items, setItems] = useState<OrderItem[]>([{ name: "", price: 0, qty: 1 }]);
  const [message, setMessage] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0),
    [items]
  );

  const addItem = () => setItems([...items, { name: "", price: 0, qty: 1 }]);

  const updateItem = (index: number, key: keyof OrderItem, value: string) => {
    const next = [...items];
    if (key === "price" || key === "qty") {
      next[index][key] = Number(value) as any;
    } else {
      next[index][key] = value as any;
    }
    setItems(next);
  };

  const submit = async () => {
    try {
      await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({ items, total, deliveryAddress })
      });
      setMessage("Buyurtma yuborildi!");
    } catch (error) {
      setMessage("Buyurtma yuborilmadi.");
    }
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">BUYURTMA</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Buyurtma berish</h1>
        <p className="text-[#6b5a2b] mt-2">Taomlar ro‘yxatini kiriting va buyurtmani yuboring.</p>
      </div>

      <div className="card max-w-3xl mx-auto space-y-4">
        <input
          className="input"
          placeholder="Yetkazib berish manzili"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-3">
              <input
                className="input"
                placeholder="Taom nomi"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
              />
              <input
                className="input"
                placeholder="Narx"
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
              />
              <input
                className="input"
                placeholder="Miqdor"
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={addItem} className="button-outline">Yana qo‘shish</button>
          <div className="text-sm text-[#8b7b45]">Jami: <span className="font-semibold text-[#173a2a]">{total.toLocaleString()} so'm</span></div>
          <button onClick={submit} className="button">Buyurtma berish</button>
        </div>
        {message && <p className="text-sm text-[#8b7b45]">{message}</p>}
      </div>
    </main>
  );
}
