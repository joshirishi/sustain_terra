/**
 * Email templates for transactional emails.
 * Resend-compatible templates (inline HTML + plain text fallback).
 */

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

export function enrollmentConfirmation(data: {
  name: string;
  email: string;
  courses: string[];
  totalAmount: number;
  paymentMethod: 'razorpay' | 'offline';
  paymentRef?: string;
}): EmailTemplate {
  const courseList = data.courses.join(', ');
  return {
    subject: `Enrollment Confirmed – Sustain Terra`,
    html: `
      <h2>Your enrollment is confirmed!</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for enrolling in our sustainability training programmes.</p>
      <h3>Courses:</h3>
      <p>${courseList}</p>
      <h3>Payment Details:</h3>
      <p><strong>Total Amount:</strong> ₹${data.totalAmount.toLocaleString('en-IN')}</p>
      <p><strong>Payment Method:</strong> ${data.paymentMethod === 'razorpay' ? 'Card/UPI via Razorpay' : 'Bank Transfer'}</p>
      ${data.paymentRef ? `<p><strong>Payment Reference:</strong> ${data.paymentRef}</p>` : ''}
      ${data.paymentMethod === 'offline' ? `<p>We will send you bank details shortly.</p>` : ''}
      <p>If you have any questions, reach out to hello@sustainterra.com</p>
      <p>Looking forward to having you in our programmes!</p>
      <p>—<br/>The Sustain Terra team</p>
    `,
    text: `
Your enrollment is confirmed!

Hi ${data.name},

Thank you for enrolling in our sustainability training programmes.

Courses: ${courseList}

Payment Details:
Total Amount: ₹${data.totalAmount.toLocaleString('en-IN')}
Payment Method: ${data.paymentMethod === 'razorpay' ? 'Card/UPI via Razorpay' : 'Bank Transfer'}
${data.paymentRef ? `Payment Reference: ${data.paymentRef}` : ''}

If you have any questions, reach out to hello@sustainterra.com

Looking forward to having you in our programmes!

— The Sustain Terra team
    `,
  };
}

export function contactInquiryConfirmation(data: {
  name: string;
  email: string;
  subject: string;
}): EmailTemplate {
  return {
    subject: `We received your inquiry – Sustain Terra`,
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${data.name},</p>
      <p>We've received your inquiry about <strong>${data.subject}</strong>.</p>
      <p>Our team will review your message and get back to you within 2 business days.</p>
      <p>In the meantime, feel free to explore our programmes at <a href="https://sustainterra.com">sustainterra.com</a></p>
      <p>hello@sustainterra.com | +91 (team to add)</p>
      <p>—<br/>The Sustain Terra team</p>
    `,
    text: `
Thank you for reaching out!

Hi ${data.name},

We've received your inquiry about ${data.subject}.

Our team will review your message and get back to you within 2 business days.

In the meantime, feel free to explore our programmes at https://sustainterra.com

hello@sustainterra.com

— The Sustain Terra team
    `,
  };
}

export function brochureDelivery(data: {
  name: string;
  email: string;
  brochureTitle: string;
  brochureUrl: string;
}): EmailTemplate {
  return {
    subject: `Your ${data.brochureTitle} Brochure`,
    html: `
      <h2>Here's your brochure!</h2>
      <p>Hi ${data.name},</p>
      <p>As requested, we're sending you the <strong>${data.brochureTitle}</strong> brochure.</p>
      <p><a href="${data.brochureUrl}" style="background: #c4652f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; display: inline-block;">Download Brochure</a></p>
      <p>Questions? Reach out to hello@sustainterra.com</p>
      <p>—<br/>The Sustain Terra team</p>
    `,
    text: `
Here's your brochure!

Hi ${data.name},

As requested, we're sending you the ${data.brochureTitle} brochure.

Download: ${data.brochureUrl}

Questions? Reach out to hello@sustainterra.com

— The Sustain Terra team
    `,
  };
}
