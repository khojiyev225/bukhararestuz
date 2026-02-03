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
        <span className="badge">SAVAT</span>
        <h1 className="text-3xl font-semibold mt-4 text-white">Savat</h1>
        <p className="text-[#9aa0aa] mt-2">Hozirda savatingizdagi buyurtmalar.</p>
      </div>

      {items.every((item) => !item.name) ? (
        <div className="card text-center py-16">
          <div className="text-4xl">🧾</div>
          <h2 className="text-xl font-semibold text-white mt-4">Bo'sh</h2>
          <p className="text-[#9aa0aa] mt-2">Hozirda savatingizda mahsulot yo‘q.</p>
        </div>
      ) : null}

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
          <div className="text-sm text-[#9aa0aa]">Jami: <span className="font-semibold text-white">{total.toLocaleString()} so'm</span></div>
          <button onClick={submit} className="button">Buyurtma berish</button>
        </div>
        {message && <p className="text-sm text-[#9aa0aa]">{message}</p>}
      </div>
    </main>
  );
}
