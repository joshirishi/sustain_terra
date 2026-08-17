import { Link } from 'react-router';
import {
  ArrowRight,
  BarChart3,
  CloudLightning,
  FileCheck2,
  Gauge,
  Network,
  Route,
  Scale,
  Target,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ButtonLink, Eyebrow, Section, SectionHead } from '@/components/ui';
import { ClosingCta } from '@/pages/Home';
import { useContent } from '@/lib/content';
import { CALENDLY_URL } from '@/lib/leads';
import { usePageMeta } from '@/lib/meta';

const icons: Record<string, typeof Gauge> = {
  gauge: Gauge,
  'cloud-lightning': CloudLightning,
  'file-check': FileCheck2,
  route: Route,
  scale: Scale,
};

const advantages = [
  {
    icon: Target,
    title: 'Grounded expertise',
    body: 'Decades of hands-on experience across industries — solutions built for real operating constraints, not just the slide.',
  },
  {
    icon: Network,
    title: 'Strategic network',
    body: 'Access to a global ecosystem of sustainability experts, technology providers, and industry specialists.',
  },
  {
    icon: BarChart3,
    title: 'Execution focus',
    body: 'Beyond strategy: clear roadmaps, KPIs, and accountability frameworks that keep progress measurable.',
  },
];

export function Consulting() {
  const { services } = useContent();
  usePageMeta('Consulting', 'Carbon accounting, climate risk, ESG reporting and compliance, and decarbonization strategy — delivered with roadmaps, KPIs, and accountability frameworks.');

  return (
    <>
      <section className="u-grid-lines bg-ink text-paper">
        <div className="u-wrap grid gap-12 py-20 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow tone="light">Consulting</Eyebrow>
            <h1 className="u-display mt-6 text-[2.5rem] leading-[1.04] sm:text-[3.2rem]">
              Measurement first.
              <br />
              Then strategy that moves.
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-sand/75">
              Grounded in real-world industry experience, we deliver actionable sustainability work through
              measurement, tracking, and strategic implementation — with global standards and local context.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={CALENDLY_URL} variant="primary" size="lg">
                Schedule a consultation <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#expertise" variant="ghostDark" size="lg">
                See our expertise
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Expertise ---------- */}
      <Section id="expertise" className="bg-paper">
        <SectionHead
          eyebrow="Our consulting expertise"
          title="Five practices, one through-line: evidence."
          body="Every engagement starts with data you can defend, and ends with a decision someone can actually act on."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Gauge;
            return (
              <Reveal key={s.id} delay={Math.min(i * 0.07, 0.28)}>
                <article className="flex h-full flex-col rounded-card border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:shadow-xl hover:shadow-ink/5">
                  <Icon className="text-moss" size={27} strokeWidth={1.5} />
                  <h3 className="u-display mt-6 text-[1.35rem] leading-tight text-ink">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{s.summary}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- Advantage ---------- */}
      <Section className="u-grid-lines bg-ink">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <SectionHead
            tone="light"
            eyebrow="The STGV advantage"
            title="Deep knowledge, and the discipline to land it."
            body="Our approach combines industry knowledge with practical execution capability, delivering sustainability outcomes you can point at."
          />
          <div className="grid gap-9 self-center">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <a.icon className="mt-1 shrink-0 text-lichen" size={23} strokeWidth={1.6} />
                  <div>
                    <h3 className="font-semibold text-paper">{a.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-sand/65">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Complementary L&D ---------- */}
      <Section className="bg-sand/40">
        <div className="grid gap-10 rounded-card border border-line bg-paper p-9 md:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Complementary service</Eyebrow>
            <h2 className="u-display mt-5 text-[1.9rem] leading-tight text-ink md:text-[2.3rem]">
              Consulting builds the answer. Training makes it stick.
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-slate">
              The strongest engagements pair delivery with capability transfer, so your team can run the process
              themselves next cycle instead of re-hiring for it.
            </p>
            <Link
              to="/learning-and-development"
              className="mt-7 inline-flex items-center gap-2 font-medium text-clay hover:underline"
            >
              Explore L&amp;D programmes <ArrowRight size={17} />
            </Link>
          </div>
          <ul className="space-y-3.5">
            {[
              'ESG fundamentals for all employees',
              'Technical training for sustainability teams',
              'Leadership workshops for executives',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3.5 rounded-xl bg-sand/50 px-5 py-4 text-[0.95rem] text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta
        title="Ready to transform your sustainability strategy?"
        body="Bring us your hardest constraint — a reporting deadline, a supplier data gap, a target you are not sure you can hit. We will tell you what it realistically takes."
      />
    </>
  );
}
