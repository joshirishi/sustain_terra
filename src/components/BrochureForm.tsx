import { useState, type FormEvent } from 'react';
import { Check, Download, Loader2 } from 'lucide-react';
import { inputClass } from '@/components/ui';
import { submitBrochureRequest } from '@/lib/leads';

/**
 * Fields on dark (forest/ink) backgrounds need their own surface, border and placeholder
 * colours. Layering overrides on the light `inputClass` base left the placeholder and
 * border almost invisible, so the light tone gets a complete class set instead.
 */
const lightFieldClass =
  'w-full rounded-xl border border-lichen/60 bg-ink/30 px-4 py-3 text-[0.95rem] text-paper placeholder:text-sand/80 transition-colors focus:border-lichen focus:outline-none focus:ring-2 focus:ring-lichen/40';

/** Inline email capture. Sends the brochure by email rather than exposing a raw file link. */
export function BrochureForm({ brochure = 'overview', tone = 'dark' }: { brochure?: string; tone?: 'dark' | 'light' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const fieldClass = tone === 'light' ? lightFieldClass : inputClass;
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '').trim();
    const name = String(data.get('name') || 'there').trim();
    const res = await submitBrochureRequest(email, name, brochure);
    if (res.ok) setStatus('done');
    else {
      setStatus('idle');
      setError(res.error);
    }
  }

  if (status === 'done') {
    return (
      <p className={`flex items-center gap-2 text-sm ${tone === 'light' ? 'text-lichen' : 'text-moss'}`}>
        <Check size={16} /> On its way — check your inbox in a few minutes.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          className={fieldClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          aria-label="Work email for the brochure"
          className={fieldClass}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-medium transition-colors disabled:opacity-50 ${
            tone === 'light' ? 'bg-lichen text-ink hover:bg-white' : 'bg-ink text-paper hover:bg-bark'
          }`}
        >
          {status === 'sending' ? <Loader2 className="animate-spin" size={17} /> : <Download size={17} />}
          Send brochure
        </button>
      </div>
      {error && (
        <p role="alert" className={`mt-2 text-sm ${tone === 'light' ? 'text-clay' : 'text-clay-dark'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
