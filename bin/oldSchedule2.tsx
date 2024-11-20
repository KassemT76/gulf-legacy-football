import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ScheduleTable from "@/app/schedule/scheduleTable"; // Client component
import { Button } from "@/components/ui/button";
import Link from 'next/link';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Jwp83nXftKs5xWU1SAqDN0WVB0WhNfc",
  authDomain: "gulflegacyfootball-b53c5.firebaseapp.com",
  projectId: "gulflegacyfootball-b53c5",
  storageBucket: "gulflegacyfootball-b53c5.appspot.com",
  messagingSenderId: "763099951900",
  appId: "1:763099951900:web:634b05b3d195057c2f00d9",
  measurementId: "G-44CTGST4L8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// This is a Server Component that fetches the data
export default async function Schedule() {
  const col = collection(db, "Matches");
  const q = query(col, orderBy("kickOffTime"));
  const snap = await getDocs(q);
  
  // Map over the fetched data and convert Firestore Timestamps and DocumentReferences to plain objects
  const matches = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      kickOffTime: data.kickOffTime.toDate(), // Convert Timestamp to ISO string
      teamOne: data.teamOne.id, // Get team ID from DocumentReference
      teamTwo: data.teamTwo.id, // Get team ID from DocumentReference
    };
  });

  // Organize the matches by weeks
  const seasonStart = new Date("2024-09-22T11:00:00-04:00");
  let weeks: any[][] = [];
  let index = 0;
  let date = new Date(seasonStart);

  matches.forEach((element) => {
    const matchDate = new Date(element.kickOffTime); // Now a string, convert back to Date
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

  return (
    <div>
      <header className="bg-green-950 text-primary-foreground shadow-md">
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
    <section id="rankings" className="bg-muted py-20">
        <div className="container mx-auto px-4 bg-secondary text-secondary-foreground">
        <h1 className="text-2xl font-bold">Gulf Legacy Football Schedule</h1>
        <ScheduleTable weeks={weeks} /> {/* Pass serialized data to the Client Component */}
        </div>
      </section>
    </div>
  );
}

