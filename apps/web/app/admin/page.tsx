'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

type Stats = {
  orders: number;
  bookings: number;
  users: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch('/api/analytics/dashboard')
      .then((data) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">ADMIN HUDUD</span>
        <h1 className="text-3xl font-semibold mt-4">Admin panel</h1>
        <p className="text-neutral-400 mt-2">Barcha boshqaruv funksiyalari, statistikalar va sozlamalar.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/menu" className="button-outline">Menyuni ko‘rish</Link>
          <Link href="/booking" className="button">Bronlar ro‘yxati</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="stat-card">
          <p className="text-sm text-neutral-400">Buyurtmalar</p>
          <p className="text-3xl font-semibold mt-2">{stats?.orders ?? '—'}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-neutral-400">Bronlar</p>
          <p className="text-3xl font-semibold mt-2">{stats?.bookings ?? '—'}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-neutral-400">Mijozlar</p>
          <p className="text-3xl font-semibold mt-2">{stats?.users ?? '—'}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {['Menyu', 'Bronlar', 'Buyurtmalar', 'AI Analytics', 'Foydalanuvchilar', 'Sozlamalar'].map((title) => (
          <div key={title} className="card">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-400 mt-2">Tezkor boshqaruv bloklari</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Rasm va taomnoma boshqaruvi</h2>
        <p className="text-sm text-neutral-400 mt-2">Admin panel orqali rasm, menyu va bannerlarni yangilash.</p>
      </div>
    </main>
  );
}
