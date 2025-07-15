"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Lock, Info, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="space-y-8 bg-gray-900/70 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50">
          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-orange-400" />
              Introduction
            </h2>
            <p className="text-gray-300 mt-2">
              Lettrics AI respects your privacy and is committed to protecting it. This privacy policy outlines how we handle user data in full compliance with Google Play Console requirements and privacy best practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lock className="w-6 h-6 text-pink-400" />
              No Personal Data Collection
            </h2>
            <p className="text-gray-300 mt-2">
              We do <strong>not collect, store, or share</strong> any personal information. The app runs entirely client-side and all generated content and history is stored only on the user's local cache.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-400" />
              Data Handling Practices
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li>No login or sign-up is required.</li>
              <li>No permissions (camera, contacts, location, etc.) are requested.</li>
              <li>We do not transmit any data to our servers.</li>
              <li>Your writing history is saved locally on your device only.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              Third-Party Services
            </h2>
            <p className="text-gray-300 mt-2">
              Lettrics AI does not use any third-party services (e.g., analytics, ads, crash reporting) that collect user data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Info className="w-6 h-6 text-yellow-400" />
              Changes to Policy
            </h2>
            <p className="text-gray-300 mt-2">
              We may update this policy in the future. If we make changes, we will update the effective date and notify users within the app or on our official site: <a href="https://lettrics.com" className="text-orange-400 underline">https://lettrics.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Mail className="w-6 h-6 text-teal-400" />
              Contact Us
            </h2>
            <p className="text-gray-300 mt-2">
              If you have any questions about this privacy policy, feel free to contact us at:
              <br />
              <a href="mailto:lettricsai@gmail.com" className="text-teal-300 underline">lettricsai@gmail.com</a>
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-6">Effective Date: July 15, 2025</div>
        </div>
      </motion.div>
    </div>
  )
}