import { Link } from 'react-router';
import type { ComponentProps, ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-clay text-white hover:bg-clay-dark hover:-translate-y-0.5 shadow-sm',
  dark: 'bg-ink text-paper hover:bg-bark hover:-translate-y-0.5',
  light: 'bg-paper text-ink hover:bg-white hover:-translate-y-0.5',
  outline: 'border border-line text-ink hover:border-ink hover:bg-sand/50',
  ghostDark: 'border border-lichen/30 text-paper hover:border-lichen hover:bg-lichen/10',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
} as const;

type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export const buttonClass = ({ variant = 'primary', size = 'md' }: ButtonStyle = {}) =>
  `${base} ${variants[variant]} ${sizes[size]}`;

export function Button({
  variant,
  size,
  className = '',
  ...props
}: ComponentProps<'button'> & ButtonStyle) {
  return <button className={`${buttonClass({ variant, size })} ${className}`} {...props} />;
}

export function ButtonLink({
  to,
  href,
  variant,
  size,
  className = '',
  children,
  ...props
}: { to?: string; href?: string; children: ReactNode; className?: string } & ButtonStyle &
  Omit<ComponentProps<'a'>, 'href'>) {
  const cls = `${buttonClass({ variant, size })} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} {...props}>
      {children}
    </a>
  );
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`u-eyebrow flex items-center gap-3 ${tone === 'light' ? 'text-lichen' : 'text-moss'}`}>
      <span className={`h-px w-8 ${tone === 'light' ? 'bg-lichen/50' : 'bg-moss/40'}`} />
      {children}
    </p>
  );
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="u-wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  tone = 'dark',
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`u-display mt-5 text-[2.1rem] leading-[1.08] md:text-[2.9rem] ${
          tone === 'light' ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-[1.05rem] leading-relaxed ${tone === 'light' ? 'text-sand/75' : 'text-slate'}`}>
          {body}
        </p>
      )}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-clay">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate">{hint}</span>}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate/50 transition-colors focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20';
