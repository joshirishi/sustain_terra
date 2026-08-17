import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { Button, Field, inputClass } from '@/components/ui';
import { useContent } from '@/lib/content';
import { submitEnrollment } from '@/lib/enrollment';
import type { Program } from '@/lib/types';

const COURSE_PRICES: Record<string, number> = {
  'essentials-of-sustainability': 15000,
  'ghg-accounting': 18000,
  'materiality-assessment': 15000,
  'sustainability-reporting': 21000,
  'climate-risk': 18000,
  'decarbonization-roadmap': 21000,
};

export function MultiCourseEnrollmentForm({ onClose }: { onClose: () => void }) {
  const { programs } = useContent();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'offline'>('razorpay');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const selectedPrograms = programs.filter(p => selectedCourses.has(p.slug));
  const totalPrice = selectedPrograms.reduce((sum, p) => sum + (COURSE_PRICES[p.slug] || 0), 0);

  const toggleCourse = (slug: string) => {
    const next = new Set(selectedCourses);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setSelectedCourses(next);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedCourses.size === 0) {
      setError('Please select at least one course');
      return;
    }

    setStatus('sending');
    setError(null);

    const data = new FormData(e.currentTarget);
    const enrollmentData = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      organisation: String(data.get('organisation') || '').trim() || undefined,
      job_title: String(data.get('job_title') || '').trim() || undefined,
      courses: Array.from(selectedCourses),
      total_price: totalPrice,
      payment_method: paymentMethod,
      message: String(data.get('message') || '').trim() || undefined,
    };

    const res = await submitEnrollment(enrollmentData);
    if (res.ok) {
      setStatus('done');
    } else {
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
      aria-label="Enroll in courses"
    >
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-card bg-paper p-6 shadow-2xl sm:rounded-card sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="u-eyebrow text-moss">Enroll</p>
            <h2 className="u-display mt-2 text-2xl text-ink">Select your courses</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate hover:bg-sand hover:text-ink" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {status === 'done' ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto text-moss" size={34} />
            <h3 className="u-display mt-4 text-xl text-ink">Enrollment confirmed</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
              We will send payment details and next steps to your inbox shortly.
            </p>
            <Button variant="outline" onClick={onClose} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
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

            <Field label="Courses">
              <div className="space-y-2">
                {programs.map((prog) => (
                  <label key={prog.id} className="flex items-center gap-3 rounded-lg border border-line p-3 cursor-pointer hover:bg-sand/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCourses.has(prog.slug)}
                      onChange={() => toggleCourse(prog.slug)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-ink">{prog.title}</div>
                      <div className="text-xs text-slate">{prog.level}</div>
                    </div>
                    <div className="font-semibold text-moss">₹{COURSE_PRICES[prog.slug] || 0}</div>
                  </label>
                ))}
              </div>
            </Field>

            {selectedCourses.size > 0 && (
              <div className="rounded-xl bg-lichen/10 border border-lichen/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">Total amount:</span>
                  <span className="text-2xl font-bold text-moss">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            <Field label="Payment method">
              <div className="space-y-2">
                <label className="flex items-center gap-3 rounded-lg border border-line p-3 cursor-pointer hover:bg-sand/30 transition-colors" style={{borderColor: paymentMethod === 'razorpay' ? 'var(--color-moss)' : 'var(--color-line)'}}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="font-medium text-ink">Credit/Debit Card or UPI</div>
                    <div className="text-xs text-slate">Secure payment via Razorpay</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-line p-3 cursor-pointer hover:bg-sand/30 transition-colors" style={{borderColor: paymentMethod === 'offline' ? 'var(--color-moss)' : 'var(--color-line)'}}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="offline"
                    checked={paymentMethod === 'offline'}
                    onChange={() => setPaymentMethod('offline')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="font-medium text-ink">Bank Transfer</div>
                    <div className="text-xs text-slate">We'll send you payment details</div>
                  </div>
                </label>
              </div>
            </Field>

            <Field label="Anything we should know?">
              <textarea name="message" rows={3} className={`${inputClass} resize-y`} placeholder="Optional" />
            </Field>

            {error && (
              <p role="alert" className="rounded-xl border border-clay/30 bg-clay/5 px-4 py-3 text-sm text-clay-dark">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={status === 'sending' || selectedCourses.size === 0} className="w-full">
              {status === 'sending' ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Processing…
                </>
              ) : (
                `Enroll (₹${selectedCourses.size > 0 ? totalPrice.toLocaleString('en-IN') : 0})`
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
