import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import nodemailer from 'nodemailer';

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

async function addTeam(teamName: string, division: string, matchesWon: number, matchesPlayed: number, matchesLost: number, matchesDrawn: number, goalsFor: number, goalsAgainst: number) {
  try {
    const docRef = await addDoc(collection(db, "Teams"), {
      teamName, division, matchesPlayed, matchesWon, matchesLost, matchesDrawn, goalsFor, goalsAgainst
    });
    console.log("Team added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding team: ", e);
    throw e;
  }
}

async function addPlayer(fullName: string, phoneNumber: string, teamPos: string, email: string) {
  try {
    const docRef = await addDoc(collection(db, "Players"), {
      fullName, phoneNumber, teamPos, email, isCaptain: false, team: doc(db, "Teams", "Indies"),
    });
    console.log("Player added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding player: ", e);
    throw e;
  }
}

async function addSessionID(sessionID: string) {
  try {
    const docRef = await addDoc(collection(db, "SessionIDs"), { sessionID });
    console.log("SessionID added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding sessionID: ", e);
    throw e;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  const type = searchParams.get('type');

  if (!sessionId) {
    return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    const sessionIDQuery = query(collection(db, "SessionIDs"), where("sessionID", "==", sessionId));
    const querySnapshot = await getDocs(sessionIDQuery);

    const customer = await stripe.customers.retrieve(session.customer as string);

    const fullName = session.metadata?.fullName || session.customer_email;
    const teamPos = session.metadata?.teamPos || "N/A"; 
    const phoneNumber = session.metadata?.phoneNumber || "N/A";
    let recipientEmail = session.customer_email || ""; // Default to session.customer_email
    
    if (customer && !('deleted' in customer)) {
      // Only access `email` if the customer is not deleted
      recipientEmail = customer.email || recipientEmail;
    }

    if (!recipientEmail) {
      throw new Error("Customer email not found.");
    }

    console.log("Recipient email:", recipientEmail);

    if (!querySnapshot.empty) {
      return NextResponse.json({
        success: true,
        message: "Registration already processed. If you didn't refresh this page, please check the standings for your team.",
        session: session,
        name: fullName,
        phoneNumber: phoneNumber,
        email: recipientEmail,
        metadata: session.metadata,
      });
    }

    if (type === 'team') {
      const teamName = session.metadata?.teamName;
      if (!teamName) {
        throw new Error("Team name not found in checkout session");
      }

      const teamNameQuery = query(collection(db, "Teams"), where("teamName", "==", teamName));
      const teamQuerySnapshot = await getDocs(teamNameQuery);

      const finalTeamName = teamQuerySnapshot.empty ? teamName : `${teamName}${teamQuerySnapshot.size + 1}`;
      await addTeam(finalTeamName, "-1", 0, 0, 0, 0, 0, 0);

    } else if (type === 'individual') {
      if (!fullName || !teamPos) {
        console.log("ASAS")
        throw new Error("Missing required information for individual registration");
      }

      await addPlayer(fullName, phoneNumber, teamPos, recipientEmail);
    } else {
      throw new Error("Invalid registration type");
    }

    await addSessionID(sessionId);

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: recipientEmail, // Recipient email address
      subject: "Welcome to Gulf Legacy Football Leauges!", // Email subject
      text: "Its great to have you join us in our leauges we will email you with more info shortly.", // Plain text body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error("Failed to send email");
    }
    console.log("Email: " + recipientEmail)
    return NextResponse.json({
      success: true,
      message: "Registration successfully processed!",
      session: session,
      name: fullName,
      phoneNumber: phoneNumber,
      email: recipientEmail,
      metadata: session.metadata,
    });
  } catch (error: any) {
    console.error('Error processing registration:', error.message);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing your registration. Please contact support.",
      error: error.message
    }, { status: 500 });
  }
}