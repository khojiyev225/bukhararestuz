import Link from 'next/link';
import { ChefHat, Utensils, CalendarDays, ShoppingBag, User, UserCircle } from 'lucide-react';

const nav = [
  { href: '/', label: 'Bosh sahifa', icon: ChefHat },
  { href: '/menu', label: 'Menyu', icon: Utensils },
  { href: '/reservation', label: 'Stol bron', icon: CalendarDays },
  { href: '/order', label: 'Yetkazib berish', icon: ShoppingBag },
  { href: '/profile', label: 'Profil', icon: UserCircle },
  { href: '/login', label: 'Kirish', icon: User }
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[#e2cf9b] bg-[#f7f1e1]/90 backdrop-blur">
      <div className="section flex items-center justify-between py-5">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-[#173a2a]">
          BUKHARAREST.UZ
          <span className="block text-xs text-[#7a6b3b] tracking-[0.3em] mt-1">BUXORO RUHI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2 text-[#5b4b22] hover:text-[#173a2a]">
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
