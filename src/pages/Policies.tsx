import { useParams } from 'react-router';
import { Reveal } from '@/components/Reveal';
import { AccordionItem } from '@/components/Accordion';
import { Eyebrow, Section, SectionHead } from '@/components/ui';
import { useContent } from '@/lib/content';
import { ClosingCta } from '@/pages/Home';
import type { Policy, PolicyFaq } from '@/lib/types';

export function Policies() {
  const { slug } = useParams<{ slug: string }>();
  const { policies, policy_faqs } = useContent();

  const policy = policies.find((p: Policy) => p.slug === slug);
  if (!policy) return <div className="py-20 text-center">Policy not found</div>;

  const faqs = policy_faqs.filter((f: PolicyFaq) => f.policy_slug === slug);

  return (
    <>
      <section className="u-grid-lines bg-ink text-paper">
        <div className="u-wrap py-20 md:py-24">
          <Eyebrow tone="light">Policy</Eyebrow>
          <h1 className="u-display mt-6 text-[2.5rem] leading-[1.04] sm:text-[3rem]">{policy.title}</h1>
          {policy.effective_date && (
            <p className="mt-4 text-sand/75">Effective: {new Date(policy.effective_date).toLocaleDateString('en-IN', {year:'numeric', month:'long', day:'numeric'})}</p>
          )}
          {policy.scope && (
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-sand/75">{policy.scope}</p>
          )}
        </div>
      </section>

      <Section className="bg-paper">
        <div className="prose prose-sm max-w-3xl mx-auto text-slate">
          <div className="whitespace-pre-wrap text-[0.95rem] leading-relaxed mb-12">{policy.body_md}</div>

          {faqs.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-16 border-t border-line pt-12">
                <SectionHead eyebrow="FAQ" title="Frequently Asked Questions" />
                <div className="mt-8 space-y-0">
                  {faqs.map((faq: PolicyFaq, i: number) => (
                    <Reveal key={faq.id} delay={i * 0.05}>
                      <AccordionItem title={faq.question}>{faq.answer}</AccordionItem>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
