import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-brand-500 font-semibold">BUKHARAREST.UZ</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Buxoro taomlari, mayin muhit va zamonaviy servis
          </h1>
        <p className="text-neutral-300 mt-4">
            Milliy taomlar, tezkor yetkazib berish, oldindan bron qilish va tadbirlar uchun puxta xizmat.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/booking" className="button">Stol band qilish</Link>
            <Link href="/menu" className="button-outline">Menyuni ko‘rish</Link>
        </div>
      </div>
      <div className="card">
        <div className="h-64 rounded-xl bg-gradient-to-br from-brand-500/20 via-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 240 240"
            className="h-56 w-56 text-brand-500/60"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M114 18h12l4 10h18v10h-10v20h10v10h-12v16h8v10h-8v18h8v10h-8v24h8v10h-8v20h18v10h-50v-10h18v-20h-8v-10h8v-24h-8v-10h8v-18h-8v-10h8V68h-12V58h10V38h-10V28h18l4-10z"
            />
            <rect x="90" y="208" width="60" height="10" fill="currentColor" />
          </svg>
          <span className="absolute bottom-4 text-xs text-neutral-400">Minorai Kalon silueti</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-800 p-4">
            <p className="text-sm text-neutral-400">Yetkazib berish</p>
            <p className="text-2xl font-semibold">15-30 min</p>
          </div>
          <div className="rounded-xl border border-neutral-800 p-4">
            <p className="text-sm text-neutral-400">Bronlar</p>
            <p className="text-2xl font-semibold">Online</p>
          </div>
        </div>
      </div>
    </section>
  );
}
