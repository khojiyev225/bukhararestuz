'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <main className="section py-16">
      <div className="max-w-xl mx-auto card">
        <h1 className="text-2xl font-semibold">Ro'yxatdan o'tish</h1>
        <p className="text-sm text-neutral-400 mt-2">Telefon raqam orqali ro'yxatdan o'ting.</p>
        <div className="mt-6 space-y-4">
          <input
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
            placeholder="Ism"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
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
