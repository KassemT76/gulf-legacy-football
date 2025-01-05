'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Header from "@/components/ui/header"
import Footer from '@/components/ui/footer'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import BlurFade from '@/components/ui/blur-fade'

export default function Register() {
  const [registrationType, setRegistrationType] = useState<'team' | 'individual'>('team')
  const [email, setEmail] = useState('')
  const [teamName, setTeamName] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [teamPos, setTeamPos] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationType,
          email,
          phoneNumber,
          teamName,
          teamPos,
          fullName,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        console.log(data.url);
        window.location.href = data.url
        const q = new URLSearchParams(window.location?.search);
        const s = q.get('canceled');

        console.log(s);

      } else {
        console.error('Error:', data.error || "An unexpected error occurred. Please try again.")
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location?.search)
    const c = q.get('canceled');
 
    if(c === "true"){
      setFailed(true);
    }
  }, [])


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/25">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        {isFailed && (
          <BlurFade delay={0.1}>
              <Alert className='bg-red-700 my-4'>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Stripe Payment Cancelled!</AlertTitle>
            <AlertDescription>
              If you did not mean to cancel payment, please try again. If this problem persisists, please feel free to contact us!
            </AlertDescription>
          </Alert>
          </BlurFade>
          
        )}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">League Registration</CardTitle>
            <CardDescription>Sign up for an Gulf Legacy Football league</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="registration-type">Registration Type</Label>
                <RadioGroup 
                  defaultValue="team" 
                  onValueChange={(value) => setRegistrationType(value as 'team' | 'individual')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team - 100AED</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual - 50AED</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Enter your name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <PhoneInput
                    inputProps={{
                      id: 'phoneNumber',
                      name: 'phoneNumber',
                      required: true,
                    }}
                    country={'ca'}
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    inputStyle={{
                      width: '100%',
                      height: '40px',
                      fontSize: '16px',
                      paddingLeft: '48px',
                    }}
                  />
                </div>
              </div>

              {registrationType === 'team' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Team Information</h2>
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input 
                      id="teamName" 
                      name="teamName" 
                      placeholder="Enter your team name" 
                      value={teamName} 
                      onChange={(e) => setTeamName(e.target.value)} 
                      required
                    />
                  </div>
                </div>
              )}
              
              {registrationType === 'individual' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Player Information</h2>
                  <div className="space-y-2">
                    <Label htmlFor="teamPos">Team Position</Label>
                    <Select
                      required
                      name="teamPos"
                      onValueChange={(value) => setTeamPos(value)}
                    >
                      <SelectTrigger id="teamPos-select">
                        <SelectValue placeholder="Select Position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                        <SelectItem value="Centre Back">Centre Back</SelectItem>
                        <SelectItem value="Left Back">Left Back</SelectItem>
                        <SelectItem value="Right Back">Right Back</SelectItem>
                        <SelectItem value="Sweeper">Sweeper</SelectItem>
                        <SelectItem value="Defensive Midfielder">Defensive Midfielder</SelectItem>
                        <SelectItem value="Central Midfielder">Central Midfielder</SelectItem>
                        <SelectItem value="Attacking Midfielder">Attacking Midfielder</SelectItem>
                        <SelectItem value="Left Winger">Left Winger</SelectItem>
                        <SelectItem value="Right Winger">Right Winger</SelectItem>
                        <SelectItem value="Striker">Striker</SelectItem>
                        <SelectItem value="Second Striker">Second Striker</SelectItem>
                        <SelectItem value="False 9">False 9</SelectItem>
                        <SelectItem value="Wing Back (Left)">Wing Back (Left)</SelectItem>
                        <SelectItem value="Wing Back (Right)">Wing Back (Right)</SelectItem>
                      </SelectContent>
                    </Select>

                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : `Register ${registrationType === 'team' ? 'Team' : 'Individual'}`}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}