import { supabase } from '@/lib/supabase';

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

export const submitConsultation = (input: ConsultationInput) =>
  insert('consultation_requests', {
    ...input,
    interest: input.interest || 'general',
    source_page: typeof window === 'undefined' ? null : window.location.pathname,
  });

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

export const submitBrochureRequest = (email: string, brochure = 'overview', organisation?: string) =>
  insert('brochure_downloads', { email, brochure, organisation });

export const CALENDLY_URL = 'https://calendly.com/vinit-sustainterra/consultation';
