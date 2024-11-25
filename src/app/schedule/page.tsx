import { getFirestore, collection, getDocs, orderBy, query, getDoc, DocumentReference } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ScheduleTable from "@/app/schedule/scheduleTable"; // Client component
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import BlurFade from "@/components/ui/blur-fade";


// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

async function getTeamName(docRef: DocumentReference) {
  const doc = await getDoc(docRef)
  const data = doc.data() || {
    teamName: "N/A"
  }
  console.log(data.teamName);
  return (data.teamName as string);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// This is a Server Component that fetches the data
export default async function Schedule() {
  const col = collection(db, "Matches");
  const q = query(col, orderBy("kickOffTime"));
  const snap = await getDocs(q);

  // Map over the fetched data and resolve all Promises
  const matches = await Promise.all(
    snap.docs.map(async (doc) => {
      const data = doc.data();

      return {
        ...data,
        kickOffTime: data.kickOffTime.toDate(), // Convert Timestamp to Date
        teamOne: await getTeamName(data.teamOne), // Await the Promise
        teamTwo: await getTeamName(data.teamTwo), // Await the Promise
      };
    })
  );

  // Organize the matches by weeks
  const seasonStart = matches[0].kickOffTime;
  const weeks: any[][] = [];
  let index = 0;
  const date = new Date(seasonStart);

  matches.forEach((element) => {
    const matchDate = new Date(element.kickOffTime);
    const differenceInMs = matchDate.getTime() - date.getTime();
    const differenceInWeeks = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 7));

    if (differenceInWeeks >= 1) {
      for (let i = 0; i < differenceInWeeks; i++) {
        weeks[index] = weeks[index] || [];
        index++;
      }
      date.setDate(date.getDate() + differenceInWeeks * 7);
    }

    weeks[index] = weeks[index] || [];
    weeks[index].push(element);
  });

  const teamsSet = new Set<string>();
    weeks.forEach((week) => {
      week.forEach((match) => {
        teamsSet.add(match.teamOne);
        teamsSet.add(match.teamTwo);
      });
  });

  const teams = Array.from(teamsSet);
  console.table(teams)
  return (
    <div>
    <Header/>
    <BlurFade delay={0.1}>
      <section id="rankings" className="bg-green-800 py-20">
        <div className="container mx-auto px-4 bg-green-800 text-white">
        <h2 className="text-2xl font-bold">Gulf Legacy Football Schedule</h2>
        <br></br>
        <ScheduleTable weeks={weeks} teams={teams}/> {/* Pass serialized data to the Client Component */}
        </div>
      </section>
    </BlurFade>

    <Footer/>
    </div>
  );
}

