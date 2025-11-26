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

interface PasswordResetEmailProps {
    resetUrl: string;
    userName?: string;
}

export const PasswordResetEmail = ({
    resetUrl,
    userName = 'there',
}: PasswordResetEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your Debt Snowball password</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Reset Your Password</Heading>
                <Text style={text}>Hi {userName},</Text>
                <Text style={text}>
                    We received a request to reset your password for your Debt Snowball account.
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href={resetUrl}>
                        Reset Password
                    </Button>
                </Section>
                <Text style={text}>
                    Or copy and paste this link into your browser:
                </Text>
                <Text style={link}>{resetUrl}</Text>
                <Text style={text}>
                    This link will expire in 1 hour.
                </Text>
                <Text style={footer}>
                    If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default PasswordResetEmail;

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

const link = {
    color: '#556cd6',
    fontSize: '14px',
    textDecoration: 'underline',
    margin: '16px 20px',
    wordBreak: 'break-all' as const,
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
