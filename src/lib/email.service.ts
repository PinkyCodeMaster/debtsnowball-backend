import { render } from '@react-email/components';
import { resend, EMAIL_FROM, APP_NAME, APP_URL } from './email';
import { WelcomeEmail } from '../emails/WelcomeEmail';
import { VerificationEmail } from '../emails/VerificationEmail';
import { PasswordResetEmail } from '../emails/PasswordResetEmail';
import { PaymentReminderEmail } from '../emails/PaymentReminderEmail';
import { DebtPaidOffEmail } from '../emails/DebtPaidOffEmail';
import { WeeklySummaryEmail } from '../emails/WeeklySummaryEmail';

export async function sendWelcomeEmail(to: string, userName: string) {
  try {
    const emailHtml = await render(WelcomeEmail({ userName }));

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Welcome to ${APP_NAME}!`,
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error };
    }

    console.log('Welcome email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(
  to: string,
  verificationUrl: string,
  userName?: string
) {
  try {
    const emailHtml = await render(
      VerificationEmail({ verificationUrl, userName })
    );

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: 'Verify your email address',
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error };
    }

    console.log('Verification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  userName?: string
) {
  try {
    const emailHtml = await render(PasswordResetEmail({ resetUrl, userName }));

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: 'Reset your password',
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error };
    }

    console.log('Password reset email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}

export async function sendPaymentReminderEmail(
  to: string,
  data: {
    userName: string;
    payments: {
      name: string;
      amount: number;
      dueDate: string;
      type: 'debt' | 'expense';
    }[];
  }
) {
  try {
    const emailHtml = await render(
      PaymentReminderEmail({
        userName: data.userName,
        payments: data.payments,
        appUrl: APP_URL,
      })
    );

    const { data: resendData, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Payment Reminder: ${data.payments.length} payment${data.payments.length > 1 ? 's' : ''} due soon`,
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send payment reminder email:', error);
      return { success: false, error };
    }

    console.log('Payment reminder email sent:', resendData);
    return { success: true, data: resendData };
  } catch (error) {
    console.error('Error sending payment reminder email:', error);
    return { success: false, error };
  }
}

export async function sendDebtPaidOffEmail(
  to: string,
  data: {
    userName: string;
    debtName: string;
    amountPaid: number;
    totalDebtsRemaining: number;
    nextDebtName?: string;
  }
) {
  try {
    const emailHtml = await render(
      DebtPaidOffEmail({
        userName: data.userName,
        debtName: data.debtName,
        amountPaid: data.amountPaid,
        totalDebtsRemaining: data.totalDebtsRemaining,
        nextDebtName: data.nextDebtName,
        appUrl: APP_URL,
      })
    );

    const { data: resendData, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `🎉 Congratulations! You paid off ${data.debtName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send debt paid off email:', error);
      return { success: false, error };
    }

    console.log('Debt paid off email sent:', resendData);
    return { success: true, data: resendData };
  } catch (error) {
    console.error('Error sending debt paid off email:', error);
    return { success: false, error };
  }
}

export async function sendWeeklySummaryEmail(
  to: string,
  data: {
    userName: string;
    weekStartDate: string;
    weekEndDate: string;
    totalDebtPaid: number;
    totalIncome: number;
    totalExpenses: number;
    debtProgress: {
      totalDebt: number;
      debtsRemaining: number;
      debtFreeDate: string;
    };
    babyStep: {
      current: number;
      name: string;
      progress: number;
    };
  }
) {
  try {
    const emailHtml = await render(
      WeeklySummaryEmail({
        userName: data.userName,
        weekStartDate: data.weekStartDate,
        weekEndDate: data.weekEndDate,
        totalDebtPaid: data.totalDebtPaid,
        totalIncome: data.totalIncome,
        totalExpenses: data.totalExpenses,
        debtProgress: data.debtProgress,
        babyStep: data.babyStep,
        appUrl: APP_URL,
      })
    );

    const { data: resendData, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Your Weekly Financial Summary - ${data.weekStartDate} to ${data.weekEndDate}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send weekly summary email:', error);
      return { success: false, error };
    }

    console.log('Weekly summary email sent:', resendData);
    return { success: true, data: resendData };
  } catch (error) {
    console.error('Error sending weekly summary email:', error);
    return { success: false, error };
  }
}
