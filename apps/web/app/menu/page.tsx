'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const categories = ['Salatlar', 'Birinchi ovqatlar', 'Ikkinchi ovqatlar', 'Pide', 'Kaboblar'];

  useEffect(() => {
    apiFetch('/api/menu')
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">UY</span>
        <h1 className="text-3xl font-semibold mt-4 text-white">Menyu</h1>
        <p className="text-[#9aa0aa] mt-2">Tezkor buyurtma va sevimli taomlar.</p>
        <div className="mt-5 grid gap-3">
          <div className="relative">
            <input className="input pl-10" placeholder="Izlash" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">🔍</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="px-4 py-1 rounded-full border border-[#2f353f] text-sm text-[#9aa0aa] hover:border-[#1db954]">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/order" className="button">Buyurtma berish</Link>
          <Link href="/reservation" className="button-outline">Stol bron</Link>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Salatlar</h2>
        {items.length === 0 ? (
          <div className="card text-[#9aa0aa]">Hozircha taomlar yo‘q.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="card flex flex-col md:flex-row gap-4 items-center">
              <div className="h-24 w-24 rounded-xl bg-[#0f141b] overflow-hidden">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-[#9aa0aa]">{item.description}</p>
                <div className="mt-2 flex items-center gap-3 text-sm text-[#9aa0aa]">
                  <span>⏱ 15 min</span>
                  <span>🚚 30 min</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white">{item.price.toLocaleString()} so'm</p>
                <button className="mt-2 button-outline">Sevimli</button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
