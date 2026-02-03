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
            <p className="text-xs text-[#7a6b3b]">Taomlar</p>
            <p className="text-2xl font-semibold mt-2 text-[#173a2a]">Milliy & zamonaviy</p>
          </div>
          <div className="card">
            <p className="text-xs text-[#7a6b3b]">Xizmat</p>
            <p className="text-2xl font-semibold mt-2 text-[#173a2a]">Mehmondo‘st</p>
          </div>
        </div>
      </div>
      <div className="card pattern-adras">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#173a2a]">Buxoro ruhi</h3>
          <p className="text-sm text-[#6b5a2b]">
            Adras naqshlari ilhomidagi bezak, mayin yorug‘lik va iliq atmosfera.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
              <p className="text-xs text-[#7a6b3b]">Manzil</p>
              <p className="text-sm font-semibold text-[#173a2a]">Buxoro, Markaziy ko‘cha</p>
            </div>
            <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
              <p className="text-xs text-[#7a6b3b]">Ish vaqti</p>
              <p className="text-sm font-semibold text-[#173a2a]">09:00–23:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
