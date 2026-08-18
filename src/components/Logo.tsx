import { Link } from 'react-router';

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <Link to="/" aria-label="Sustain Terra Green Ventures — home">
      <img src="/images/logo.png" alt="Sustain Terra Green Ventures" className="h-12 w-auto" />
    </Link>
  );
}
