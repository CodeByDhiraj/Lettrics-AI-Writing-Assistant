"use client"

import { motion } from "framer-motion"
import { PenTool, Zap } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <header className="relative z-10 flex items-center gap-4 p-6 pt-12">
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
            About Lettrics
          </h1>
          <p className="text-sm text-gray-400 font-medium">Who We Are</p>
        </div>
      </header>

      <main className="relative z-10 px-6 py-10 max-w-3xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 bg-gray-800/40 border border-gray-700/40 rounded-3xl p-8 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-white">Empowering Writers with AI</h2>
          <p className="text-gray-300">
            Lettrics AI is a modern writing assistant crafted for students, professionals, educators, marketers,
            and content creators. Our mission is simple: make writing easier, faster, and smarter.
          </p>
          <p className="text-gray-300">
            We offer intuitive tools for generating essays, stories, poems, emails, reports, and much more. With
            Lettrics, you can focus on creativity while we handle the structure, clarity, and tone.
          </p>
          <p className="text-gray-300">
            Unlike other platforms, Lettrics is designed to be lightweight, private-first, and accessible across
            both mobile and desktop. No logins, no unnecessary permissions, no data collection—just powerful AI
            writing at your fingertips.
          </p>
          <p className="text-gray-300">
            As we grow, we’re committed to continuously adding new tools, features, and styles to meet your
            evolving writing needs.
          </p>
          <p className="text-gray-300 font-medium">
            Thank you for being part of the Lettrics journey!
          </p>
        </motion.section>
      </main>
    </div>
  )
}