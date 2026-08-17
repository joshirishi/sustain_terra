import { Link } from 'react-router';
import { Linkedin, Mail, Calendar } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { CALENDLY_URL } from '@/lib/leads';

const columns = [
  {
    title: 'Services',
    links: [
      { to: '/consulting', label: 'Consulting' },
      { to: '/learning-and-development', label: 'Learning & Development' },
      { to: '/consulting#expertise', label: 'Our expertise' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/about#team', label: 'Leadership team' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/policies/privacy-policy', label: 'Privacy policy' },
      { to: '/policies/refund-policy', label: 'Refund policy' },
      { to: '/policies/cancellation-rescheduling-policy', label: 'Cancellation & rescheduling' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="u-grid-lines bg-ink text-sand/70">
      <div className="u-wrap py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Science-led sustainability consulting and training — global standards, local context, work that
              stands up to an audit.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="u-eyebrow text-lichen">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="u-eyebrow text-lichen">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:hello@sustainterra.com" className="flex items-center gap-2.5 transition-colors hover:text-paper">
                  <Mail size={15} className="shrink-0 text-moss" /> hello@sustainterra.com
                </a>
              </li>
              <li>
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-paper">
                  <Calendar size={15} className="shrink-0 text-moss" /> Schedule a call
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/sustain-terra-green-ventures-llp/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-paper"
                >
                  <Linkedin size={15} className="shrink-0 text-moss" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-lichen/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sustain Terra Green Ventures LLP. All rights reserved.</p>
          <p className="text-sand/45">Founded by IIT Kanpur alumni.</p>
        </div>
      </div>
    </footer>
  );
}
