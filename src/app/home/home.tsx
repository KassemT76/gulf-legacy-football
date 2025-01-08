'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import PulsatingButton from "@/components/ui/pulsating-button";
import Image from "next/image"
import Footer from "@/components/ui/footer";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from '@/images/logo.png'
import gif from '@/images/landing.gif'
import Header from "@/components/ui/header";

type AnimatedCounterProps = {
  target: string; // or string if it can be a string representation of a number
  duration?: number;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = typeof target === 'string' ? parseInt(target, 10) : target;
      const increment = (end / duration) * 10;
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, 10);
    }
  }, [target, duration, inView]);

  return <span ref={ref}>{count}</span>;
};

export default function HomePage({ upcomingMatches }: { upcomingMatches: any[] }){
  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      
      

      {/* Hero Section */}
      <motion.section
        className="pb-20 flex flex-col justify-start gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <Image className="absolute inset-0 w-auto md:w-full h-full object-cover -z-10" src={gif} alt="alt" width={200} height={2000} />
        {/* Header Section */} 
        <Header transparent={true}></Header>
        <div className="container my-10 mx-auto px-4 text-center z-10">
          <BlurFade delay={0.25}>
            <h2 id="picText2" className="text-4xl font-bold mb-4 italic">Welcome to Gulf Legacy Football Leauges</h2>
          </BlurFade>
          <BlurFade delay={0.5}>
            <p id="picTextp" className="text-xl mb-8">Organizing exciting football leagues in our community</p>
          </BlurFade>
          <BlurFade delay={0.75}>
            <div className="flex justify-center items-center">
              <Link href="/register">
              <PulsatingButton>Register Now!</PulsatingButton>
              </Link>
            </div>
          </BlurFade>
        </div>

      </motion.section>

      {/* About Us Section */}
      <BlurFade delay={0.1}>
        <section id="about" className="bg-background text-foreground py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold max-w-2xl mx-auto mb-8 text-left gradient-text-dark">Who We Are</h2>
            <p className="text-lg  max-w-2xl mx-auto text-left">
              OJ Football is dedicated to bringing our community together through the love of football. We organize and manage local football leagues, providing a platform for players of all skill levels to compete, have fun, and stay active.
            </p>
            {/* <div className="flex justify-around mt-12">
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2"><AnimatedCounter target="1000" /> +</h3>
                <p>Players</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2"><AnimatedCounter target="50" /> +</h3>
                <p>Teams</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2"><AnimatedCounter target="5" /></h3>
                <p>Leagues</p>
              </div>
            </div> */}
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <section id="services" className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-left gradient-text-light max-w-2xl mx-auto">Our Services</h2>
            <div className="grid grid-rows-1 gap-8">
              <BlurFade delay={0.25} inView>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card id="leaugePic" className="max-w-2xl mx-auto rounded-xl overflow-hidden">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <h2 className="text-lg font-bold text-left gradient-text-light">League Organization</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="w-full">
                      <p className="text-left">We create and manage football leagues for various age groups and skill levels.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 900 }}>
                  <Card id="refereePic" className="max-w-2xl mx-auto rounded-xl overflow-hidden">
                    <CardHeader className="w-full">
                      <CardTitle>
                      <h2 className="text-lg font-bold text-left gradient-text-light">Referee Services</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="w-full">
                      <p className="text-left">Our trained referees ensure fair play and adherence to rules during all matches.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.75} inView>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 100 }}>
                  <Card id="rentalPic" className="max-w-2xl mx-auto rounded-xl overflow-hidden">
                    <CardHeader className="w-full">
                      <CardTitle>
                        <h2 className="text-lg font-bold text-left gradient-text-light">Field Rentals</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>We provide access to well-maintained football fields for league games and practice sessions.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </BlurFade>
            </div>
          </div>
        </section>
      </BlurFade>

      {/* Upcoming Games Section */}
      <BlurFade delay={0.25} inView>
        <section id="upcomingGames" className="text-foreground bg-background py-20 px-4">
          <h2 className="text-3xl font-bold max-w-2xl mx-auto mb-8 text-left gradient-text-dark">Upcoming Games</h2>

          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="flex flex-col container align-middle justify-center items-center">
            {upcomingMatches != null
              ? upcomingMatches.map((item, idx) => {
                  const matchDate = new Date(item.kickOffTime); // Convert back to Date
                  return (
                    <Table
                    key={idx}
                    className="rounded-xl z-0 text-lg overflow-hidden my-4 bg-gradient-to-br from-green-100 to-green-50 shadow-xl max-w-2xl mx-auto border border-gray-200 table-fixed"
                  >
                    <TableHeader className="bg-gradient-to-r from-green-500 via-green-400 to-green-300 text-white">
                      <TableRow>
                        <TableHead className="py-3 px-4 text-center text-lg font-semibold">Team 1</TableHead>
                        <TableHead className="py-3 px-4"></TableHead>
                        <TableHead className="py-3 px-4 text-center text-lg font-semibold">Team 2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Teams Row */}
                      <TableRow className="bg-white hover:bg-green-50 transition-colors">
                        <TableCell className="py-3 px-4 text-gray-800">{item.teamOne}</TableCell>
                        <TableCell className="py-3 px-4 text-center text-gray-600">vs</TableCell>
                        <TableCell className="py-3 px-4 text-gray-800">{item.teamTwo}</TableCell>
                      </TableRow>

                      {/* Match Details Header */}
                      <TableRow className="bg-green-100 text-gray-700">
                        <TableHead className="py-3 px-4 text-center text-sm uppercase font-bold">Date</TableHead>
                        <TableHead className="py-3 px-4 text-center text-sm uppercase font-bold">Time</TableHead>
                        <TableHead className="py-3 px-4 text-center text-sm uppercase font-bold">Location</TableHead>
                      </TableRow>

                      {/* Match Details Row */}
                      <TableRow className="bg-white hover:bg-green-50 transition-colors">
                        <TableCell className="py-3 px-4 text-gray-800">
                          {matchDate.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-800">
                          {matchDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-800">{item.location}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  );
                })
              : null}
          </div>

            <Link href="./schedule">
              <Button className="shadow-xl rounded-xl">More Matches</Button>
            </Link>
          </div>
        </section>
      </BlurFade>

      {/* Registry */}
      <BlurFade delay={0.25} inView>
        <section id="teamPic">
          <div className="filter-none container mx-auto px-4 py-06 flex flex-col justify-between items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">Like what you see?</h2>
            <div className="flex flex-col justify-between items-center">
              <Link href="./register">
              <Button className="shadow-xl">Register for a team now!</Button>
              </Link>
            </div>
          </div>
        </section>
      </BlurFade>

      <Footer/>
    </div>
  );
}