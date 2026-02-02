'use client';

export default function ManagerDashboard() {
  return (
    <main className="section py-16 space-y-8">
      <div className="card">
        <h1 className="text-3xl font-semibold">Manager panel</h1>
        <p className="text-neutral-400 mt-2">Buyurtmalar va bronlar boshqaruvi.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {['Buyurtmalar', 'Bronlar', 'Menyu holati'].map((title) => (
          <div key={title} className="card">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-400 mt-2">Tezkor ko'rinish</p>
          </div>
        ))}
      </div>
    </main>
  );
}
