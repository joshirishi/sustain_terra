import { useState } from 'react';
import { ArrowRight, BadgeCheck, BookOpen, ChevronDown, Quote, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { RegistrationDialog } from '@/components/RegistrationDialog';
import { MultiCourseEnrollmentForm } from '@/components/MultiCourseEnrollmentForm';
import { BrochureForm } from '@/components/BrochureForm';
import { Button, ButtonLink, Eyebrow, Section, SectionHead } from '@/components/ui';
import { ClosingCta } from '@/pages/Home';
import { useContent } from '@/lib/content';
import type { Program } from '@/lib/types';
import { usePageMeta } from '@/lib/meta';

const pillars = [
  {
    icon: Users,
    title: 'Industry expert trainers',
    body: 'Sessions are led by practitioners who have built the inventories and filed the disclosures themselves.',
  },
  {
    icon: BookOpen,
    title: 'Globally aligned, locally grounded',
    body: 'Curriculum mapped to international frameworks and to the regulations your business actually reports under.',
  },
  {
    icon: BadgeCheck,
    title: 'Project-based learning',
    body: 'Every programme ends in applied work on a real problem, not a multiple-choice quiz.',
  },
];

const approach = [
  'Real-world case studies drawn from local business context',
  'Mentorship from industry practitioners with decades of experience',
  'Access to working sustainability templates and reporting formats',
  'Industry-recognised certification on completion',
];

export function LearningDevelopment() {
  const { programs, testimonials } = useContent();
  usePageMeta('Learning & Development', 'Six practitioner-led sustainability training programmes: essentials, GHG accounting, materiality, BRSR/GRI/CDP/TCFD reporting, climate risk, and decarbonization roadmaps.');
  const [active, setActive] = useState<Program | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showEnrollment, setShowEnrollment] = useState(false);

  return (
    <>
      <section
        className="u-grid-lines relative overflow-hidden text-paper"
        style={{
          backgroundImage: 'url(/images/image-9.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/80 to-ink/70" aria-hidden="true" />
        <div className="u-wrap relative grid gap-12 py-20 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow tone="light">Learning &amp; Development</Eyebrow>
            <h1 className="u-display mt-6 text-[2.5rem] leading-[1.04] sm:text-[3.2rem]">
              Close the green skills gap
              <br />
              inside your own team.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-sand/75">
              Only 29% of professionals feel confident navigating ESG compliance. Our programmes are built to move
              your people from that number to competent, evidence-backed practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => setShowEnrollment(true)} variant="primary" size="lg">
                Browse and enroll <ArrowRight size={18} />
              </Button>
              <ButtonLink href="#programmes" variant="dark" size="lg">
                See the programmes
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-card border border-lichen/15 bg-white/[0.04] p-7">
            <p className="u-eyebrow text-lichen">Programme brochure</p>
            <p className="mt-3 mb-5 text-sm leading-relaxed text-sand/70">
              Full curriculum, formats, and indicative dates for all six programmes.
            </p>
            <BrochureForm brochure="learning-and-development" tone="light" />
          </div>
        </div>
      </section>

      <Section className="bg-paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHead
            eyebrow="The gap"
            title="Bridging the sustainability skills gap."
            body="Sustainability roles are being created faster than people can be trained for them. Our Learning & Development programmes are designed to close the distance between the skills organisations now need and what the market currently supplies."
          />
          <div className="grid gap-8 self-center">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <p.icon className="mt-0.5 shrink-0 text-moss" size={24} strokeWidth={1.6} />
                  <div>
                    <h3 className="font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Programmes ---------- */}
      <Section id="programmes" className="bg-sand/40">
        <SectionHead
          eyebrow="Featured training programmes"
          title="Six programmes, foundation to advanced."
          body="Run them standalone, or sequence them into a capability pathway for a whole sustainability function."
        />

        <div className="mt-14 space-y-3">
          {programs.map((p, i) => {
            const isOpen = expanded === p.id;
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)}>
                <article className="overflow-hidden rounded-card border border-line bg-paper transition-colors hover:border-moss/40">
                  <button
                    className="flex w-full items-start gap-6 p-7 text-left"
                    onClick={() => setExpanded(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="u-display hidden shrink-0 text-2xl text-moss/40 sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-3">
                        <h3 className="u-display text-[1.4rem] leading-tight text-ink">{p.title}</h3>
                        <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                          {p.level}
                        </span>
                        {p.duration && <span className="text-xs text-slate">{p.duration}</span>}
                      </span>
                      <span className="mt-2 block text-[0.95rem] leading-relaxed text-slate">{p.summary}</span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-slate transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-line bg-sand/25 px-7 py-7 sm:pl-[4.75rem]">
                      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
                        <div>
                          <p className="u-eyebrow text-moss">What we cover</p>
                          <ul className="mt-4 space-y-2.5">
                            {p.modules.map((m) => (
                              <li key={m} className="flex gap-3 text-[0.95rem] text-slate">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="u-eyebrow text-moss">Who it is for</p>
                          <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">{p.audience}</p>
                          <Button onClick={() => setActive(p)} className="mt-6 w-full sm:w-auto">
                            Register interest
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- Approach ---------- */}
      <Section className="u-grid-lines bg-ink">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            tone="light"
            eyebrow="Experiential learning"
            title="Theory is the first morning. The rest is practice."
            body="Our programmes go beyond conceptual knowledge, using project-based assignments built around real sustainability problems."
          />
          <ul className="grid content-center gap-5">
            {approach.map((a, i) => (
              <Reveal key={a} delay={i * 0.07}>
                <li className="flex items-start gap-4 border-b border-lichen/12 pb-5 text-sand/75">
                  <BadgeCheck className="mt-0.5 shrink-0 text-lichen" size={19} strokeWidth={1.7} />
                  <span className="text-[0.98rem] leading-relaxed">{a}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Testimonials ---------- */}
      <Section id="testimonials" className="bg-paper">
        <SectionHead
          eyebrow="What participants say"
          title="From people who sat through it."
          align="center"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-card border border-line bg-sand/25 p-8">
                <Quote className="text-moss/40" size={26} />
                <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  {t.title && <p className="mt-0.5 text-xs leading-relaxed text-slate">{t.title}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCta
        title="Ready to build sustainability capability?"
        body="Tell us the roles you need to upskill and the frameworks you report under. We will propose a programme sequence tailored to your organisation."
      />

      {active && <RegistrationDialog program={active} onClose={() => setActive(null)} />}
      {showEnrollment && <MultiCourseEnrollmentForm onClose={() => setShowEnrollment(false)} />}
    </>
  );
}
