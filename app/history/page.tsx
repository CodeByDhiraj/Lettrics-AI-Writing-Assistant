"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Copy,
  Trash2,
  PenTool,
  BookOpen,
  Heart,
  Mail,
  FileText,
  GraduationCap,
  Briefcase,
  BarChart3,
  Bell,
  Edit3,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface HistoryItem {
  id: number
  type: string
  topic: string
  content: string
  timestamp: string
}

const typeIcons = {
  essay: {
    icon: PenTool,
    color: "text-orange-400 bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30",
  },
  story: {
    icon: BookOpen,
    color: "text-blue-400 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  },
  poem: { icon: Heart, color: "text-pink-400 bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30" },
  email: {
    icon: Mail,
    color: "text-yellow-400 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
  },
  paragraph: {
    icon: FileText,
    color: "text-purple-400 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30",
  },
  thesis: {
    icon: GraduationCap,
    color: "text-emerald-400 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  },
  application: {
    icon: Briefcase,
    color: "text-violet-400 bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-500/30",
  },
  report: {
    icon: BarChart3,
    color: "text-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30",
  },
  notice: { icon: Bell, color: "text-red-400 bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30" },
  content: { icon: Edit3, color: "text-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30" },
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [activeTab, setActiveTab] = useState("recent")
  const { toast } = useToast()

  useEffect(() => {
    const savedHistory = localStorage.getItem("lettrics-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const handleDelete = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem("lettrics-history", JSON.stringify(updatedHistory))
    toast({
      title: "Deleted",
      description: "Item removed from history.",
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getFilteredHistory = (type?: string) => {
    if (type && type !== "recent") {
      return history.filter((item) => item.type === type)
    }
    return history
  }

  const renderHistoryItem = (item: HistoryItem, index: number) => {
    const typeConfig = typeIcons[item.type as keyof typeof typeIcons]
    const IconComponent = typeConfig?.icon || FileText

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="p-4 mb-4 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm ${typeConfig?.color || "text-gray-400 bg-gray-700/50 border-gray-600/30"}`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white capitalize">{item.type.replace(/([A-Z])/g, " $1").trim()}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(item.content)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2 font-medium">{item.topic}</p>
              <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.content.substring(0, 120)}...</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {formatDate(item.timestamp)}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
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
        <div>
          <h1 className="text-xl font-bold text-white">History</h1>
          <p className="text-xs text-gray-400">Your writing journey</p>
        </div>
      </header>

      <div className="px-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
            <TabsTrigger
              value="recent"
              className="rounded-xl data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
            >
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="essay"
              className="rounded-xl data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
            >
              Essays
            </TabsTrigger>
            <TabsTrigger
              value="story"
              className="rounded-xl data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
            >
              Stories
            </TabsTrigger>
            <TabsTrigger
              value="application"
              className="rounded-xl data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
            >
              Apps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-0">
            {getFilteredHistory().length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50">
                  <Clock className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No history yet</h3>
                <p className="text-gray-400 mb-6">Start creating content to see your history here</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl">
                    Start Writing
                  </Button>
                </Link>
              </div>
            ) : (
              <div>{getFilteredHistory().map((item, index) => renderHistoryItem(item, index))}</div>
            )}
          </TabsContent>

          <TabsContent value="essay" className="mt-0">
            {getFilteredHistory("essay").length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
                  <PenTool className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No essays yet</h3>
                <p className="text-gray-400 mb-6">Create your first essay to see it here</p>
                <Link href="/tools/essay">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl">
                    Write Essay
                  </Button>
                </Link>
              </div>
            ) : (
              <div>{getFilteredHistory("essay").map((item, index) => renderHistoryItem(item, index))}</div>
            )}
          </TabsContent>

          <TabsContent value="story" className="mt-0">
            {getFilteredHistory("story").length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <BookOpen className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No stories yet</h3>
                <p className="text-gray-400 mb-6">Create your first story to see it here</p>
                <Link href="/tools/story">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl">
                    Write Story
                  </Button>
                </Link>
              </div>
            ) : (
              <div>{getFilteredHistory("story").map((item, index) => renderHistoryItem(item, index))}</div>
            )}
          </TabsContent>

          <TabsContent value="application" className="mt-0">
            {getFilteredHistory("application").length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-violet-500/30">
                  <Briefcase className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No applications yet</h3>
                <p className="text-gray-400 mb-6">Create your first application to see it here</p>
                <Link href="/tools/application">
                  <Button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white rounded-xl">
                    Write Application
                  </Button>
                </Link>
              </div>
            ) : (
              <div>{getFilteredHistory("application").map((item, index) => renderHistoryItem(item, index))}</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
