'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, signInWithPhoneNumber } from 'firebase/auth';
import { auth, googleProvider, firebaseReady, createRecaptcha } from '../../lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState<any>(null);
  const [message, setMessage] = useState('');

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = createRecaptcha('recaptcha-container');
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
    setMessage('Kirish muvaffaqiyatli. Yo‘naltirilmoqda...');
    router.push('/profile');
  };

  const handleGoogle = async () => {
    if (!auth || !googleProvider) return;
    await signInWithPopup(auth, googleProvider);
    setMessage('Kirish muvaffaqiyatli. Yo‘naltirilmoqda...');
    router.push('/profile');
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">HISOBGA KIRISH</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Kirish</h1>
        <p className="text-[#6b5a2b] mt-2">Telefon, Google yoki Apple orqali tezkor kirish.</p>
      </div>
      <div className="max-w-xl mx-auto card">
        <h1 className="text-2xl font-semibold">Kirish</h1>
        <p className="text-sm text-[#6b5a2b] mt-2">Telefon yoki Google orqali.</p>

        {!firebaseReady ? (
          <div className="mt-6 text-sm text-red-300">
            Firebase konfiguratsiyasi yo‘q. apps/web/.env.local faylini to‘ldiring.
          </div>
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

            <div className="grid md:grid-cols-2 gap-3">
              <button className="button-outline" onClick={handleGoogle}>Google</button>
            </div>
            {message ? <p className="text-sm text-[#8b7b45]">{message}</p> : null}
          </div>
        )}
        <div id="recaptcha-container" />
      </div>
    </main>
  );
}
