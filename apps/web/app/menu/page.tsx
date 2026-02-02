'use client';

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
    <main className="section py-16">
      <h1 className="text-3xl font-semibold">Menyu</h1>
      <p className="text-neutral-300 mt-2">Taomnoma admin panel orqali boshqariladi.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.length === 0 ? (
          <div className="text-neutral-400">Hozircha taomlar yo‘q.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="card">
              <div className="h-40 rounded-xl bg-neutral-800 overflow-hidden">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
              <p className="text-sm text-neutral-400">{item.description}</p>
              <p className="text-brand-500 mt-2 font-semibold">{item.price.toLocaleString()} so'm</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
