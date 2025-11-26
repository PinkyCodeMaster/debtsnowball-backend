/** @jsxImportSource react */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName?: string;
}

export const WelcomeEmail = ({ userName = 'there' }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Debt Snowball - Start Your Journey to Financial Freedom</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Debt Snowball! 🎉</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Thank you for joining Debt Snowball! We're excited to help you on your journey to becoming debt-free using Dave Ramsey's proven Baby Steps method.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={process.env.APP_URL || 'http://localhost:8081'}>
            Get Started
          </Button>
        </Section>
        <Text style={text}>
          <strong>What's next?</strong>
        </Text>
        <Text style={text}>
          1. 📊 Add your income sources<br />
          2. 💰 Track your expenses<br />
          3. 💳 List your debts<br />
          4. 🎯 Start your Baby Steps journey
        </Text>
        <Text style={text}>
          Remember: Small steps lead to big wins. You've got this!
        </Text>
        <Text style={footer}>
          If you have any questions, just reply to this email.<br />
          The Debt Snowball Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
};
