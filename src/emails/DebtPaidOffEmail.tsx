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

interface DebtPaidOffEmailProps {
    userName: string;
    debtName: string;
    amountPaid: number;
    totalDebtsRemaining: number;
    nextDebtName?: string;
    appUrl: string;
}

export const DebtPaidOffEmail = ({
    userName,
    debtName,
    amountPaid,
    totalDebtsRemaining,
    nextDebtName,
    appUrl,
}: DebtPaidOffEmailProps) => (
    <Html>
        <Head />
        <Preview>🎉 Congratulations! You paid off {debtName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>🎉 Debt Paid Off! 🎉</Heading>
                <Text style={text}>Congratulations {userName}!</Text>
                <Text style={celebrationText}>
                    You just paid off <strong>{debtName}</strong>!
                </Text>
                <Section style={statsCard}>
                    <Text style={statsTitle}>You eliminated</Text>
                    <Text style={statsAmount}>£{amountPaid.toFixed(2)}</Text>
                    <Text style={statsSubtext}>of debt!</Text>
                </Section>
                <Text style={text}>
                    This is a HUGE win! You're {totalDebtsRemaining === 0 ? 'officially DEBT-FREE! 🎊' : `now one step closer to being debt-free. You have ${totalDebtsRemaining} debt${totalDebtsRemaining > 1 ? 's' : ''} remaining.`}
                </Text>
                {totalDebtsRemaining > 0 && nextDebtName && (
                    <Section style={nextDebtCard}>
                        <Text style={nextDebtTitle}>🎯 Next in the Snowball:</Text>
                        <Text style={nextDebtNameStyle}>{nextDebtName}</Text>
                        <Text style={nextDebtText}>
                            The payment you were making on {debtName} now rolls into this debt. Keep the momentum going!
                        </Text>
                    </Section>
                )}
                {totalDebtsRemaining === 0 && (
                    <Text style={debtFreeText}>
                        You've completed Baby Step 2! It's time to build your full emergency fund (Baby Step 3). 🚀
                    </Text>
                )}
                <Section style={buttonContainer}>
                    <Button style={button} href={appUrl}>
                        View Your Progress
                    </Button>
                </Section>
                <Text style={footer}>
                    Keep up the amazing work! Small wins lead to big victories. 💪
                </Text>
            </Container>
        </Body>
    </Html>
);

export default DebtPaidOffEmail;

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
    color: '#10b981',
    fontSize: '28px',
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

const celebrationText = {
    color: '#10b981',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '30px',
    margin: '24px 20px',
    textAlign: 'center' as const,
};

const statsCard = {
    backgroundColor: '#f0fdf4',
    borderRadius: '12px',
    padding: '24px',
    margin: '32px 20px',
    border: '2px solid #10b981',
    textAlign: 'center' as const,
};

const statsTitle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const statsAmount = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#10b981',
    margin: '0',
};

const statsSubtext = {
    fontSize: '16px',
    color: '#6b7280',
    margin: '8px 0 0 0',
};

const nextDebtCard = {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 20px',
    border: '1px solid #e5e7eb',
};

const nextDebtTitle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textTransform: 'uppercase' as const,
};

const nextDebtNameStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#10b981',
    margin: '0 0 12px 0',
};

const nextDebtText = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0',
    lineHeight: '20px',
};

const debtFreeText = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#10b981',
    margin: '24px 20px',
    textAlign: 'center' as const,
    lineHeight: '28px',
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
