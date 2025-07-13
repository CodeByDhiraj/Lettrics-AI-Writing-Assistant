"use client"

import { useState } from "react"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ApplicationWriter() {
  const [category, setCategory] = useState<"school" | "college" | "professional" | "">("")
  const [applicationType, setApplicationType] = useState("")
  const [receiver, setReceiver] = useState("")
  const [sender, setSender] = useState("")
  const [reason, setReason] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const applicationTypes = {
    school: [
      "Sick Leave",
      "Brother's Marriage Leave",
      "Sister's Marriage Leave",
      "Urgent Work Leave",
      "Out of Station",
      "Transfer Certificate",
      "Early Leave Request",
      "Half Day Leave",
    ],
    college: [
      "Medical Leave",
      "Exam Leave",
      "Fee Concession Request",
      "Bonafide Certificate Request",
      "Attendance Relaxation",
      "Hostel Leaving Permission",
    ],
    professional: [
      "Leave Application",
      "Casual Leave",
      "Sick Leave",
      "Annual Leave",
      "Job Transfer Request",
      "Promotion Request",
      "Resignation Letter",
    ],
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleGenerate = () => {
    // Trim all inputs
    const trimmedReceiver = receiver.trim()
    const trimmedSender = sender.trim()
    const trimmedReason = reason.trim()

    // Validate required fields
    if (!applicationType || !trimmedReceiver || !trimmedSender || !category) {
      toast({
        title: "Incomplete Details",
        description: "Please fill all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate field lengths
    if (trimmedReceiver.length > 100) {
      toast({
        title: "Receiver Title Too Long",
        description: "Please keep receiver title under 100 characters.",
        variant: "destructive",
      })
      return
    }

    if (trimmedSender.length > 100) {
      toast({
        title: "Name Too Long",
        description: "Please keep your name under 100 characters.",
        variant: "destructive",
      })
      return
    }

    // Prepare data for API
    const formData = {
      tool: "application",
      type: applicationType,
      category: capitalizeFirstLetter(category), // Ensure proper capitalization
      receiver: trimmedReceiver,
      name: trimmedSender, // Using 'name' instead of 'sender' to match API
      reason: trimmedReason,
    }

    // Store and navigate
    sessionStorage.setItem("lettrics-form-data", JSON.stringify(formData))
    router.push("/tools/application/loading")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="flex items-center gap-4 p-6 pt-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Application Writer</h1>
            <p className="text-xs text-gray-400">School, College, and Job Applications</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-24">
        <Card className="p-6 mb-6 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-xl space-y-6">
          {/* Category */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">Application Category *</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value as "" | "school" | "college" | "professional")
                setApplicationType("")
              }}
            >
              <SelectTrigger className="rounded-xl border-gray-600 bg-gray-700/50 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Application Type */}
          {category && (
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">Application Type *</Label>
              <Select value={applicationType} onValueChange={setApplicationType}>
                <SelectTrigger className="rounded-xl border-gray-600 bg-gray-700/50 text-white">
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {applicationTypes[category]?.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Receiver */}
          <div>
            <Label htmlFor="receiver" className="text-sm font-medium text-gray-300 mb-2 block">
              Receiver Title (Sir/Mam/Respected Principal) *
            </Label>
            <Input
              id="receiver"
              placeholder="e.g., Sir, Mam, Respected Principal..."
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500/50"
              maxLength={100}
            />
          </div>

          {/* Sender */}
          <div>
            <Label htmlFor="sender" className="text-sm font-medium text-gray-300 mb-2 block">
              Your Full Name *
            </Label>
            <Input
              id="sender"
              placeholder="Enter your full name..."
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500/50"
              maxLength={100}
            />
          </div>

          {/* Reason */}
          <div>
            <Label htmlFor="reason" className="text-sm font-medium text-gray-300 mb-2 block">
              Reason (Optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="Write additional context if needed..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 resize-none focus:ring-2 focus:ring-violet-500/50"
              maxLength={500}
            />
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium shadow-lg"
          >
            Generate Application
          </Button>
        </Card>
      </div>
    </div>
  )
}