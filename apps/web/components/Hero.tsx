import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section py-16 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <span className="badge">BUKHARAREST.UZ</span>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#173a2a]">
          Buxoro taomlari, mayin muhit va zamonaviy servis
        </h1>
        <p className="text-[#6b5a2b] text-lg">
          Milliy taomlar, tezkor yetkazib berish, oldindan bron qilish va
          tadbirlar uchun puxta xizmat.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/reservation" className="button">Stol band qilish</Link>
          <Link href="/menu" className="button-outline">Menyuni ko‘rish</Link>
          <Link href="/order" className="button-outline">Yetkazib berish</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-xs text-[#7a6b3b]">Xizmat</p>
            <p className="text-lg font-semibold">Premium servis</p>
          </div>
          <div className="card">
            <p className="text-xs text-[#7a6b3b]">Yetkazib berish</p>
            <p className="text-lg font-semibold">15–30 min</p>
          </div>
          <div className="card">
            <p className="text-xs text-[#7a6b3b]">Bron</p>
            <p className="text-lg font-semibold">Online</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="h-72 rounded-2xl pattern-adras border border-[#d8c08a] flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <p className="text-sm text-[#6b5a2b]">Buxoro ruhi</p>
            <p className="text-3xl font-semibold text-[#173a2a]">BUKHARA REST</p>
            <p className="text-xs text-[#7a6b3b] mt-2">Milliy ta’m va zamonaviy xizmat</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
            <p className="text-xs text-[#7a6b3b]">Maxsus taom</p>
            <p className="text-lg font-semibold">Buxoro palovi</p>
          </div>
          <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
            <p className="text-xs text-[#7a6b3b]">Ish vaqti</p>
            <p className="text-lg font-semibold">09:00–23:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
