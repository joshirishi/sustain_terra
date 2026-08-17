/**
 * Email service for sending transactional emails.
 * Posts to backend endpoint which handles Resend API calls.
 */

import type { EmailTemplate } from '@/lib/email-templates';

export interface SendEmailRequest {
  to: string;
  template: EmailTemplate;
  metadata?: Record<string, string>;
}

export async function sendEmail(req: SendEmailRequest) {
  try {
    // In production, this would call a Supabase Edge Function or backend API
    // that has Resend API key in its env vars (never exposed to client).
    //
    // For now, we simulate the request structure:
    const response = await fetch('/api/emails/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: req.to,
        subject: req.template.subject,
        html: req.template.html,
        text: req.template.text,
        metadata: req.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.statusText}`);
    }

    return { ok: true, messageId: (await response.json()).messageId };
  } catch (err) {
    console.error('Email send error:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to send email' };
  }
}

/**
 * Send enrollment confirmation email.
 * Called after enrollment form submission.
 */
export async function sendEnrollmentConfirmation(data: {
  name: string;
  email: string;
  courses: string[];
  totalAmount: number;
  paymentMethod: 'razorpay' | 'offline';
  paymentRef?: string;
}) {
  const { enrollmentConfirmation } = await import('@/lib/email-templates');
  const template = enrollmentConfirmation(data);

  return sendEmail({
    to: data.email,
    template,
    metadata: {
      type: 'enrollment_confirmation',
      courses: data.courses.join(','),
      amount: String(data.totalAmount),
    },
  });
}

/**
 * Send contact inquiry confirmation email.
 * Called after contact form submission.
 */
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  subject: string;
}) {
  const { contactInquiryConfirmation } = await import('@/lib/email-templates');
  const template = contactInquiryConfirmation(data);

  return sendEmail({
    to: data.email,
    template,
    metadata: {
      type: 'contact_confirmation',
      subject: data.subject,
    },
  });
}

/**
 * Send brochure delivery email.
 * Called after brochure request.
 */
export async function sendBrochureEmail(data: {
  name: string;
  email: string;
  brochureTitle: string;
  brochureUrl: string;
}) {
  const { brochureDelivery } = await import('@/lib/email-templates');
  const template = brochureDelivery(data);

  return sendEmail({
    to: data.email,
    template,
    metadata: {
      type: 'brochure_delivery',
      brochure: data.brochureTitle,
    },
  });
}
