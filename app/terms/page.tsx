"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6 pt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
        </div>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p>
            Welcome to Lettrics AI. By accessing or using our platform (website or mobile app), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use Lettrics AI.
          </p>

          <h2 className="text-lg font-semibold text-white">1. Use of the Service</h2>
          <p>
            Lettrics AI is a free-to-use AI writing assistant designed to help users generate written content such as essays, emails, stories, and more. Users are responsible for how they use the generated content.
          </p>

          <h2 className="text-lg font-semibold text-white">2. No Login or Data Collection</h2>
          <p>
            Lettrics AI does not require account creation or login. We do not collect, store, or share any personal data. All history is stored locally in your browser or app cache only.
          </p>

          <h2 className="text-lg font-semibold text-white">3. Content Responsibility</h2>
          <p>
            The AI-generated content is for educational, creative, and productivity purposes only. We do not guarantee the accuracy or appropriateness of generated content. You are solely responsible for how you use or share it.
          </p>

          <h2 className="text-lg font-semibold text-white">4. Intellectual Property</h2>
          <p>
            The Lettrics AI platform, UI, design, and branding are owned by the developer. You may not copy, reproduce, or distribute any part of the platform without permission.
          </p>

          <h2 className="text-lg font-semibold text-white">5. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use after changes indicates your acceptance of the updated terms.
          </p>

          <h2 className="text-lg font-semibold text-white">6. Google Play Compliance</h2>
          <p>
            This app complies with all policies and guidelines of Google Play, including policies regarding data privacy, AI content, and app behavior. It contains no harmful code, deceptive behavior, or user tracking.
          </p>

          <h2 className="text-lg font-semibold text-white">7. Contact</h2>
          <p>
            For any queries or concerns, you can reach us using the “Contact” feature inside the app or by visiting <a href="https://lettrics.com" className="underline text-blue-400">lettrics.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}