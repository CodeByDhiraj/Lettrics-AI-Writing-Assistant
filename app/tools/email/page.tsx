"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const CustomSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
  label,
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Label className="text-sm font-medium text-gray-300 mb-3 block">{label}</Label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4 text-left text-white hover:bg-gray-700/50 transition-all duration-200 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50"
        >
          <span className={value ? "text-white" : "text-gray-400"}>
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
          </span>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onValueChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default function EmailWriter() {
  const [purpose, setPurpose] = useState("")
  const [tone, setTone] = useState("")
  const [recipient, setRecipient] = useState("")
  const [context, setContext] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const toneOptions = [
    { value: "Professional", label: "Professional" },
    { value: "Friendly", label: "Friendly" },
    { value: "Formal", label: "Formal" },
    { value: "Casual", label: "Casual" },
    { value: "Persuasive", label: "Persuasive" },
  ]

  const recipientOptions = [
    { value: "Boss", label: "Boss" },
    { value: "Colleague", label: "Colleague" },
    { value: "Client", label: "Client" },
    { value: "Friend", label: "Friend" },
    { value: "General", label: "General" },
  ]

  const handleGenerate = () => {
    if (!purpose.trim()) {
      toast({
        title: "Purpose Required",
        description: "Please enter the purpose of your email.",
        variant: "destructive",
      })
      return
    }

    const formData = {
      tool: "email",
      topic: purpose.trim(),
      tone: tone || "Professional",
      recipient: recipient || "General",
      context: context,
    }

    sessionStorage.setItem("lettrics-form-data", JSON.stringify(formData))
    router.push("/tools/email/loading")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-4 p-6 pt-12">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-500/25">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Email Writer</h1>
            <p className="text-sm text-gray-400">Craft professional emails with AI</p>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="relative z-10 px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 mb-8 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl">
            <div className="space-y-8">
              <div>
                <Label htmlFor="purpose" className="text-sm font-medium text-gray-300 mb-3 block">
                  Email Purpose *
                </Label>
                <div className="relative">
                  <Input
                    id="purpose"
                    placeholder="What is this email about?"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-yellow-400/50" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomSelect
                  value={tone}
                  onValueChange={setTone}
                  placeholder="Select tone"
                  options={toneOptions}
                  label="Tone"
                />

                <CustomSelect
                  value={recipient}
                  onValueChange={setRecipient}
                  placeholder="Select recipient"
                  options={recipientOptions}
                  label="Recipient"
                />
              </div>

              <div>
                <Label htmlFor="context" className="text-sm font-medium text-gray-300 mb-3 block">
                  Additional Context (Optional)
                </Label>
                <Textarea
                  id="context"
                  placeholder="Any additional details or context..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 min-h-[100px] resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!purpose.trim()}
                className="w-full py-6 rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold text-lg shadow-2xl shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Generate Email
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
