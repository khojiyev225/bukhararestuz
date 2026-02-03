export default function SignatureSection() {
  return (
    <section className="section grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <span className="badge">IMZO TA’MLAR</span>
        <h2 className="section-title">Milliy taomlar va nafis taqdim</h2>
        <p className="section-subtitle">
          Buxoro oshxonasining saralangan taomlari, oshpazimizning maxsus
          retseptlari va zamonaviy servis.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Taomlar', value: '80+' },
            { label: 'Milliy ichimlik', value: '12+' },
            { label: 'Banket menyu', value: '6+' }
          ].map((item) => (
            <div key={item.label} className="stat-card">
              <p className="text-xs text-[#7a6b3b]">{item.label}</p>
              <p className="text-2xl font-semibold text-[#173a2a] mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#173a2a]">Oshpaz tavsiyasi</h3>
          <p className="text-sm text-[#6b5a2b]">
            Buxoro palovi, tandir go‘sht va somsa — mehmonlarimizning eng ko‘p tanlaydigan taomlari.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
              <p className="text-xs text-[#7a6b3b]">Asosiy taom</p>
              <p className="text-sm font-semibold text-[#173a2a]">Buxoro palovi</p>
            </div>
            <div className="rounded-xl border border-[#e2cf9b] bg-white/70 p-4">
              <p className="text-xs text-[#7a6b3b]">Shirinlik</p>
              <p className="text-sm font-semibold text-[#173a2a]">Choy va halva</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
