'use client';

import { useState } from 'react';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth, createRecaptcha, firebaseReady } from '../../lib/firebase';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);
  const [message, setMessage] = useState('');

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = createRecaptcha('recaptcha-register');
    }
    return (window as any).recaptchaVerifier;
  };

  const handlePhone = async () => {
    if (!auth) return;
    const appVerifier = setupRecaptcha();
    if (!appVerifier) return;
    const result = await signInWithPhoneNumber(auth, phone, appVerifier);
    setConfirmation(result);
    setMessage('SMS yuborildi. Kodni kiriting.');
  };

  const confirmCode = async () => {
    if (!confirmation) return;
    await confirmation.confirm(otp);
    setMessage('Muvaffaqiyatli ro‘yxatdan o‘tdingiz.');
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">RO‘YXATDAN O‘TISH</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Ro‘yxatdan o‘tish</h1>
        <p className="text-[#6b5a2b] mt-2">Telefon orqali tezkor ro‘yxatdan o‘tish.</p>
      </div>
      <div className="max-w-xl mx-auto card">
        <h1 className="text-2xl font-semibold">Ro'yxatdan o'tish</h1>
        {!firebaseReady ? (
          <div className="mt-6 text-sm text-red-500">Firebase konfiguratsiyasi yo‘q.</div>
        ) : (
          <div className="mt-6 space-y-4">
            <input
              className="input"
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="button w-full" onClick={handlePhone}>SMS yuborish</button>
            <input
              className="input"
              placeholder="SMS kod"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="button-outline w-full" onClick={confirmCode}>Tasdiqlash</button>
            {message && <p className="text-sm text-[#8b7b45]">{message}</p>}
          </div>
        )}
        <div id="recaptcha-register" />
      </div>
    </main>
  );
}
