"use client"

import React, { useState } from "react";
import Particles from "@/components/ui/particles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowBigUpDash, Loader2, Trophy } from 'lucide-react';
import Link from "next/link";

export default function Preorder() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('/api/preorder_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Success message from the server
      } else {
        setMessage(data.error || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting preorder email:', error);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div id="preorder" className="min-h-screen text-white flex flex-col items-center justify-center relative overflow-hidden">
      <Particles
        quantity={1000}
        ease={80}
        color="#ffffff"
        className="absolute inset-0"
        refresh
      />
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 font-serif">Gulf Legacy Football Leagues</h1>
        <p className="text-2xl">Get ready for the kick-off!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-200 backdrop-blur-md rounded-lg p-8 w-full max-w-md z-10"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-black text-lg font-semibold">
              Join the team
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 bg-white/20 text-black placeholder-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
        type="button"
        onClick={handleSubmit}
        className={`w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded ${
          loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2" />
        ) : (
          <Trophy className="mr-2" />
        )}
        {loading ? "Loading..." : "Get Updates"}
      </button>
      {message && (
        <p className="bg-gray-300 text-center px-2 py-2 rounded-lg text-black">
          {message}
        </p>
      )}
        </form>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-12 z-10"
      >
        <ArrowBigUpDash size={48} />
      </motion.div>
    </div>
  );
}

