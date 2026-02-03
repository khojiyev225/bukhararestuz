import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="border-b border-[#20252e] bg-[#12161c]/90 backdrop-blur">
      <div className="section flex items-center justify-between py-5">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-white">
          BUKHARAREST.UZ
          <span className="block text-xs text-[#9aa0aa] tracking-[0.3em] mt-1">BUXORO RUHI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="hover:text-white text-[#9aa0aa]" href="/">Bosh sahifa</Link>
          <Link className="hover:text-white text-[#9aa0aa]" href="/menu">Menyu</Link>
          <Link className="hover:text-white text-[#9aa0aa]" href="/reservation">Stol bron</Link>
          <Link className="hover:text-white text-[#9aa0aa]" href="/order">Yetkazib berish</Link>
          <Link className="hover:text-white text-[#9aa0aa]" href="/profile">Profil</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="button-outline">Kirish</Link>
          <Link href="/register" className="button">Ro'yxatdan o'tish</Link>
        </div>
      </div>
    </header>
  );
}
