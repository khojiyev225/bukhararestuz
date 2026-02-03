const features = [
  {
    title: 'Milliy taomlar',
    description:
      'Buxoro oshxonasi an’analari va zamonaviy taqdimot uyg‘unligi.',
  },
  {
    title: 'Premium servis',
    description: 'Mehmonlarga alohida e’tibor va nafis xizmat madaniyati.',
  },
  {
    title: 'Onlayn bron',
    description: 'Stolni oldindan band qiling, tasdiq va eslatmalar oling.',
  },
  {
    title: 'Banket va tadbirlar',
    description: 'Bayramlar va marosimlar uchun maxsus zal va menyu.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="section space-y-8">
      <div>
        <h2 className="section-title">Nega bizni tanlashadi</h2>
        <p className="section-subtitle">
          Milliy ruh, tezkor servis va boshqaruvning soddaligi.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="card">
            <p className="text-xs text-[#7a6b3b]">Xizmat</p>
            <h3 className="text-lg font-semibold text-[#173a2a] mt-2">{feature.title}</h3>
            <p className="text-sm text-[#6b5a2b] mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
