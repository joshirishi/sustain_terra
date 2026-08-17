import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button, Field, inputClass } from '@/components/ui';
import { submitConsultation } from '@/lib/leads';

const interests = [
  { value: 'consulting', label: 'Consulting engagement' },
  { value: 'training', label: 'Training for my team' },
  { value: 'reporting', label: 'ESG reporting / disclosure' },
  { value: 'general', label: 'Something else' },
];

export function ConsultationForm({ defaultInterest = 'consulting' }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    const data = new FormData(e.currentTarget);
    const res = await submitConsultation({
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      organisation: String(data.get('organisation') || '').trim() || undefined,
      phone: String(data.get('phone') || '').trim() || undefined,
      interest: String(data.get('interest') || defaultInterest),
      message: String(data.get('message') || '').trim() || undefined,
    });

    if (res.ok) {
      setStatus('done');
    } else {
      setStatus('idle');
      setError(res.error);
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-card border border-moss/30 bg-moss/5 p-8 text-center">
        <CheckCircle2 className="mx-auto text-moss" size={34} />
        <h3 className="u-display mt-4 text-2xl text-ink">Request received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
          One of our team will be in touch within two working days. If it is urgent, book a slot directly on the
          calendar above.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input name="name" required minLength={2} maxLength={120} className={inputClass} placeholder="Your full name" />
        </Field>
        <Field label="Work email" required>
          <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organisation">
          <input name="organisation" maxLength={160} className={inputClass} placeholder="Company name" />
        </Field>
        <Field label="Phone">
          <input name="phone" maxLength={32} className={inputClass} placeholder="Optional" />
        </Field>
      </div>

      <Field label="What do you need help with?">
        <select name="interest" defaultValue={defaultInterest} className={inputClass}>
          {interests.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Tell us a little more" hint="Where you are today, and what a good outcome looks like.">
        <textarea name="message" rows={4} maxLength={2000} className={`${inputClass} resize-y`} placeholder="Optional, but it helps us prepare." />
      </Field>

      {error && (
        <p role="alert" className="rounded-xl border border-clay/30 bg-clay/5 px-4 py-3 text-sm text-clay-dark">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full">
        {status === 'sending' ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending…
          </>
        ) : (
          'Request a consultation'
        )}
      </Button>
      <p className="text-center text-xs text-slate">
        We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}
