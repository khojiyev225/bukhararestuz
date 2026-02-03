'use client';

import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { apiFetch } from '../../lib/api';

type Booking = {
  _id: string;
  name: string;
  phone: string;
  date: string;
  guests: number;
  status: string;
};

type Order = {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!auth) {
      setAuthChecked(true);
      return undefined;
    }
    return onAuthStateChanged(auth, (current) => {
      setUser(current);
      setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    apiFetch('/api/bookings/mine').then((data) => setBookings(data.bookings || [])).catch(() => setBookings([]));
    apiFetch('/api/orders/mine').then((data) => setOrders(data.orders || [])).catch(() => setOrders([]));
  }, [user]);

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">PROFIL</span>
        <h1 className="text-3xl font-semibold mt-4 text-white">Profil</h1>
        <p className="text-[#9aa0aa] mt-2">Sozlamalar va shaxsiy ma’lumotlar.</p>
      </div>

      {authChecked && !user ? (
        <div className="card">
          <p className="text-sm text-[#9aa0aa]">Profilni ko‘rish uchun tizimga kiring.</p>
        </div>
      ) : null}

      {user ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-[#1db954] text-white flex items-center justify-center font-semibold">
                {user.displayName?.slice(0, 1) || 'B'}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{user.displayName || 'Mehmon'}</p>
                <p className="text-sm text-[#9aa0aa]">{user.phoneNumber || user.email || '—'}</p>
              </div>
            </div>
          </div>
          <div className="card lg:col-span-2">
            <div className="space-y-2">
              {[
                'Profil',
                'Manzil',
                'Bildirishnoma',
                'Sevimli taomlarim',
                'Til',
                'Qorong‘u rejim',
                'Qo‘llab-quvvatlash markazi',
                'Chiqish'
              ].map((item) => (
                <div key={item} className="flex items-center justify-between border border-[#2a2f39] rounded-xl px-4 py-3">
                  <span className="text-sm text-white">{item}</span>
                  <span className="text-[#6b7280]">›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
