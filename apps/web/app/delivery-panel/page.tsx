'use client';

export default function DeliveryPanel() {
  return (
    <main className="section py-16 space-y-8">
      <div className="page-hero">
        <span className="badge">DELIVERY</span>
        <h1 className="text-3xl font-semibold mt-4">Yetkazib beruvchi panel</h1>
        <p className="text-neutral-400 mt-2">Yetkazib berish buyurtmalari va statuslarni boshqarish.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {['Yangi buyurtmalar', 'Jarayonda', 'Yakunlangan'].map((title) => (
          <div key={title} className="card">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-400 mt-2">Holat bo'yicha</p>
          </div>
        ))}
      </div>
    </main>
  );
}
