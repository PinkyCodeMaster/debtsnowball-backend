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

interface WeeklySummaryEmailProps {
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
  appUrl: string;
}

export const WeeklySummaryEmail = ({
  userName,
  weekStartDate,
  weekEndDate,
  totalDebtPaid,
  totalIncome,
  totalExpenses,
  debtProgress,
  babyStep,
  appUrl,
}: WeeklySummaryEmailProps) => {
  const leftOver = totalIncome - totalExpenses - totalDebtPaid;

  return (
    <Html>
      <Head />
      <Preview>Your weekly financial summary for {weekStartDate} - {weekEndDate}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📊 Your Weekly Summary</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            Here's your financial progress for {weekStartDate} - {weekEndDate}:
          </Text>
          
          <Section style={statsGrid}>
            <Section style={statCard}>
              <Text style={statLabel}>Income</Text>
              <Text style={statValue}>£{totalIncome.toFixed(2)}</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Expenses</Text>
              <Text style={statValue}>£{totalExpenses.toFixed(2)}</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Debt Paid</Text>
              <Text style={{...statValue, color: '#10b981'}}>£{totalDebtPaid.toFixed(2)}</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Left Over</Text>
              <Text style={{...statValue, color: leftOver >= 0 ? '#10b981' : '#ef4444'}}>
                £{leftOver.toFixed(2)}
              </Text>
            </Section>
          </Section>

          <Section style={debtCard}>
            <Text style={sectionTitle}>💳 Debt Progress</Text>
            <Text style={debtStat}>
              Total Debt Remaining: <strong>£{debtProgress.totalDebt.toFixed(2)}</strong>
            </Text>
            <Text style={debtStat}>
              Debts Remaining: <strong>{debtProgress.debtsRemaining}</strong>
            </Text>
            <Text style={debtStat}>
              Projected Debt-Free Date: <strong>{debtProgress.debtFreeDate}</strong>
            </Text>
          </Section>

          <Section style={babyStepCard}>
            <Text style={sectionTitle}>🎯 Baby Step Progress</Text>
            <Text style={babyStepText}>
              You're on <strong>Baby Step {babyStep.current}: {babyStep.name}</strong>
            </Text>
            <Text style={babyStepProgress}>
              Progress: {babyStep.progress}%
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={appUrl}>
              View Full Dashboard
            </Button>
          </Section>

          <Text style={footer}>
            Keep up the great work! Every payment brings you closer to financial freedom. 💪
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WeeklySummaryEmail;

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

const statsGrid = {
  display: 'grid' as const,
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
  margin: '24px 20px',
};

const statCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  border: '1px solid #e5e7eb',
  textAlign: 'center' as const,
};

const statLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const statValue = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0',
};

const debtCard = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 20px',
  border: '1px solid #fbbf24',
};

const babyStepCard = {
  backgroundColor: '#dbeafe',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 20px',
  border: '1px solid #3b82f6',
};

const sectionTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 12px 0',
};

const debtStat = {
  fontSize: '14px',
  color: '#333',
  margin: '8px 0',
};

const babyStepText = {
  fontSize: '14px',
  color: '#333',
  margin: '0 0 8px 0',
};

const babyStepProgress = {
  fontSize: '14px',
  color: '#3b82f6',
  fontWeight: 'bold',
  margin: '0',
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
