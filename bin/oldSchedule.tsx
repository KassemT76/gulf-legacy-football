"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useState } from "react";
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, getFirestore, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const firebaseConfig = {
  apiKey: "AIzaSyA5Jwp83nXftKs5xWU1SAqDN0WVB0WhNfc",
  authDomain: "gulflegacyfootball-b53c5.firebaseapp.com",
  projectId: "gulflegacyfootball-b53c5",
  storageBucket: "gulflegacyfootball-b53c5.appspot.com",
  messagingSenderId: "763099951900",
  appId: "1:763099951900:web:634b05b3d195057c2f00d9",
  measurementId: "G-44CTGST4L8"
};


// Initialize Firebase
const seasonStart = new Date('2024-09-22T11:00:00-04:00');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addMatch(
  kickOffTime: Date, 
  location: string, 
  scoreOne: number, 
  scoreTwo: number, 
  teamOne: string, 
  teamTwo: string
) {
  try {
    const teamOneRef = doc(db, "Teams", teamOne); 
    const teamTwoRef = doc(db, "Teams", teamTwo);
    
    const docRef = await addDoc(collection(db, "Matches"), {
      kickOffTime: Timestamp.fromDate(kickOffTime),   // Store timestamp (you may need to ensure it's in Firestore Timestamp format)
      location: location,
      scoreOne: scoreOne,
      scoreTwo: scoreTwo,
      teamOne: teamOneRef,  // Firestore reference to team one
      teamTwo: teamTwoRef   // Firestore reference to team two
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getMatches() {
  const col = collection(db, 'Matches');
  const q = query(col, orderBy("kickOffTime"));
  const snap = await getDocs(q);
  let teamsList = snap.docs.map(doc => doc.data());
  return teamsList;
}

async function getTeamName(docRef: DocumentReference) {
  let dummy = {
    teamName: "N/A"
  }
  let doc = await getDoc(docRef)
  let data = doc.data() || dummy
  // console.table(data)
  return data.teamName;
}

async function getTable() {
  let inv = await getMatches();

  let weeks: DocumentData[][] = [];
  let index = 0;
  let date = new Date(seasonStart);

  // Process and organize matches by weeks
  inv.forEach(element => {
    const matchDate = element.kickOffTime.toDate();
    const differenceInMs = matchDate.getTime() - date.getTime();
    const differenceInWeeks = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 7)); // Convert to full weeks

    if (differenceInWeeks >= 1) {
      for (let i = 0; i < differenceInWeeks; i++) {
        weeks[index] = weeks[index] || [];
        index++;
      }
      date.setDate(date.getDate() + differenceInWeeks * 7); // Move the reference date forward
    }

    weeks[index] = weeks[index] || [];
    weeks[index].push(element); // Add match to the correct week
  });

  let writeDate = new Date(seasonStart);

  // State to track the selected week
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Handle week selection
  const handleWeekSelection = (weekIndex: number) => {
    setSelectedWeek(weekIndex);
  };

  return (
    <div>
      <Label htmlFor="week-type">Select Week To View</Label>
      <Select onValueChange={(value) => handleWeekSelection(Number(value))}>
        <SelectTrigger id="week-type">
          <SelectValue placeholder="Select Week" />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((weekMatches, weekIndex) => (
            <SelectItem key={weekIndex} value={weekIndex.toString()}>
              Week {weekIndex + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedWeek !== null && (
        <div>
          <h2>Week {selectedWeek + 1} {writeDate.toDateString()}</h2>
          <p className="hidden">{writeDate.setDate(writeDate.getDate() + 7)}</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200">Team 1</TableHead>
                <TableHead className="bg-gray-200">Team 2</TableHead>
                <TableHead className="bg-gray-200">Team 1 Score</TableHead>
                <TableHead className="bg-gray-200">Team 2 Score</TableHead>
                <TableHead className="bg-gray-200">Date (DD/MM/YYYY)</TableHead>
                <TableHead className="bg-gray-200">Kick Off Time</TableHead>
                <TableHead className="bg-gray-200">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeks[selectedWeek].length > 0 ? (
                weeks[selectedWeek].map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="bg-gray-200">{getTeamName(item.teamOne)}</TableCell>
                    <TableCell className="bg-gray-200">{getTeamName(item.teamTwo)}</TableCell>
                    <TableCell>{item.scoreOne}</TableCell>
                    <TableCell>{item.scoreTwo}</TableCell>
                    <TableCell className="bg-gray-200">
                      {item.kickOffTime.toDate().toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className="bg-gray-200">
                      {item.kickOffTime.toDate().toLocaleTimeString("en-US", {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell className="bg-gray-200">{item.location}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="bg-gray-200">No matches this week</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}


export default function schedule() {
  return (
    <div>
      {/* Header */}
      <header className="background text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gulf Legacy Football</h1>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-stretch">
            <li className="w-full md:w-auto">
              <Link href="/" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Home
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/standings" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Standings
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/schedule" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Schedule
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/register" className="block w-full">
                <Button variant="secondary" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Register Now!
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
       {/* Rankings Section */}
      <section id="rankings" className="bg-muted py-20">
        <div className="container mx-auto px-4 bg-secondary text-secondary-foreground">
        <Label htmlFor="week-type">Select Week To View</Label>
          <Select>
            <SelectTrigger id="week-type">
              <SelectValue placeholder="Select Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </SelectContent>
          </Select>
          <h2 className="text-3xl font-bold mb-8 text-center">Schedule/Results</h2>
          {getTable()}
        </div>
      </section>
    </div>
  );
}