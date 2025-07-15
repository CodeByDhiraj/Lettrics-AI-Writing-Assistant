"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Copy,
  RotateCcw,
  Edit,
  Check,
  PenTool,
  Sparkles,
  Home,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function EssayResultPage() {
  const [result, setResult] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedResult, setEditedResult] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const savedResult = sessionStorage.getItem("lettrics-result")
    if (!savedResult) {
      router.push("/tools/essay")
      return
    }

    const data = JSON.parse(savedResult)
    setResult(data)
    setEditedResult(data.content)
  }, [router])

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedResult : result.content)
    toast({ title: "Copied!", description: "Essay copied to clipboard." })
  }

  const handleRegenerate = () => {
    router.push("/tools/essay")
  }

  const handleSaveEdit = () => {
    setResult({ ...result, content: editedResult })
    setIsEditing(false)
    toast({ title: "Saved!", description: "Your edits have been saved." })
  }

  if (!result) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-stone-900 text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 pt-12">
        <div className="flex items-center gap-4">
          <Link href="/tools/essay">
            <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Essay Ready</h1>
              <p className="text-sm text-gray-400">Your AI-generated essay is below</p>
            </div>
          </div>
        </div>

        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3">
            <Home className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      {/* Main */}
      <div className="relative z-10 px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 sm:p-8 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl w-full max-w-5xl mx-auto">
            {/* Action Icons */}
            <div className="flex items-center justify-end gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="text-white hover:bg-white/10">
                {isEditing ? <Check className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="text-white hover:bg-white/10">
                <Copy className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleRegenerate} className="text-white hover:bg-white/10">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Essay Result */}
            {isEditing ? (
              <Textarea
                value={editedResult}
                onChange={(e) => setEditedResult(e.target.value)}
                className="min-h-[60vh] h-[70vh] bg-gray-700/50 border border-gray-600/50 text-white rounded-2xl resize-none focus:ring-2 focus:ring-orange-500/50 font-serif text-lg leading-relaxed p-6"
              />
            ) : (
              <div className="whitespace-pre-wrap font-serif text-base sm:text-lg leading-relaxed p-1">
                {result.content}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Bottom Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/tools/essay">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl px-8 py-3 font-medium">
              Write Another Essay
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-2xl px-8 py-3 font-medium">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
