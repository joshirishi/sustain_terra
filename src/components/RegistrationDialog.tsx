import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { Button, Field, inputClass } from '@/components/ui';
import { submitRegistration } from '@/lib/leads';
import type { Program } from '@/lib/types';

export function RegistrationDialog({ program, onClose }: { program: Program; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    const data = new FormData(e.currentTarget);
    const res = await submitRegistration({
      program_id: program.id,
      program_slug: program.slug,
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      organisation: String(data.get('organisation') || '').trim() || undefined,
      job_title: String(data.get('job_title') || '').trim() || undefined,
      seats: Number(data.get('seats') || 1),
      message: String(data.get('message') || '').trim() || undefined,
    });

    if (res.ok) setStatus('done');
    else {
      setStatus('idle');
      setError(res.error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Register for ${program.title}`}
    >
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-card bg-paper p-6 shadow-2xl sm:rounded-card sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="u-eyebrow text-moss">Register interest</p>
            <h2 className="u-display mt-2 text-2xl text-ink">{program.title}</h2>
            <p className="mt-1 text-sm text-slate">
              {program.level}
              {program.duration ? ` · ${program.duration}` : ''}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate hover:bg-sand hover:text-ink" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {status === 'done' ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto text-moss" size={34} />
            <h3 className="u-display mt-4 text-xl text-ink">You are on the list</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
              We will send dates, format, and pricing for {program.title} to your inbox shortly.
            </p>
            <Button variant="outline" onClick={onClose} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required>
                <input name="name" required minLength={2} className={inputClass} placeholder="Your full name" />
              </Field>
              <Field label="Work email" required>
                <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Organisation">
                <input name="organisation" className={inputClass} placeholder="Company name" />
              </Field>
              <Field label="Job title">
                <input name="job_title" className={inputClass} placeholder="Your role" />
              </Field>
            </div>
            <Field label="Number of seats">
              <input name="seats" type="number" min={1} max={500} defaultValue={1} className={inputClass} />
            </Field>
            <Field label="Anything we should know?">
              <textarea name="message" rows={3} className={`${inputClass} resize-y`} placeholder="Optional" />
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
                'Register interest'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
