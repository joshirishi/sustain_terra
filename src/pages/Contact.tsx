import { Calendar, Linkedin, Mail } from 'lucide-react';
import { ConsultationForm } from '@/components/ConsultationForm';
import { Eyebrow } from '@/components/ui';
import { CALENDLY_URL } from '@/lib/leads';
import { usePageMeta } from '@/lib/meta';

const channels = [
  {
    icon: Calendar,
    label: 'Book a slot directly',
    value: 'Pick a time that suits you',
    href: CALENDLY_URL,
  },
  { icon: Mail, label: 'Email', value: 'hello@sustainterra.com', href: 'mailto:hello@sustainterra.com' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Sustain Terra Green Ventures LLP',
    href: 'https://www.linkedin.com/company/sustain-terra-green-ventures-llp/',
  },
];

export function Contact() {
  usePageMeta('Contact', 'Tell us where you are today — a reporting deadline, a data gap, or a team that needs upskilling. We reply to every enquiry within two working days.');
  return (
    <section className="u-grid-lines bg-ink text-paper">
      <div className="u-wrap grid gap-12 py-20 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow tone="light">Contact</Eyebrow>
          <h1 className="u-display mt-6 text-[2.4rem] leading-[1.05] sm:text-[3rem]">
            Start with a conversation.
          </h1>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-sand/75">
            Tell us where you are today — a reporting deadline, a data gap, a team that needs upskilling. We will
            tell you honestly what it takes, and whether we are the right people to help.
          </p>

          <ul className="mt-12 space-y-4">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-card border border-lichen/15 bg-white/[0.03] px-6 py-5 transition-colors hover:border-lichen/40 hover:bg-white/[0.06]"
                >
                  <c.icon className="shrink-0 text-lichen" size={21} strokeWidth={1.6} />
                  <span>
                    <span className="u-eyebrow block text-lichen/70">{c.label}</span>
                    <span className="mt-1 block text-[0.98rem] text-paper">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card bg-paper p-8 md:p-10">
          <h2 className="u-display text-[1.65rem] text-ink">Send us a note</h2>
          <p className="mt-2 mb-7 text-sm text-slate">We reply to every enquiry within two working days.</p>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
