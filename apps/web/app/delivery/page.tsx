'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function DeliveryPage() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const placeOrder = async () => {
    try {
      await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: [
            { name: 'Plov', price: 45000, qty: 1 }
          ],
          total: 45000,
          deliveryAddress: address
        })
      });
      setStatus('Buyurtma qabul qilindi!');
    } catch (error) {
      setStatus('Buyurtma yuborishda xatolik.');
    }
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">YETKAZIB BERISH</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Yetkazib berish</h1>
        <p className="text-[#6b5a2b] mt-2">Issiq taomlar, tez yetkazish va ishonchli xizmat.</p>
      </div>
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-2xl font-semibold">Buyurtma ma'lumotlari</h2>
        <p className="text-[#6b5a2b] mt-2">Buyurtmani tez va xavfsiz qabul qiling.</p>
        <div className="mt-6 space-y-4">
          <input className="input" placeholder="Yetkazib berish manzili" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button className="button" onClick={placeOrder}>Buyurtma berish</button>
          {status ? <p className="text-sm text-[#8b7b45]">{status}</p> : null}
        </div>
      </div>
    </main>
  );
}
