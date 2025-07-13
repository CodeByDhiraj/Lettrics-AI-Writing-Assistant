"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const loadingMessages = {
  short: [
    "Analyzing incident details...",
    "Structuring your report layout...",
    "Summarizing key points...",
    "Finalizing the report...",
  ],
  medium: [
    "Analyzing incident details...",
    "Structuring your report layout...",
    "Writing context and summary...",
    "Organizing facts and findings...",
    "Adding tone and polish...",
    "Finalizing the report...",
  ],
  long: [
    "Analyzing incident details thoroughly...",
    "Structuring an in-depth report layout...",
    "Drafting the introduction and summary...",
    "Outlining the full context and findings...",
    "Polishing with tone and formatting...",
    "Ensuring accuracy and coherence...",
    "Applying final touches...",
    "Finalizing the report...",
  ],
}

export default function ReportLoadingPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("lettrics-form-data")
    if (!savedFormData) {
      router.push("/tools/report")
      return
    }

    const data = JSON.parse(savedFormData)
    setFormData(data)

    const lengthKey = data.length === "Short" ? "short" : data.length === "Long" ? "long" : "medium"
    const messages = loadingMessages[lengthKey]

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1
        }
        clearInterval(messageInterval)
        return prev
      })
    }, 1500)

    const generateContent = async () => {
      try {
        const response = await fetch("/api/gen_rep", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (result.success) {
          sessionStorage.setItem("lettrics-result", JSON.stringify({
            content: result.content,
            topic: data.topic,
            type: data.tool,
            timestamp: new Date().toISOString(),
          }))

          const historyItem = {
            id: Date.now(),
            type: data.tool,
            topic: data.topic,
            content: result.content,
            timestamp: new Date().toISOString(),
          }

          const history = JSON.parse(localStorage.getItem("lettrics-history") || "[]")
          history.unshift(historyItem)
          localStorage.setItem("lettrics-history", JSON.stringify(history.slice(0, 50)))

          setTimeout(() => {
            clearInterval(messageInterval)
            router.push("/tools/report/result")
          }, 2000)
        } else {
          throw new Error(result.error || "Failed to generate content")
        }
      } catch (error) {
        clearInterval(messageInterval)
        router.push("/tools/report?error=generation_failed")
      }
    }

    generateContent()

    return () => clearInterval(messageInterval)
  }, [router])

  if (!formData) return null

  const lengthKey = formData.length === "Short" ? "short" : formData.length === "Long" ? "long" : "medium"
  const messages = loadingMessages[lengthKey]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-stone-900 flex items-center justify-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-500/25 mx-auto"
            >
              <FileText className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-white to-yellow-300 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-orange-600" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-300 bg-clip-text text-transparent">
            {messages[currentMessageIndex]}
          </h1>

          <div className="w-64 h-2 mx-auto bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentMessageIndex + 1) / messages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-gray-400 text-lg">Generating your professional report...</p>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
