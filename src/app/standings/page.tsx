import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import BlurFade from "@/components/ui/blur-fade";

import standingsPic from "@/images/standings.jpeg"
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

export default async function standings() {
  const teamsCollection = collection(db, 'Teams');
  const teamsSnapShot = await getDocs(teamsCollection);
  const tl = teamsSnapShot.docs.map(doc => doc.data());

  const teamsList = tl.filter(item => item.division != "-1" && item.division != undefined );

  teamsList.map((item) => {
    Object.defineProperty(item, "points", {value:item.matchesWon*3 + item.matchesDrawn})
    Object.defineProperty(item, "pointDifference", {value:item.goalsFor as number - item.goalsAgainst as number})
  });

  const divisionMap = new Map();
  for(const x of teamsList){
    if(x.division == undefined || x.division == -1) continue;
    if(divisionMap.get(x.division) != undefined){
      divisionMap.get(x.division).push(x)
    } else {
      divisionMap.set(x.division, [x])
    }
  }

  divisionMap.forEach((value) => {
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
    <div className="bg-background">
      {/* Header */}
      

     
      <div id="standingsPic">
      <Header transparent={true}/>
      <h2 className="text-4xl font-bold mb-8 text-center gradient-text-light">Team Standings</h2> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>

      <BlurFade delay={0.25}>
      <section id="rankings" className="bg-background py-20">
        <div className="container mx-auto px-4 text-secondary-foreground">
          <h2 className="text-xl font-bold mb-4">All Divisions</h2>
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
                <TableRow key={item.teamName+index} >
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
          <h2 className="text-xl font-bold mb-4 text-foreground">{division}</h2>
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
                  {index < 3 ? (
                    <>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell>{team.matchesPlayed}</TableCell>
                      <TableCell>{team.matchesWon}</TableCell>
                      <TableCell>{team.matchesLost}</TableCell>
                      <TableCell>{team.matchesDrawn}</TableCell>
                      <TableCell>{team.pointDifference}</TableCell>
                      <TableCell>{team.points}</TableCell>
                    </>
                  ) : (
                    <>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{team.teamName}</TableCell>
                    <TableCell>{team.matchesPlayed}</TableCell>
                    <TableCell>{team.matchesWon}</TableCell>
                    <TableCell>{team.matchesLost}</TableCell>
                    <TableCell>{team.matchesDrawn}</TableCell>
                    <TableCell>{team.pointDifference}</TableCell>
                    <TableCell>{team.points}</TableCell>
                    </>
                  )}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
        </div>
      </section>
      </BlurFade>
       {/* Rankings Section */}
      

      <Footer/>
    </div>
  );
}