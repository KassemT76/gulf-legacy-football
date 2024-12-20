import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const transporter = nodemailer.createTransport({
service: 'Gmail', // Change this if you're using another email provider
auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
},
});

async function addEmail(email: string) {
try {
    // Query Firestore for existing entries with the same uniqueField value
    const q = query(collection(db, "Emails"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        // If no matching entry exists, add the document
        const docRef = await addDoc(collection(db, "Emails"), {
            email
            });
        console.log("Team added with ID: ", docRef.id);
        return docRef.id;
    } else {
        throw Error("Email already added!")
    }

} catch (e) {
    console.error("Error adding team: ", e);
    throw e;
}
}

// Use POST instead of GET to handle request body
export async function POST(request: NextRequest) {
  try {
    const { email: recipientEmail } = await request.json();

    if (!recipientEmail) {
      throw new Error("Recipient email is required.");
    }

    console.log("Recipient email:", recipientEmail);

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: recipientEmail, // Recipient email address
      subject: "Welcome to Gulf Legacy Football!", // Email subject
      text: "It's great to have you join us in our leagues. We saved your email and will send updates on Gulf Legacy Football!", // Email body
    };

    await addEmail(recipientEmail)
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    

    return NextResponse.json({
      success: true,
      message: "Email successfully sent!",
    });
  } catch (error: any) {
    console.error('Error processing email request:', error.message);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while sending the email.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
