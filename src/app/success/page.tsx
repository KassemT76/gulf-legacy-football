'use client'

import { useEffect, useState, useRef } from 'react'
import { Loader2, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { metadata } from '../layout';

export default function SuccessPage() {
  const [sessionDetails, setSessionDetails] = useState<any>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const q = new URLSearchParams(window.location?.search)
    const s = q.get('session_id')
    const t = q.get('type')

    setType(t)

    if (!s) {
      setError('Session ID not found in URL.')
      setIsLoading(false)
      return
    }

    fetch(`/api/sessions?session_id=${s}&type=${t}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          setSessionDetails(data)
          setMessage(data.message)
        } else {
          setError(data.message || 'An unexpected error occurred.')
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching session details:', error)
        setError('Failed to fetch session details. Please try again later.')
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                {isLoading ? (
                  'Processing Your Registration'
                ) : error ? (
                  'Oops! Something went wrong'
                ) : (
                  'Registration Successful!'
                )}
              </CardTitle>
              <CardDescription className="text-center">
                {isLoading ? 'Please wait while we confirm your details' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-green-600" />
                  <p className="mt-4 text-lg">Loading session details...</p>
                </div>
              ) : error ? (
                <div className="text-center p-8">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-lg text-red-500">{error}</p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : (
                !isLoading && !error && sessionDetails && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <p className="text-center text-lg">{message}</p>
                    {sessionDetails.metadata && (
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        <h2 className="font-semibold text-xl mb-2">Personal Information</h2>
                        <p>Full Name: {sessionDetails.name}</p>
                        <p>Email: {sessionDetails.email}</p>
                        <p>Phone Number: {sessionDetails.phoneNumber}</p>
                      </div>
                    )}
                    {sessionDetails.metadata && (
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        {type === 'team' ? (
                          <>
                            <h2 className="font-semibold text-xl mb-2">Team Registration Details</h2>
                            <p>Team Name: {sessionDetails.metadata.teamName}</p>
                          </>
                        ) : type === 'individual' ? (
                          <>
                            <h2 className="font-semibold text-xl mb-2">Individual Registration Details</h2>
                            <p>Team Position: {sessionDetails.metadata.teamPos}</p>
                          </>
                        ) : null}
                      </div>
                    )}

                    <div className="text-center">
                      <p className="font-semibold mb-2">What&apos;s Next?</p>
                      <p>We&apos;ll send a confirmation email with further details about the event and your registration.</p>
                      <p>Please check your inbox (and spam folder) for this important information.</p>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">If you have any questions or concerns, please don&apos;t hesitate to reach out:</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href="tel:+16478064618" className="hover:underline">(647) 806-4618</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:oj@ojfootball.com" className="hover:underline">oj@ojfootball.com</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}