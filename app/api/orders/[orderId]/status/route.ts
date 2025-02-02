import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Resend } from 'resend';
import OrderStatusEmail from '@/app/emails/order-status-update';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    // 1. Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get and validate the new status
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    console.log('Processing status update:', {
      orderId: params.orderId,
      status,
      userId
    });

    // 3. Update order status
    const order = await prisma.order.update({
      where: { id: params.orderId },
      data: { status },
      include: {
        user: true,
      },
    });

    console.log('Order updated successfully:', {
      orderId: order.id,
      status: order.status,
      userEmail: order.user.email
    });

    // 4. Send email notification
    try {
      console.log('Attempting to send email notification...');
      
      const emailResponse = await resend.emails.send({
        from: 'onboarding@resend.dev',
        // to: process.env.NODE_ENV === 'development' 
        //   ? `${order.user.email.split('@')[0]}@resend.dev`  // Use Resend test domain in development
        //   : order.user.email,
        to: order.user.email,
        subject: `Order Status Update - ${order.id}`,
        react: OrderStatusEmail({
          customerName: order.user.name || order.user.email.split('@')[0],
          orderNumber: order.id,
          status: order.status,
        }),
      });

      console.log('Email sent successfully:', emailResponse);

      return NextResponse.json({
        success: true,
        order,
        emailSent: true,
        emailId: emailResponse?.data?.id || undefined
      });
    } catch (emailError: any) {
      console.error('Failed to send email:', {
        error: emailError.message,
        stack: emailError.stack,
        orderId: order.id,
        userEmail: order.user.email
      });

      // Return success for order update but indicate email failure
      return NextResponse.json({
        success: true,
        order,
        emailSent: false,
        emailError: emailError.message
      });
    }
  } catch (error: any) {
    console.error('Error in order status update:', {
      error: error.message,
      stack: error.stack,
      orderId: params.orderId
    });

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update order status',
        details: error.message
      },
      { status: 500 }
    );
  }
}