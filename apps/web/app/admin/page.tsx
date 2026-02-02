'use client';

import Link from 'next/link';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { auth } from '../../lib/firebase';

type Stats = {
  orders: number;
  bookings: number;
  users: number;
};

type Booking = {
  _id: string;
  name: string;
  phone: string;
  date: string;
  guests: number;
  status: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [menuStatus, setMenuStatus] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!auth) {
      setAuthChecked(true);
      return undefined;
    }
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    apiFetch('/api/analytics/dashboard')
      .then((data) => setStats(data))
      .catch(() => setStats(null));
    apiFetch('/api/bookings')
      .then((data) => setBookings(data.bookings || []))
      .catch(() => setBookings([]));
  }, [currentUser]);

  const handleCreateMenu = async () => {
    setMenuStatus('Yuklanmoqda...');
    try {
      await apiFetch('/api/menu', {
        method: 'POST',
        body: JSON.stringify({
          name: menuForm.name,
          description: menuForm.description,
          price: Number(menuForm.price),
          imageUrl: menuForm.imageUrl || undefined
        })
      });
      setMenuForm({ name: '', description: '', price: '', imageUrl: '' });
      setMenuStatus('Menyu elementi qo‘shildi.');
    } catch (error) {
      setMenuStatus('Menyu qo‘shishda xatolik.');
    }
  };

  return (
    <main className="section py-16 space-y-8">
      {authChecked && !currentUser ? (
        <div className="card">
          <h2 className="text-xl font-semibold">Admin panel</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Admin panelga kirish uchun tizimga kiring va admin ruxsatiga ega bo‘ling.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/login" className="button">Kirish</Link>
            <Link href="/register" className="button-outline">Ro‘yxatdan o‘tish</Link>
          </div>
        </div>
      ) : null}
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
        {['Menyu', 'Bronlar', 'Buyurtmalar', 'Analitika', 'Foydalanuvchilar', 'Sozlamalar'].map((title) => (
          <div key={title} className="card">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-400 mt-2">Tezkor boshqaruv bloklari</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Menyu qo‘shish</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            className="input"
            placeholder="Taom nomi"
            value={menuForm.name}
            onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Narx (so‘m)"
            value={menuForm.price}
            onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
          />
          <input
            className="input md:col-span-2"
            placeholder="Tavsif"
            value={menuForm.description}
            onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
          />
          <input
            className="input md:col-span-2"
            placeholder="Rasm URL (ixtiyoriy)"
            value={menuForm.imageUrl}
            onChange={(e) => setMenuForm({ ...menuForm, imageUrl: e.target.value })}
          />
        </div>
        <button className="button mt-4" onClick={handleCreateMenu}>Menyu qo‘shish</button>
        {menuStatus ? <p className="text-sm text-neutral-400 mt-2">{menuStatus}</p> : null}
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">So‘nggi bronlar</h2>
        <div className="mt-4 space-y-3">
          {bookings.length === 0 ? (
            <p className="text-sm text-neutral-400">Hozircha bronlar yo‘q.</p>
          ) : (
            bookings.slice(0, 6).map((booking) => (
              <div key={booking._id} className="flex flex-wrap items-center justify-between gap-2 border border-neutral-800 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{booking.name}</p>
                  <p className="text-xs text-neutral-400">{booking.phone}</p>
                </div>
                <div className="text-xs text-neutral-400">
                  {new Date(booking.date).toLocaleDateString('uz-UZ')} • {booking.guests} kishi
                </div>
                <span className="text-xs text-brand-500 uppercase">{booking.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Rasm va taomnoma boshqaruvi</h2>
        <p className="text-sm text-neutral-400 mt-2">Admin panel orqali rasm, menyu va bannerlarni yangilash.</p>
      </div>
    </main>
  );
}
