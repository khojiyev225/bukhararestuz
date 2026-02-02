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
          <Link href="/booking" className="button">Bron qilish</Link>
          <Link href="/delivery" className="button-outline">Yetkazib berish</Link>
        </div>
      </div>
      <div className="card">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400">Telefon</p>
            <p className="text-lg font-semibold">+998 90 000 00 00</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Manzil</p>
            <p className="text-lg font-semibold">Buxoro, Markaziy ko‘cha</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Ish vaqti</p>
            <p className="text-lg font-semibold">09:00–23:00</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Telegram</p>
            <p className="text-lg font-semibold">@bukhara_rest</p>
          </div>
        </div>
      </div>
    </section>
  );
}
