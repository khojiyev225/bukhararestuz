'use client';

import { useState } from 'react';
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth, googleProvider, appleProvider, firebaseReady } from '../../lib/firebase';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);

  const setupRecaptcha = () => {
    if (!auth) return null;
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
    return (window as any).recaptchaVerifier;
  };

  const handlePhone = async () => {
    if (!auth) return;
    const appVerifier = setupRecaptcha();
    if (!appVerifier) return;
    const result = await signInWithPhoneNumber(auth, phone, appVerifier);
    setConfirmation(result);
  };

  const confirmCode = async () => {
    if (!confirmation) return;
    await confirmation.confirm(otp);
  };

  return (
    <main className="section py-16">
      <div className="max-w-xl mx-auto card">
        <h1 className="text-2xl font-semibold">Kirish</h1>
        <p className="text-sm text-neutral-400 mt-2">Telefon, Google yoki Apple orqali.</p>

        {!firebaseReady ? (
          <div className="mt-6 text-sm text-red-300">
            Firebase konfiguratsiyasi yo‘q. apps/web/.env.local faylini to‘ldiring.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
          <input
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
            placeholder="+998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="button w-full" onClick={handlePhone}>SMS yuborish</button>

          <input
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
            placeholder="SMS kod"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="button-outline w-full" onClick={confirmCode}>Tasdiqlash</button>

          <div className="grid md:grid-cols-2 gap-3">
            <button className="button-outline" onClick={() => auth && googleProvider && signInWithPopup(auth, googleProvider)}>Google</button>
            <button className="button-outline" onClick={() => auth && appleProvider && signInWithPopup(auth, appleProvider)}>Apple</button>
          </div>
        </div>
        )}
        <div id="recaptcha-container" />
      </div>
    </main>
  );
}
