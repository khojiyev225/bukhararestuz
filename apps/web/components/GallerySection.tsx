const items = [
  { title: 'Adras kayfiyati', detail: 'Milliy naqshlar ilhomi' },
  { title: 'Osh markazi', detail: 'Buxorocha palov' },
  { title: 'Choy va shirinlik', detail: 'Iliq uchrashuv' }
];

export default function GallerySection() {
  return (
    <section className="section space-y-6">
      <div>
        <h2 className="section-title">Milliy ko‘rinish</h2>
        <p className="section-subtitle">
          Adras va naqshlardan ilhomlangan interyer va taom taqdimoti.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="card">
            <div className="h-40 rounded-xl pattern-adras border border-neutral-800" />
            <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
            <p className="text-sm text-neutral-400 mt-2">{item.detail}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-neutral-500">
        Rasmlar o‘rniga vaqtincha bezak fon ishlatildi — real suratlar bilan almashtiring.
      </p>
    </section>
  );
}
