"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/api";

export default function ReservationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ name, phone, date, guests, notes })
      });
      setMessage("Bron yuborildi!");
    } catch (error) {
      setMessage("Bron yuborilmadi.");
    }
  };

  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">BRON</span>
        <h1 className="text-3xl font-semibold mt-4 text-[#173a2a]">Bron qilish</h1>
        <p className="text-[#6b5a2b] mt-2">Sana va mehmonlar sonini tanlang.</p>
      </div>
      <div className="card max-w-3xl mx-auto space-y-4">
        <input className="input" placeholder="Ism" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="input" type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
        <textarea className="textarea" placeholder="Izoh" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button onClick={submit} className="button w-full">Bron yuborish</button>
        {message && <p className="text-sm text-[#8b7b45]">{message}</p>}
      </div>
    </main>
  );
}
