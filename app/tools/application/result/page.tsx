"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Copy, RotateCcw, Edit, Check, FileText, Sparkles, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ApplicationResultPage() {
  const [result, setResult] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedResult, setEditedResult] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const savedResult = sessionStorage.getItem("lettrics-result")
    if (!savedResult) {
      router.push("/tools/application")
      return
    }

    const data = JSON.parse(savedResult)
    setResult(data)
    setEditedResult(data.content)
  }, [router])

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedResult : result.content)
    toast({ title: "Copied!", description: "Application copied to clipboard." })
  }

  const handleRegenerate = () => {
    router.push("/tools/application")
  }

  const handleSaveEdit = () => {
    setResult({ ...result, content: editedResult })
    setIsEditing(false)
    toast({ title: "Saved!", description: "Your edits have been saved." })
  }

  if (!result) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <header className="relative z-10 flex items-center justify-between p-6 pt-12">
        <div className="flex items-center gap-4">
          <Link href="/tools/application">
            <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Application Complete</h1>
              <p className="text-sm text-gray-400">Your AI-generated application is ready</p>
            </div>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3">
            <Home className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <div className="relative z-10 px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="p-8 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-violet-400" />
                Generated Application
              </h3>
              <div className="flex gap-3">
                <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm" className="rounded-2xl bg-gray-700/50 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-600/50 px-4 py-2">
                  {isEditing ? <Check className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
                <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-2xl bg-gray-700/50 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-600/50 px-4 py-2">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleRegenerate} variant="outline" size="sm" className="rounded-2xl bg-gray-700/50 border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-600/50 px-4 py-2">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Application
                </Button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-700/30 rounded-2xl border border-gray-600/30">
              <p className="text-sm text-gray-400 mb-1">Application Type:</p>
              <p className="text-white font-medium">{result.type}</p>
            </div>

            {isEditing ? (
              <Textarea
                value={editedResult}
                onChange={(e) => setEditedResult(e.target.value)}
                className="min-h-[400px] bg-gray-700/50 border border-gray-600/50 text-white rounded-2xl resize-none focus:ring-2 focus:ring-violet-500/50 font-mono text-base leading-relaxed p-6"
              />
            ) : (
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                <Textarea
                  value={result.content}
                  readOnly
                  className="min-h-[400px] bg-transparent border-0 text-white rounded-2xl resize-none font-mono text-base leading-relaxed focus:ring-0"
                />
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
