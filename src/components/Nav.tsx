import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { buttonClass } from '@/components/ui';

const links = [
  { to: '/learning-and-development', label: 'Learning & Development' },
  { to: '/consulting', label: 'Consulting' },
  { to: '/about', label: 'About' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent bg-paper'
      }`}
    >
      <div className="u-wrap flex h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[0.925rem] transition-colors ${
                  isActive ? 'bg-sand text-ink' : 'text-slate hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className={buttonClass({ variant: 'dark', size: 'sm' })}>
            Book a consultation
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="u-wrap flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-[0.95rem] ${isActive ? 'bg-sand text-ink' : 'text-slate'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className={`${buttonClass({ variant: 'dark' })} mt-2`}>
              Book a consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
