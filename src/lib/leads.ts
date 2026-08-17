import { supabase } from '@/lib/supabase';
import { sendContactConfirmation } from '@/lib/email-service';

export type SubmitResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = 'Something went wrong sending that. Please email hello@sustainterra.com and we will pick it up.';

async function insert(table: string, row: Record<string, unknown>): Promise<SubmitResult> {
  if (!supabase) return { ok: false, error: GENERIC_ERROR };
  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.error(`[${table}]`, error.message);
    return { ok: false, error: GENERIC_ERROR };
  }
  return { ok: true };
}

export type ConsultationInput = {
  name: string;
  email: string;
  organisation?: string;
  phone?: string;
  interest?: string;
  message?: string;
};

export async function submitConsultation(input: ConsultationInput): Promise<SubmitResult> {
  const res = await insert('consultation_requests', {
    ...input,
    interest: input.interest || 'general',
    source_page: typeof window === 'undefined' ? null : window.location.pathname,
  });

  if (res.ok) {
    // Send confirmation email (fire-and-forget)
    const interestLabel = {
      consulting: 'consulting engagement',
      training: 'training for your team',
      reporting: 'ESG reporting / disclosure',
      general: 'your inquiry',
    }[input.interest || 'general'] || 'your inquiry';

    sendContactConfirmation({
      name: input.name,
      email: input.email,
      subject: interestLabel,
    }).catch(err => console.error('Email send error:', err));
  }

  return res;
}

export type RegistrationInput = {
  program_id?: string;
  program_slug?: string;
  name: string;
  email: string;
  organisation?: string;
  job_title?: string;
  seats?: number;
  message?: string;
};

export const submitRegistration = (input: RegistrationInput) =>
  insert('program_registrations', { ...input, seats: input.seats ?? 1 });

const BROCHURE_URLS: Record<string, { title: string; url: string }> = {
  'learning-and-development': {
    title: 'Learning & Development Programme Brochure',
    url: 'https://sustainterra.com/brochures/learning-and-development.pdf',
  },
  'consulting-services': {
    title: 'Consulting Services Brochure',
    url: 'https://sustainterra.com/brochures/consulting-services.pdf',
  },
  overview: {
    title: 'Company Overview',
    url: 'https://sustainterra.com/brochures/overview.pdf',
  },
};

export async function submitBrochureRequest(
  email: string,
  name?: string,
  brochure = 'overview',
  organisation?: string
): Promise<SubmitResult> {
  const res = await insert('brochure_downloads', { email, brochure, organisation });

  if (res.ok) {
    // Send brochure delivery email (fire-and-forget)
    const brochureInfo = BROCHURE_URLS[brochure] || BROCHURE_URLS.overview;
    sendContactConfirmation({
      name: name || 'there',
      email,
      subject: brochureInfo.title,
    }).catch(err => console.error('Email send error:', err));
  }

  return res;
}

export const CALENDLY_URL = 'https://calendly.com/vinit-sustainterra/consultation';
