import { ArrowRight, Linkedin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ButtonLink, Eyebrow, Section, SectionHead } from '@/components/ui';
import { ClosingCta } from '@/pages/Home';
import { useContent } from '@/lib/content';
import { usePageMeta } from '@/lib/meta';

const approachPoints = [
  'Tailored strategies grounded in local business and regulatory realities',
  'Alignment with global reporting and assurance frameworks',
  'Training and consulting that bridge ambition with real-world execution',
  'Data-backed decisions delivering measurable climate and business impact',
];

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export function About() {
  const { core_values, team_members, differentiators } = useContent();
  usePageMeta('About us', 'Founded by IIT Kanpur alumni. Over 60 years of combined experience across climate science, ESG, sustainability consulting, and climate finance.');

  return (
    <>
      <section className="u-grid-lines bg-ink text-paper">
        <div className="u-wrap py-20 md:py-24">
          <Eyebrow tone="light">About us</Eyebrow>
          <h1 className="u-display mt-6 max-w-3xl text-[2.5rem] leading-[1.04] sm:text-[3.2rem]">
            Founded to cut through the noise.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-sand/75">
            We make sustainability make sense — from training to practice, with global standards and local context —
            turning ambition into credible, measurable business action.
          </p>
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <Section className="bg-paper">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="u-display mt-5 text-[2rem] leading-tight text-ink md:text-[2.5rem]">
              Born in the classrooms of IIT Kanpur.
            </h2>
          </div>
          <div className="space-y-6 self-center text-[1.05rem] leading-relaxed text-slate">
            <p>
              We saw a field crowded with courses and certifications — yet short on action. Too many professionals
              were handed jargon, and too many businesses were left to navigate the complexity alone.
            </p>
            <p>
              Sustain Terra Green Ventures was founded to cut through that noise: equipping people with the skills to
              act, and the confidence to do it well.
            </p>
            <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <p className="u-eyebrow text-moss">Our vision</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed">
                  Sustainability that makes sense — global standards, local context, credible action.
                </p>
              </div>
              <div>
                <p className="u-eyebrow text-moss">Our mission</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed">
                  Enabling the sustainability transition by giving organisations the knowledge, tools, and strategies
                  to create lasting environmental impact while driving business value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Values ---------- */}
      <Section className="bg-sand/40">
        <SectionHead eyebrow="Our core values" title="Four commitments we hold ourselves to." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {core_values.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.07}>
              <article className="h-full bg-paper p-8">
                <div className="flex items-baseline gap-3">
                  <span className="u-display text-sm text-moss/50">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="u-display text-[1.4rem] text-ink">{v.name}</h3>
                </div>
                <p className="mt-2 text-sm font-medium italic text-moss">{v.tagline}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Approach ---------- */}
      <Section className="u-grid-lines bg-ink">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            tone="light"
            eyebrow="Our approach"
            title="Local context, global alignment."
            body="Real impact comes from solutions that are context-aware, evidence-based, and built for action — not noise. We help professionals and businesses act with clarity, confidence, and credibility."
          />
          <ul className="grid content-center gap-5">
            {approachPoints.map((p, i) => (
              <Reveal key={p} delay={i * 0.07}>
                <li className="flex items-start gap-4 border-b border-lichen/12 pb-5">
                  <span className="u-display shrink-0 text-sm text-lichen/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[0.98rem] leading-relaxed text-sand/75">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Team ---------- */}
      <Section id="team" className="bg-paper">
        <SectionHead
          eyebrow="Leadership"
          title="The people doing the work."
          body="Over 60 years of combined experience across climate science, ESG, sustainability consulting, and climate finance."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {team_members.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.09}>
              <article className="flex h-full flex-col rounded-card border border-line bg-sand/25 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {m.photo_url ? (
                      <img
                        src={m.photo_url}
                        alt={m.name}
                        className="h-14 w-14 shrink-0 rounded-full object-cover bg-forest"
                      />
                    ) : (
                      <span className="u-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-lg text-paper">
                        {initials(m.name)}
                      </span>
                    )}
                    <div>
                      <h3 className="u-display text-[1.3rem] leading-tight text-ink">{m.name}</h3>
                      <p className="text-sm text-moss">{m.role}</p>
                    </div>
                  </div>
                  {m.linkedin_url && (
                    <a
                      href={m.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="shrink-0 text-moss hover:text-forest transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>

                <p className="mt-6 flex-1 text-[0.95rem] leading-relaxed text-slate">{m.bio}</p>

                {m.prior_orgs.length > 0 && (
                  <div className="mt-6">
                    <p className="u-eyebrow text-slate/60">Previously</p>
                    <p className="mt-2 text-sm text-ink">{m.prior_orgs.join(' · ')}</p>
                  </div>
                )}

                {m.credentials.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {m.credentials.map((c) => (
                      <span key={c} className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-medium text-forest">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Why us ---------- */}
      <Section className="bg-sand/40">
        <SectionHead eyebrow="Why choose us" title="What you get that you would not elsewhere." align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.07}>
              <article className="h-full rounded-card border border-line bg-paper p-8">
                <h3 className="text-[1.05rem] font-semibold text-ink">{d.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate">{d.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink to="/consulting" variant="outline" size="lg">
            Learn about our services <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
