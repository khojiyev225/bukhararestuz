import { Brain, CalendarCheck, ClipboardList, Truck } from 'lucide-react';

const features = [
  {
    title: 'AI Analytics',
    description: 'Admin panel orqali statistik tahlil va trendlarni ko‘rish.',
    icon: Brain
  },
  {
    title: 'Bron boshqaruvi',
    description: 'Stol bronlari real vaqt rejimida nazorat qilinadi.',
    icon: CalendarCheck
  },
  {
    title: 'Buyurtma oqimi',
    description: 'Manager va admin uchun buyurtmalar nazorati.',
    icon: ClipboardList
  },
  {
    title: 'Yetkazib berish',
    description: 'Delivery panel orqali buyurtmalarni boshqarish.',
    icon: Truck
  }
];

export default function FeatureGrid() {
  return (
    <section className="section grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <div key={feature.title} className="card">
          <feature.icon className="text-brand-500" />
          <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
          <p className="text-sm text-neutral-300 mt-2">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
