import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore, addDoc, DocumentData, orderBy, query } from 'firebase/firestore/lite';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Get a list of teams from our database
async function addTeam(teamName: string, division: string, matchesWon: number, matchesPlayed: number, matchesLost: number, matchesDrawn: number, goalsFor: number, goalsAgainst: number) {
  try {
    const docRef = await addDoc(collection(db, "Teams"), {
      teamName: teamName,
      division: division, 
      matchesPlayed: matchesPlayed, 
      matchesWon: matchesWon, 
      matchesLost: matchesLost, 
      matchesDrawn: matchesDrawn, 
      goalsFor: goalsFor, 
      goalsAgainst: goalsAgainst
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default async function standings() {
  const teamsCollection = collection(db, 'Teams');
  const teamsSnapShot = await getDocs(teamsCollection);
  let tl = teamsSnapShot.docs.map(doc => doc.data());
  
  const teamsList = tl.filter(item => item.division != "-1" && item.division != undefined );

  teamsList.map((item) => {
    Object.defineProperty(item, "points", {value:item.matchesWon*3 + item.matchesDrawn})
    Object.defineProperty(item, "pointDifference", {value:item.goalsFor as number - item.goalsAgainst as number})
  });

  var divisionMap = new Map();
  for(let x of teamsList){
    console.log(divisionMap.get(x.division))
    if(x.division == undefined || x.division == -1) continue;
    if(divisionMap.get(x.division) != undefined){
      divisionMap.get(x.division).push(x)
    } else {
      divisionMap.set(x.division, [x])
    }
  }

  console.log(divisionMap)

  divisionMap.forEach((value, key) => {
    value.sort(function(a: any, b: any){  
      if(a.points > b.points){
        return -1;
      } else if(a.points < b.points){
        return 1;
      } else {
        if(a.pointDifference > b.pointDifference){
          return -1;
        } else {
          return 1;
        }
      }
    });
    
  });

  teamsList.sort(function(a: any, b: any){  
    if(a.points > b.points){
      return -1;
    } else if(a.points < b.points){
      return 1;
    } else {
      if(a.pointDifference > b.pointDifference){
        return -1;
      } else {
        return 1;
      }
    }
  });

  return (
    <div>
      {/* Header */}
      <Header/>
       {/* Rankings Section */}
      <section id="rankings" className="bg-green-800 py-20">
        <div className="container mx-auto px-4 bg-green-800 text-secondary-foreground">
          <h2 className="text-3xl text-white font-bold mb-8 text-center">Team Standings</h2> 
          <h2 className="text-xl font-bold mb-4 text-white">All Divisions</h2>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Played</TableHead>
              <TableHead>Won</TableHead>
              <TableHead>Lost</TableHead>
              <TableHead>Drawn</TableHead>
              <TableHead>+/-</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
              teamsList.map((item,index) => { 
                return (
                <TableRow >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.teamName}</TableCell>
                <TableCell>{item.matchesPlayed}</TableCell>
                <TableCell>{item.matchesWon}</TableCell>
                <TableCell>{item.matchesLost}</TableCell>
                <TableCell>{item.matchesDrawn}</TableCell>
                <TableCell>{item.pointDifference as string}</TableCell>
                <TableCell>{item.points}</TableCell>
                </TableRow>
              );
            }
          )
          }
          </TableBody>
        </Table>

        {Array.from(divisionMap.entries()).map(([division, teamList]) => (
        <div key={division} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">{division}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Played</TableHead>
                <TableHead>Won</TableHead>
                <TableHead>Lost</TableHead>
                <TableHead>Drawn</TableHead>
                <TableHead>+/-</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamList.map((team: any, index: any) => (
                <TableRow key={team.teamName}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{team.teamName}</TableCell>
                  <TableCell>{team.matchesPlayed}</TableCell>
                  <TableCell>{team.matchesWon}</TableCell>
                  <TableCell>{team.matchesLost}</TableCell>
                  <TableCell>{team.matchesDrawn}</TableCell>
                  <TableCell>{team.pointDifference}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
}

/*
Page for scoreboard.


Page for Schedule/Results

Match class:

Division
Kick off time
Teams
Scores
Location

Team class docName: TeamName:


Matches
Won
Lost
Drawn
GoalsFor
GoalsAgainst
Division

Calculate CLient Side:

GoalsDifference
Points



Register page


*/