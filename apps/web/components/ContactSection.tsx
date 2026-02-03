import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="section grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-3">
        <h2 className="section-title">Bog‘lanish</h2>
        <p className="section-subtitle">
          Stol band qilish, tadbirlar yoki yetkazib berish bo‘yicha tezkor aloqa.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/reservation" className="button">Bron qilish</Link>
          <Link href="/order" className="button-outline">Yetkazib berish</Link>
        </div>
      </div>
      <div className="card">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#7a6b3b]">Telefon</p>
            <p className="text-lg font-semibold text-[#173a2a]">+998 90 000 00 00</p>
          </div>
          <div>
            <p className="text-xs text-[#7a6b3b]">Manzil</p>
            <p className="text-lg font-semibold text-[#173a2a]">Buxoro, Markaziy ko‘cha</p>
          </div>
          <div>
            <p className="text-xs text-[#7a6b3b]">Ish vaqti</p>
            <p className="text-lg font-semibold text-[#173a2a]">09:00–23:00</p>
          </div>
          <div>
            <p className="text-xs text-[#7a6b3b]">Telegram</p>
            <p className="text-lg font-semibold text-[#173a2a]">@bukhara_rest</p>
          </div>
        </div>
      </div>
    </section>
  );
}
