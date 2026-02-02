'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: 2, notes: '' });
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await apiFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          date: form.date ? new Date(form.date).toISOString() : undefined
        })
      });
      setStatus('Bron qabul qilindi!');
    } catch (error) {
      setStatus('Bron yuborishda xatolik.');
    }
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">STOL BRON</span>
        <h1 className="text-3xl font-semibold mt-4">Stol band qilish</h1>
        <p className="text-neutral-300 mt-2">Mehmonlaringiz uchun qulay joyni oldindan tayyorlab qo‘yamiz.</p>
      </div>
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-2xl font-semibold">Bron ma'lumotlari</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input className="input" placeholder="Ism" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="input" type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
          <textarea className="textarea md:col-span-2" placeholder="Izoh" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        <button className="button mt-6" onClick={handleSubmit}>Bron qilish</button>
        {status ? <p className="text-sm text-neutral-400 mt-3">{status}</p> : null}
      </div>
    </main>
  );
}
