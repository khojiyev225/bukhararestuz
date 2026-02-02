import Link from 'next/link';

export default function Hero() {
  return (
    <section className="section py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-brand-500 font-semibold">BUKHARAREST.UZ</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
          O'zbek milliy taomlari, bron va yetkazib berish tizimi
        </h1>
        <p className="text-neutral-300 mt-4">
          Zamonaviy dizayn, qulay buyurtma, real vaqt boshqaruv paneli va
          mijozlar uchun mukammal tajriba.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/menu" className="button">Menyuni ko'rish</Link>
          <Link href="/booking" className="button-outline">Stol bron qilish</Link>
        </div>
      </div>
      <div className="card">
        <div className="h-64 rounded-xl bg-gradient-to-br from-brand-500/20 via-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center">
          <span className="text-neutral-400">Rasm uchun joy (admin panel orqali yangilanadi)</span>
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
