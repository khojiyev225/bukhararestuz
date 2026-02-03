"use client";

import { useState } from "react";

export default function ReservationPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(2);
  const [message, setMessage] = useState("");

  const submit = async () => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Iltimos, bron qilish uchun tizimga kiring.");
      return;
    }
    const res = await fetch(`${base}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date, time, people }),
    });
    if (!res.ok) {
      setMessage("Bron yuborilmadi.");
      return;
    }
    setMessage("Bron yuborildi!");
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0f2a1b]">Bron qilish</h1>
      <div className="mt-6 grid gap-4 rounded-2xl border border-[#d8c08a] bg-white p-6">
        <input className="rounded-lg border border-[#d8c08a] px-4 py-3" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="rounded-lg border border-[#d8c08a] px-4 py-3" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input className="rounded-lg border border-[#d8c08a] px-4 py-3" type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value))} />
        <button onClick={submit} className="rounded-full bg-[#173a2a] px-4 py-2 text-sm text-white">Bron yuborish</button>
        {message && <p className="text-sm text-[#6b5a2b]">{message}</p>}
      </div>
    </section>
  );
}
