"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Sparkles,
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
  Grid3X3,
  List,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const tools = [
  {
    id: "essay",
    title: "Essay Writer",
    description: "Academic & persuasive essays",
    icon: PenTool,
    gradient: "from-orange-400 via-red-400 to-pink-400",
    bgGradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
    borderGradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    href: "/tools/essay",
  },
  {
    id: "story",
    title: "Story Writer",
    description: "Creative storytelling",
    icon: BookOpen,
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    bgGradient: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    borderGradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    href: "/tools/story",
  },
  {
    id: "poem",
    title: "Poem Writer",
    description: "Beautiful poetry creation",
    icon: Heart,
    gradient: "from-pink-400 via-rose-400 to-red-400",
    bgGradient: "from-pink-500/10 via-rose-500/10 to-red-500/10",
    borderGradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
    href: "/tools/poem",
  },
  {
    id: "email",
    title: "Email Writer",
    description: "Professional emails",
    icon: Mail,
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    bgGradient: "from-yellow-500/10 via-orange-500/10 to-red-500/10",
    borderGradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20",
    href: "/tools/email",
  },
  {
    id: "paragraph",
    title: "Paragraph Writer",
    description: "Structured paragraphs",
    icon: FileText,
    gradient: "from-purple-400 via-violet-400 to-indigo-400",
    bgGradient: "from-purple-500/10 via-violet-500/10 to-indigo-500/10",
    borderGradient: "from-purple-500/20 via-violet-500/20 to-indigo-500/20",
    href: "/tools/paragraph",
  },
  {
    id: "thesis",
    title: "Thesis Statement",
    description: "Academic thesis writing",
    icon: GraduationCap,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    bgGradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    borderGradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    href: "/tools/thesis",
  },
  {
    id: "application",
    title: "Application Writer",
    description: "Job applications & CVs",
    icon: Briefcase,
    gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
    bgGradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
    borderGradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    href: "/tools/application",
  },
  {
    id: "report",
    title: "Report Writer",
    description: "Business & research reports",
    icon: BarChart3,
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    bgGradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    borderGradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    href: "/tools/report",
  },
  
  {
    id: "content",
    title: "Content Writer",
    description: "Web & marketing content",
    icon: Edit3,
    gradient: "from-cyan-400 via-blue-400 to-indigo-400",
    bgGradient: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
    borderGradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    href: "/tools/content",
  },
]

const suggestions = [
  "Write a persuasive essay about climate change",
  "Create a short story about time travel",
  "Compose a poem about friendship",
  "Draft a professional email to a client",
  "Write a job application letter",
  "Create a business report summary",
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isGridView, setIsGridView] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 pt-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Lettrics
            </h1>
            <p className="text-sm text-gray-400 font-medium">AI Writing Assistant</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/10"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Suggest</span>
          </Button>
        </motion.div>
      </header>

      {/* Search Bar */}
      <div className="relative z-20 px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl" />
          <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-1">
            <div className="flex items-center">
              <Search className="ml-4 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Ask me anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-gray-400 focus:ring-0 text-lg px-4 py-4"
              />
              {searchQuery && (
                <Button
                  size="sm"
                  className="mr-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-2xl px-4"
                >
                  Search
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Suggestions Dropdown - Fixed positioning */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl z-50"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                Suggestions
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-4 rounded-2xl hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all text-sm border border-transparent hover:border-gray-600/50"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tools Section */}
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Writing Tools</h2>
            <p className="text-gray-400">Choose your perfect writing companion</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-700/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsGridView(true)}
              className={`p-3 rounded-xl transition-all ${
                isGridView
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsGridView(false)}
              className={`p-3 rounded-xl transition-all ${
                !isGridView
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Tools Grid/List */}
        <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" : "space-y-4 mb-8"}>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link href={tool.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden rounded-3xl border border-gray-700/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ${
                    isGridView ? "p-8" : "p-6 flex items-center gap-6"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${tool.bgGradient.replace("from-", "rgba(").replace("via-", ", rgba(").replace("to-", ", rgba(").replace("/10", ", 0.1)")})`,
                  }}
                >
                  {/* Gradient Border Effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${tool.borderGradient.replace("from-", "rgba(").replace("via-", ", rgba(").replace("to-", ", rgba(").replace("/20", ", 0.2)")})`,
                      padding: "1px",
                    }}
                  >
                    <div className="w-full h-full rounded-3xl bg-gray-900/90" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <div className={`flex items-center gap-4 ${isGridView ? "mb-6" : ""}`}>
                      <div
                        className={`rounded-2xl p-4 ${isGridView ? "w-16 h-16" : "w-14 h-14"} flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 group-hover:scale-110 transition-transform duration-300`}
                      >
                       <div
  className={`${
    isGridView ? "w-8 h-8" : "w-7 h-7"
  } flex items-center justify-center rounded-xl bg-gradient-to-r ${
    tool.id === "essay"
      ? "from-orange-400 to-pink-400"
      : tool.id === "story"
      ? "from-blue-400 to-teal-400"
      : tool.id === "poem"
      ? "from-pink-400 to-red-400"
      : tool.id === "email"
      ? "from-yellow-400 to-orange-400"
      : tool.id === "paragraph"
      ? "from-purple-400 to-indigo-400"
      : tool.id === "thesis"
      ? "from-emerald-400 to-cyan-400"
      : tool.id === "application"
      ? "from-violet-400 to-fuchsia-400"
      : tool.id === "report"
      ? "from-green-400 to-emerald-400"
      : tool.id === "notice"
      ? "from-red-400 to-rose-400"
      : tool.id === "content"
      ? "from-cyan-400 to-blue-400"
      : "from-gray-400 to-gray-600"
  }`}
>
  <tool.icon className="w-5 h-5 text-white" />
</div>
                      </div>
                      {!isGridView && (
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{tool.title}</h3>
                          <p className="text-gray-400">{tool.description}</p>
                        </div>
                      )}
                    </div>

                    {isGridView && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                        <p className="text-gray-400 mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">AI-powered</span>
                          <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                            <span className="text-gray-400 group-hover:text-white text-lg">→</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isGridView && (
                      <div className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                        <span className="text-gray-400 group-hover:text-white text-xl">→</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms</p>
            <Button
              onClick={() => setSearchQuery("")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-2xl px-6 py-3"
            >
              Clear Search
            </Button>
          </motion.div>
        )}
      </div>

      {/* Click outside to close suggestions */}
      {showSuggestions && <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />}
    </div>
  )
}
