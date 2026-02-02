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
        <h1 className="text-3xl font-semibold mt-4">Mening profilim</h1>
        <p className="text-neutral-300 mt-2">Buyurtmalar, bronlar va shaxsiy ma’lumotlar.</p>
      </div>

      {authChecked && !user ? (
        <div className="card">
          <p className="text-sm text-neutral-400">Profilni ko‘rish uchun tizimga kiring.</p>
        </div>
      ) : null}

      {user ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card lg:col-span-1">
            <h2 className="text-xl font-semibold">Ma’lumotlar</h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-300">
              <p><span className="text-neutral-500">Ism:</span> {user.displayName || '—'}</p>
              <p><span className="text-neutral-500">Email:</span> {user.email || '—'}</p>
              <p><span className="text-neutral-500">Telefon:</span> {user.phoneNumber || '—'}</p>
            </div>
          </div>
          <div className="card lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Bronlar tarixi</h3>
              <div className="mt-3 space-y-3">
                {bookings.length === 0 ? (
                  <p className="text-sm text-neutral-400">Bronlar yo‘q.</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking._id} className="flex flex-wrap items-center justify-between gap-2 border border-neutral-800 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">{booking.name}</p>
                        <p className="text-xs text-neutral-500">{booking.phone}</p>
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
            <div>
              <h3 className="text-lg font-semibold">Buyurtmalar tarixi</h3>
              <div className="mt-3 space-y-3">
                {orders.length === 0 ? (
                  <p className="text-sm text-neutral-400">Buyurtmalar yo‘q.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="flex flex-wrap items-center justify-between gap-2 border border-neutral-800 rounded-xl px-4 py-3">
                      <div className="text-sm">#{order._id.slice(-6)}</div>
                      <div className="text-xs text-neutral-400">{new Date(order.createdAt).toLocaleDateString('uz-UZ')}</div>
                      <div className="text-sm font-semibold text-brand-500">{order.total.toLocaleString()} so‘m</div>
                      <span className="text-xs text-brand-500 uppercase">{order.status}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
