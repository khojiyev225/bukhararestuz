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
      <div className="page-hero">
        <span className="badge">TELEGRAM BOT</span>
        <h1 className="text-3xl font-semibold mt-4">Telegram Bot Panel</h1>
        <p className="text-neutral-400 mt-2">Bot sozlamalari, webhook va integratsiyalar.</p>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">Webhook sozlash</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <input
            className="input"
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
