"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, MessageCircle, User, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      })
      return
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          feedback,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your feedback. We'll get back to you soon.",
        })
        setName("")
        setEmail("")
        setFeedback("")
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="flex items-center gap-4 p-6 pt-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Contact Us</h1>
            <p className="text-xs text-gray-400">We'd love to hear from you</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <Send className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
              <p className="text-gray-400">
                Share your thoughts, suggestions, or report any issues. Your feedback helps us improve Lettrics.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="feedback" className="text-sm font-medium text-gray-300 mb-2 block">
                  Your Message *
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what's on your mind..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px] border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 rounded-xl resize-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={isLoading || !name.trim() || !email.trim() || !feedback.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Send className="w-5 h-5 mr-2 animate-pulse" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>

            <div className="mt-8 p-6 bg-gray-700/30 rounded-2xl border border-gray-600/30">
              <h3 className="font-medium text-white mb-3">💡 Quick Tips:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Be specific about any issues you're experiencing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Include suggestions for new features or improvements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Let us know what you love about Lettrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  We typically respond within 24-48 hours
                </li>
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
