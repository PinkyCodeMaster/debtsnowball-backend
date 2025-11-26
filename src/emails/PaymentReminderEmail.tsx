/** @jsxImportSource react */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PaymentReminderEmailProps {
  userName: string;
  payments: Array<{
    name: string;
    amount: number;
    dueDate: string;
    type: 'debt' | 'expense';
  }>;
  appUrl: string;
}

export const PaymentReminderEmail = ({
  userName,
  payments,
  appUrl,
}: PaymentReminderEmailProps) => {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Html>
      <Head />
      <Preview>{`You have ${payments.length} payment${payments.length > 1 ? 's' : ''} due soon`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Reminder 💰</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            You have {payments.length} payment{payments.length > 1 ? 's' : ''} due in the next 3 days:
          </Text>
          <Section style={paymentsContainer}>
            {payments.map((payment, index: number) => (
              <Section key={index} style={paymentCard}>
                <Text style={paymentName}>
                  {payment.type === 'debt' ? '💳' : '💵'} {payment.name}
                </Text>
                <Text style={paymentAmount}>£{payment.amount.toFixed(2)}</Text>
                <Text style={paymentDue}>Due: {payment.dueDate}</Text>
              </Section>
            ))}
          </Section>
          <Text style={totalText}>
            Total Due: <strong>£{totalAmount.toFixed(2)}</strong>
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={appUrl}>
              View All Payments
            </Button>
          </Section>
          <Text style={footer}>
            Stay on track with your debt-free journey! 🎯
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentReminderEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 20px',
};

const paymentsContainer = {
  margin: '24px 20px',
};

const paymentCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  border: '1px solid #e5e7eb',
};

const paymentName = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: '#333',
};

const paymentAmount = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
  color: '#10b981',
};

const paymentDue = {
  fontSize: '14px',
  margin: '0',
  color: '#6b7280',
};

const totalText = {
  fontSize: '18px',
  textAlign: 'center' as const,
  margin: '24px 20px',
  color: '#333',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#10b981',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '32px 20px 0',
  textAlign: 'center' as const,
};
