'use client'
import React from "react";

// Import the functions you need from the SDKs you need
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import BlurFade from "@/components/ui/blur-fade";

export default function Guidelines() {
  return (
    <div className="bg-background text-foreground flex flex-col ">
      <Header/>
      <BlurFade delay={0.25}>
      <div className="container px-10 py-20 px-flex flex-col items-center mx-auto">
        {/* Guidelines Section */}
        <h1 className="text-3xl font-bold mb-8 text-left">Guidelines</h1>

        <div className="container mx-auto py-8 px-4">
          <ul className="list-disc space-y-6">
            <li>
              <h3 className="text-xl font-bold text-foreground">Commitment to Excellence</h3>
              <p className="text-secondary-foreground">
                We strive to deliver top-tier football experiences by continuously improving our leagues, ensuring that every participant enjoys a professional environment.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Sportsmanship and Fair Play</h3>
              <p className="text-secondary-foreground">
                Upholding integrity on and off the field is key. Players, coaches, and staff are expected to respect the rules and promote a positive atmosphere.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Inclusivity</h3>
              <p className="text-secondary-foreground">
                Gulf Legacy Football welcomes players of all backgrounds, skill levels, and ages. We aim to create a diverse and welcoming community for everyone.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Safety First</h3>
              <p className="text-secondary-foreground">
                The health and safety of our players, referees, and spectators is our top priority. We enforce strict safety protocols during all events.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Community Building</h3>
              <p className="text-secondary-foreground">
                Our leagues are designed to foster camaraderie and teamwork. We believe that football can unite people and strengthen community bonds.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Respect for All</h3>
              <p className="text-secondary-foreground">
                We maintain an environment of respect for teammates, opponents, referees, and fans. Discrimination, bullying, or unsportsmanlike behavior is not tolerated.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Development and Growth</h3>
              <p className="text-secondary-foreground">
                Gulf Legacy Football encourages player development and growth. We provide opportunities for players to hone their skills and reach their potential.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Innovation in Football</h3>
              <p className="text-secondary-foreground">
                We embrace new technologies and strategies to improve player experiences, from league management software to training techniques.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Environmental Responsibility</h3>
              <p className="text-secondary-foreground">
                We aim to minimize our environmental impact by promoting sustainability in our operations, from eco-friendly field maintenance to waste reduction at events.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Giving Back</h3>
              <p className="text-secondary-foreground">
                We are committed to giving back to the community. Gulf Legacy Football organizes charity events and partners with local organizations to support social causes.
              </p>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <h1 className="text-3xl font-bold mb-4 text-left">FAQ</h1>

        <div className="container mx-auto py-8 px-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">Is Gulf Legacy Football open to all ages and skill levels?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                Yes, Gulf Legacy Football welcomes players of all ages and skill levels. We have different leagues and divisions to suit everyone, from beginners to advanced players.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">How can I register for a team or league?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">You can register for a team or league through our website. Simply visit the &quot;Register&quot; section, choose your preferred league, and complete the registration form.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">What safety protocols are in place during matches?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">Safety is our top priority. We ensure that all players wear appropriate gear, follow health guidelines, and we have medical staff on site during matches. We also enforce strict safety protocols for COVID-19.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">Can I join as an individual player?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                Yes! If you don&apos;t have a team, you can register as an individual player and we will place you on a team that suits your skill level.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">What types of leagues do you offer?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                We offer various types of leagues including men&apos;s, women&apos;s, and mixed divisions. We also have recreational and competitive leagues to match different playing preferences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">How are games officiated?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                All our games are officiated by trained referees who ensure fair play and adherence to the rules. They are there to maintain a safe and competitive environment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">Do you provide training or coaching services?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                While Gulf Legacy Football primarily focuses on organizing leagues, we do have partnerships with local coaches and training programs to help players improve their skills.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">What is the format of the leagues?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                Our leagues follow various formats, such as 11-a-side, 7-a-side, and 5-a-side. We offer different formats depending on the division and the number of players involved.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">How do I find out when my team is playing?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                The schedule for all matches is posted on our website under the &quot;Schedule&quot; section. You can also receive updates via email or our official app.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-xl font-bold text-foreground text-left">How can I get involved if I don&apos;t want to play?</AccordionTrigger>
              <AccordionContent className="text-secondary-foreground">
                We offer various ways to get involved, from volunteering and officiating to sponsoring teams or events. You can reach out to us through our contact page to learn more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      </BlurFade>
      <Footer/>
    </div>
  );
}
