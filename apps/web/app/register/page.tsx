'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">RO‘YXATDAN O‘TISH</span>
        <h1 className="text-3xl font-semibold mt-4">Ro‘yxatdan o‘tish</h1>
        <p className="text-neutral-300 mt-2">Bir necha daqiqada ro‘yxatdan o‘ting va bron qiling.</p>
      </div>
      <div className="max-w-xl mx-auto card">
        <h1 className="text-2xl font-semibold">Ro'yxatdan o'tish</h1>
        <p className="text-sm text-neutral-400 mt-2">Telefon raqam orqali ro'yxatdan o'ting.</p>
        <div className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Ism"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            placeholder="+998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="button w-full">Ro'yxatdan o'tish</button>
        </div>
      </div>
    </main>
  );
}
