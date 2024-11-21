import React from "react";

import { getFirestore, collection, getDocs, orderBy, query} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { initializeApp } from "firebase/app";

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


// async function addPost(author: string, body: string, title: string) {
//   try {
//     const docRef = await addDoc(collection(db, "BlogPosts"), {
//       author: author,
//       body: body,
//       title: title,
//       date: Timestamp.fromDate(new Date()) // Current date and time in Firebase Timestamp format
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export default async function Blog() {
  const col = collection(db, "BlogPosts");
  const q = query(col, orderBy("date"));
  const snap = await getDocs(q);

  const posts = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      title: data.title,
      body: data.body,
      author: data.author,
      date: data.date.toDate(), // Convert Timestamp to Date
    };
  });

  console.table(posts)

  return (
    <div className="bg-green-800 text-white">
      <Header/>
      
      <div className="w-full py-20 px-4 bg-green-800 flex flex-col items-center">

      <h2 className="text-4xl">Blog</h2>

      <p className="my-1 text-gray-200">Get caught up with what is happening in football in our community and worldwide!</p>
      
      {posts.map((post) => (
            <Card key={post.title} className="container my-4">
            <CardHeader>
              <h1 className="text-3xl">{post.title}</h1>
              <div className="flex-row">
              <b>{post.author}</b> - <b>{post.date.toLocaleDateString()}</b>
              </div>
            </CardHeader>
            <CardContent>
              {post.body}
            </CardContent>
          </Card>
          ))}
      <Card className="container">
        <CardHeader>
          <h1 className="text-3xl">Title!</h1>
          <div className="flex-row">
          <b>Author</b> - <b>Date</b>
          </div>
        </CardHeader>
        <CardContent>
          Hello again!
        </CardContent>
      </Card>
      </div>

      <Footer/>
    </div>
  );
}
