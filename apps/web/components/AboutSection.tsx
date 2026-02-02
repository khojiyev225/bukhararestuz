export default function AboutSection() {
  return (
    <section className="section grid lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <h2 className="section-title">Biz haqimizda</h2>
        <p className="section-subtitle">
          BUKHARAREST.UZ — Buxoro an’analari, adras kayfiyati va zamonaviy
          xizmat uyg‘unligi. Har bir taom — o‘zbekona mehmondo‘stlik va
          hunarmandchilik ruhining davomidir.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card">
            <p className="text-sm text-neutral-400">Taomlar</p>
            <p className="text-2xl font-semibold mt-2">Milliy & zamonaviy</p>
          </div>
          <div className="card">
            <p className="text-sm text-neutral-400">Xizmat</p>
            <p className="text-2xl font-semibold mt-2">Mehmondo‘st</p>
          </div>
        </div>
      </div>
      <div className="card pattern-adras">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Buxoro ruhi</h3>
          <p className="text-sm text-neutral-300">
            Adras naqshlari ilhomidagi bezak, mayin yorug‘lik va iliq atmosfera.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-neutral-800 p-4">
              <p className="text-xs text-neutral-400">Manzil</p>
              <p className="text-sm font-semibold">Buxoro, Markaziy ko‘cha</p>
            </div>
            <div className="rounded-xl border border-neutral-800 p-4">
              <p className="text-xs text-neutral-400">Ish vaqti</p>
              <p className="text-sm font-semibold">09:00–23:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
