"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const loadingMessages = [
  "Preparing your application...",
  "Formatting the document...",
  "Customizing for your needs...",
  "Finalizing the content...",
  "Almost ready..."
]

export default function ApplicationLoadingPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("lettrics-form-data")
    if (!savedFormData) {
      router.push("/tools/application")
      return
    }

    const data = JSON.parse(savedFormData)
    setFormData(data)

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1
        return prev
      })
    }, 1500)

    const generateContent = async () => {
      try {
        const response = await fetch("/api/generate_app", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || "Generation failed")
        }

        // Store result
        sessionStorage.setItem(
          "lettrics-result",
          JSON.stringify({
            content: result.content,
            type: data.tool,
            category: data.category,
            timestamp: new Date().toISOString(),
          })
        )

        // Add to history
        const historyItem = {
          id: Date.now(),
          type: data.tool,
          category: data.category,
          applicationType: data.type,
          content: result.content,
          timestamp: new Date().toISOString(),
        }
        
        const history = JSON.parse(localStorage.getItem("lettrics-history") || "[]")
        history.unshift(historyItem)
        localStorage.setItem("lettrics-history", JSON.stringify(history.slice(0, 50)))

        // Navigate to result after short delay
        setTimeout(() => {
          clearInterval(messageInterval)
          router.push("/tools/application/result")
        }, 1000)

      } catch (error) {
        console.error("Generation error:", error)
        clearInterval(messageInterval)
        router.push("/tools/application?error=generation_failed")
      }
    }

    // Start generation after short delay
    const generationTimeout = setTimeout(generateContent, 500)

    return () => {
      clearInterval(messageInterval)
      clearTimeout(generationTimeout)
    }
  }, [router])

  if (!formData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-md">
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
              className="w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 mx-auto"
            >
              <FileText className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            {loadingMessages[currentMessageIndex]}
          </h1>

          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentMessageIndex + 1) / loadingMessages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-gray-400">
            Creating your {formData.type?.toLowerCase() || "application"}...
          </p>
        </motion.div>
      </div>
    </div>
  )
}