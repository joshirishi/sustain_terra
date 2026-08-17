import { supabase } from '@/lib/supabase';
import { sendEnrollmentConfirmation } from '@/lib/email-service';

export interface EnrollmentData {
  name: string;
  email: string;
  organisation?: string;
  job_title?: string;
  courses: string[];
  total_price: number;
  payment_method: 'razorpay' | 'offline';
  message?: string;
}

export async function submitEnrollment(data: EnrollmentData) {
  if (!supabase) {
    return { ok: false, error: 'Database not configured' };
  }

  try {
    const { error, data: result } = await supabase.from('enrollments').insert({
      name: data.name,
      email: data.email,
      organisation: data.organisation,
      job_title: data.job_title,
      courses: data.courses,
      total_amount_paise: data.total_price * 100,
      payment_method: data.payment_method,
      payment_status: 'pending',
      message: data.message,
    }).select();

    if (error) {
      console.error('Enrollment submission error:', error);
      return { ok: false, error: 'Failed to submit enrollment' };
    }

    // Send confirmation email (fire-and-forget; don't block on email failure)
    sendEnrollmentConfirmation({
      name: data.name,
      email: data.email,
      courses: data.courses,
      totalAmount: data.total_price,
      paymentMethod: data.payment_method,
    }).catch(err => console.error('Email send error:', err));

    return { ok: true, error: '' };
  } catch (err) {
    console.error('Enrollment error:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
