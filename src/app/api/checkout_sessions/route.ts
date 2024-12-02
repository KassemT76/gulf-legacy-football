import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Define the POST handler
export async function POST(request: Request) {
  const { registrationType, email, phoneNumber, teamName, teamPos, fullName } = await request.json();

  let customer;
    try {
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          name: fullName,
          email: email,
          phone: phoneNumber,
        });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  try {
    // Step 1: Check if customer exists or create a new one
    /*
    Team REGISTRATION CHECKOUT
    */

    if (registrationType === 'team') {
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price: process.env.STRIPE_TEAM_PRODUCT, // Dynamic price ID based on registrationType
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&type=${registrationType}`,
        cancel_url: `${request.headers.get('origin')}/register?canceled=true`,
        metadata: {
          fullName: fullName as string,
          phoneNumber: phoneNumber as string,
          teamName: teamName as string,
        },
      });
      return NextResponse.json({ url: session.url }, { status: 200 });
    }
    /*
    Indiviual REGISTRATION CHECKOUT
    */
    else if (registrationType === 'individual') {
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price: process.env.STRIPE_INDIVIDUAL_PRODUCT, // Dynamic price ID based on registrationType
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&type=${registrationType}`,
        cancel_url: `${request.headers.get('origin')}/register?canceled=true`,
        metadata: {
          fullName: fullName as string,
          phoneNumber: phoneNumber as string,
          teamPos: teamPos as string,
        },
      }); // Replace with your actual individual price ID
      return NextResponse.json({ url: session.url }, { status: 200 });
    }
    else {
      return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Error creating Stripe Checkout session:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
