import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface OrderStatusEmailProps {
  customerName: string;
  orderNumber: string;
  status: string;
}

export const OrderStatusEmail = ({
  customerName,
  orderNumber,
  status,
}: OrderStatusEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your order status has been updated</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Order Status Update</Heading>
          <Text style={text}>Dear {customerName},</Text>
          <Text style={text}>
            Your order #{orderNumber} has been updated to: <strong>{status}</strong>
          </Text>
          <Section>
            <Text style={text}>
              You can track your order status by logging into your account.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>The Fashion Store</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '16px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#898989',
  fontSize: '14px',
  marginTop: '16px',
  textAlign: 'center' as const,
};

export default OrderStatusEmail;