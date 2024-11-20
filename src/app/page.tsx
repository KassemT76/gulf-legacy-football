import React, { useState, useEffect } from "react";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import HomePage from "./home";
import { initializeApp } from "firebase/app";
import { collection, DocumentReference, getDoc, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTeamName(docRef: DocumentReference) {
  let dummy = {
    teamName: "N/A"
  }
  let doc = await getDoc(docRef)
  let data = doc.data() || dummy
  return data.teamName;
}

export default async function Home() {
  const col = collection(db, "Matches");
  const q = query(col, orderBy("kickOffTime"), limit(3));
  const snap = await getDocs(q);
  
  // Map over the fetched data and convert Firestore Timestamps and DocumentReferences to plain objects
  const matches = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      kickOffTime: data.kickOffTime.toDate(), // Convert Timestamp to Date
      teamOne: getTeamName(data.teamOne), // Get team name from DocumentReference
      teamTwo: getTeamName(data.teamTwo), // Get team name from DocumentReference
    };
  });
  return (
    <div className="min-h-screen background text-foreground">
      <HomePage upcomingMatches={matches}></HomePage>
    </div>
  );
}