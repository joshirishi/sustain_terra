import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, GraduationCap, Compass, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { BrochureForm } from '@/components/BrochureForm';
import { ButtonLink, Eyebrow, Section, SectionHead } from '@/components/ui';
import { useContent } from '@/lib/content';
import { CALENDLY_URL } from '@/lib/leads';
import { usePageMeta } from '@/lib/meta';

const proofPoints = [
  { figure: '60+', label: 'years of combined experience across climate science, ESG, and climate finance' },
  { figure: 'PhD', label: 'and IIT Kanpur–trained leadership in green finance and low-carbon strategy' },
  { figure: '6', label: 'training programmes, from sustainability essentials to decarbonization roadmaps' },
];

export function Home() {
  const { stats, services, core_values, differentiators, testimonials } = useContent();
  usePageMeta('Sustainability that survives an audit', 'Science-led sustainability consulting and training. GHG accounting, climate risk, BRSR/GRI/CDP/TCFD reporting and decarbonization roadmaps — global standards, local context.');

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className="u-grid-lines relative overflow-hidden text-paper"
        style={{
          backgroundImage: 'url(/images/image-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/80 to-ink/70" aria-hidden="true" />
        <div className="u-wrap relative grid gap-14 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow tone="light">Sustainability consulting &amp; training</Eyebrow>
            <h1 className="u-display mt-6 text-[2.6rem] leading-[1.03] sm:text-[3.4rem] lg:text-[4.1rem]">
              Sustainability that
              <br />
              survives an audit.
            </h1>
            <p className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-sand/75">
              We make sustainability make sense — from training to practice, with global standards and local
              context. Ambition turned into credible, measurable business action.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/consulting" variant="primary" size="lg">
                Explore our services <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href={CALENDLY_URL} variant="ghostDark" size="lg">
                Book a consultation
              </ButtonLink>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-sand/45">
              <span className="u-eyebrow text-sand/35">Team experience from</span>
              {['J.P. Morgan', 'Nokia', 'HERE Technologies', 'General Carbon', 'IIT Kanpur'].map((org) => (
                <span key={org} className="rounded-full border border-lichen/15 px-3 py-1 text-sand/60">
                  {org}
                </span>
              ))}
            </div>
          </div>

          {/* Credibility card — replaces the stock-photo carousel */}
          <Reveal delay={0.15}>
            <div className="rounded-card border border-lichen/15 bg-white/[0.04] p-8 backdrop-blur-sm">
              <p className="u-eyebrow text-lichen">Why teams call us</p>
              <ul className="mt-7 space-y-7">
                {proofPoints.map((p) => (
                  <li key={p.figure} className="flex gap-5">
                    <span className="u-display w-16 shrink-0 text-3xl text-lichen">{p.figure}</span>
                    <span className="text-sm leading-relaxed text-sand/70">{p.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-lichen/15 pt-6">
                <p className="mb-3 text-sm text-sand/60">Get the capability overview:</p>
                <BrochureForm tone="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The case for acting ---------- */}
      <Section className="bg-paper">
        <SectionHead
          eyebrow="The context"
          title="The pressure is already here."
          body="Six numbers that explain why sustainability moved from the CSR report to the board agenda."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <article className="flex h-full flex-col bg-paper p-8 transition-colors hover:bg-sand/40">
                <h3 className="u-eyebrow text-moss">{s.headline}</h3>
                <p className="u-display mt-4 text-[2.6rem] leading-none text-forest">{s.figure}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{s.body}</p>
                {s.source && <p className="mt-5 text-xs text-slate/60">Source: {s.source}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Two ways to work with us ---------- */}
      <Section className="bg-sand/40">
        <SectionHead
          eyebrow="Our services"
          title="Two ways to work with us."
          body="Build the capability inside your team, or bring us in to do the work alongside you. Most clients do both."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            {
              to: '/learning-and-development',
              icon: GraduationCap,
              kicker: 'Learning & Development',
              title: 'Train the people who have to deliver it',
              body: 'Six practitioner-led programmes covering GHG accounting, materiality, BRSR/GRI/CDP/TCFD reporting, climate risk, and decarbonization — taught through project work on your own data.',
              cta: 'Explore programmes',
            },
            {
              to: '/consulting',
              icon: Compass,
              kicker: 'Consulting',
              title: 'Bring in a team that has done it before',
              body: 'Carbon inventories, climate risk assessment, disclosure, and decarbonization roadmaps — delivered with the roadmaps, KPIs, and accountability needed to actually move.',
              cta: 'Explore consulting',
            },
          ].map((card, i) => (
            <Reveal key={card.to} delay={i * 0.1}>
              <Link
                to={card.to}
                className="group flex h-full flex-col rounded-card border border-line bg-paper p-9 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:shadow-xl hover:shadow-ink/5"
              >
                <card.icon className="text-moss" size={30} strokeWidth={1.5} />
                <p className="u-eyebrow mt-6 text-moss">{card.kicker}</p>
                <h3 className="u-display mt-3 text-[1.75rem] leading-tight text-ink">{card.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-slate">{card.body}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-clay">
                  {card.cta}
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <span className="u-eyebrow mr-2 text-slate/70">Areas of expertise</span>
          {services.map((s) => (
            <Link
              key={s.id}
              to="/consulting#expertise"
              className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-slate transition-colors hover:border-moss/50 hover:text-ink"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------- Why us ---------- */}
      <Section className="u-grid-lines bg-ink">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            tone="light"
            eyebrow="Why Sustain Terra"
            title="Technical depth, translated into decisions."
            body="We combine scientific depth, business pragmatism, and transformational thinking to help organisations lead the sustainability transition — not just comply with it."
          />
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.08}>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="u-display shrink-0 text-sm text-lichen/60">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[1.05rem] font-semibold text-paper">{d.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-sand/60">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Values ---------- */}
      <Section className="bg-paper">
        <SectionHead
          eyebrow="Our core values"
          title="What we will not trade away."
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {core_values.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.07}>
              <article className="h-full rounded-card border border-line bg-sand/25 p-8">
                <h3 className="u-display text-[1.45rem] text-ink">{v.name}</h3>
                <p className="mt-1.5 text-sm font-medium italic text-moss">{v.tagline}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Testimonial ---------- */}
      {testimonials[0] && (
        <Section className="bg-sand/40">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto text-moss/40" size={38} />
            <blockquote className="u-display mt-7 text-[1.6rem] leading-snug text-ink md:text-[2rem]">
              “{testimonials[0].quote}”
            </blockquote>
            <p className="mt-7 text-sm font-medium text-ink">{testimonials[0].name}</p>
            {testimonials[0].title && <p className="text-sm text-slate">{testimonials[0].title}</p>}
            <Link
              to="/learning-and-development#testimonials"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-clay hover:underline"
            >
              Read more from participants <ArrowRight size={16} />
            </Link>
          </div>
        </Section>
      )}

      <ClosingCta />
    </>
  );
}

export function ClosingCta({
  title = 'Ready to start your sustainability journey?',
  body = 'Tell us where you are today. We will tell you honestly what it takes to get where you need to be — and whether we are the right people to help.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-forest text-paper">
      <div className="u-wrap grid gap-10 py-20 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="u-display text-[2.2rem] leading-tight md:text-[2.8rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-sand/80">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/contact" variant="light" size="lg">
              Contact us <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href={CALENDLY_URL} variant="ghostDark" size="lg">
              Schedule a consultation
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-card border border-lichen/20 bg-ink/25 p-8">
          <p className="u-eyebrow text-lichen">Capability overview</p>
          <p className="mt-3 mb-5 text-sm leading-relaxed text-sand/75">
            A short PDF covering our programmes, consulting services, and how engagements typically run.
          </p>
          <BrochureForm tone="light" />
        </div>
      </div>
    </section>
  );
}
