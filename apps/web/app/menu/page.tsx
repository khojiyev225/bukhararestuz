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

  useEffect(() => {
    apiFetch('/api/menu')
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">MILLIY TAOMLAR</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Menyu</h1>
        <p className="text-[#6b5a2b] mt-2">Buxoro uslubidagi taomlar va zamonaviy taqdim.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/reservation" className="button">Stol band qilish</Link>
          <Link href="/order" className="button-outline">Yetkazib berish</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="card text-[#6b5a2b]">Hozircha taomlar yo‘q.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="card">
              <div className="h-40 rounded-xl bg-[#f5ecd2] overflow-hidden">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <h3 className="text-lg font-semibold mt-4 text-[#173a2a]">{item.name}</h3>
              <p className="text-sm text-[#6b5a2b]">{item.description}</p>
              <p className="text-[#c9a145] mt-2 font-semibold">{item.price.toLocaleString()} so'm</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
