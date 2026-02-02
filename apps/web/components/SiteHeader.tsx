import Link from 'next/link';
import { ChefHat, Utensils, CalendarDays, ShoppingBag, User } from 'lucide-react';

const nav = [
  { href: '/', label: 'Bosh sahifa', icon: ChefHat },
  { href: '/menu', label: 'Menyu', icon: Utensils },
  { href: '/booking', label: 'Stol bron', icon: CalendarDays },
  { href: '/delivery', label: 'Yetkazib berish', icon: ShoppingBag },
  { href: '/login', label: 'Kirish', icon: User }
];

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
      <div className="section flex items-center justify-between py-5">
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          BUKHARAREST.UZ
          <span className="block text-xs text-neutral-400 tracking-[0.3em] mt-1">BUXORO RUHI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2 text-neutral-300 hover:text-white">
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="button-outline">Kirish</Link>
          <Link href="/register" className="button">Ro'yxatdan o'tish</Link>
        </div>
      </div>
    </header>
  );
}
