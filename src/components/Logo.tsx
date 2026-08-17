import { Link } from 'react-router';

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const fg = tone === 'light' ? 'text-paper' : 'text-ink';
  const accent = tone === 'light' ? '#a9c77f' : '#14603f';
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${fg}`} aria-label="Sustain Terra Green Ventures — home">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <path
          d="M16 4c5.6 3.6 8.4 7.9 8.4 12.6A8.4 8.4 0 0 1 16 25a8.4 8.4 0 0 1-8.4-8.4C7.6 11.9 10.4 7.6 16 4z"
          fill="none"
          stroke={accent}
          strokeWidth="1.8"
        />
        <path d="M16 27V12" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 17.5l4-3.4M16 21l-3.6-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-medium tracking-tight">Sustain Terra</span>
        <span className="u-eyebrow block text-[0.6rem] opacity-60">Green Ventures</span>
      </span>
    </Link>
  );
}
