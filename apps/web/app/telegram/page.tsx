'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function TelegramPanel() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [status, setStatus] = useState('');

  const setupWebhook = async () => {
    try {
      await apiFetch('/api/telegram/setup', {
        method: 'POST',
        body: JSON.stringify({ webhookUrl })
      });
      setStatus('Webhook sozlandi.');
    } catch (error) {
      setStatus('Webhook sozlashda xatolik.');
    }
  };

  return (
    <main className="section py-16 space-y-6">
      <div className="card">
        <h1 className="text-3xl font-semibold">Telegram Bot Panel</h1>
        <p className="text-neutral-400 mt-2">Bot sozlamalari va webhook boshqaruvi.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <input
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
            placeholder="Webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <button className="button" onClick={setupWebhook}>Webhook sozlash</button>
        </div>
        {status ? <p className="text-sm text-neutral-400 mt-3">{status}</p> : null}
      </div>
    </main>
  );
}
