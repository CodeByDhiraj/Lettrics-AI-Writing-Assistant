"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, PenTool } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-4 text-left text-white hover:bg-gray-700/50 transition-all duration-200"
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

export default function ContentWriter() {
  const [topic, setTopic] = useState("")
  const [type, setType] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [context, setContext] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const typeOptions = [
    { value: "Blog", label: "Blog Post" },
    { value: "Instagram Caption", label: "Instagram Caption" },
    { value: "Facebook Ad", label: "Facebook Ad" },
    { value: "Product Description", label: "Product Description" },
    { value: "LinkedIn Post", label: "LinkedIn Post" },
    { value: "Landing Page", label: "Landing Page" },
    { value: "Email", label: "Email Content" },
  ]

  const toneOptions = [
    { value: "Friendly", label: "Friendly" },
    { value: "Professional", label: "Professional" },
    { value: "Persuasive", label: "Persuasive" },
    { value: "Informative", label: "Informative" },
    { value: "Humorous", label: "Humorous" },
  ]

  const lengthOptions = [
    { value: "Short", label: "Short (100-150 words)" },
    { value: "Medium", label: "Medium (200-300 words)" },
    { value: "Long", label: "Long (500+ words)" },
  ]

  const handleGenerate = async () => {
    if (!topic.trim() || !type.trim()) {
      toast({
        title: "Missing Fields",
        description: "Topic and Content Type are required.",
        variant: "destructive",
      })
      return
    }

    const formData = {
      tool: "content",
      topic: topic.trim(),
      type,
      tone: tone || "Professional",
      length: length || "Medium",
      audience,
      context,
    }

    sessionStorage.setItem("lettrics-form-data", JSON.stringify(formData))
    router.push("/tools/content/loading")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-stone-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <header className="relative z-10 flex items-center gap-4 p-6 pt-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-white to-yellow-300 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-orange-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Content Writer</h1>
            <p className="text-sm text-gray-400">Generate blogs, ads, captions & more</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 mb-8 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl space-y-8">
            <div>
              <Label htmlFor="topic" className="text-sm font-medium text-gray-300 mb-3 block">
                Content Topic *
              </Label>
              <Input
                id="topic"
                placeholder="Enter the content subject..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 text-lg"
              />
            </div>

            <CustomSelect
              value={type}
              onValueChange={setType}
              placeholder="Select content type"
              options={typeOptions}
              label="Content Type *"
            />

            <CustomSelect
              value={tone}
              onValueChange={setTone}
              placeholder="Select tone"
              options={toneOptions}
              label="Tone"
            />

            <CustomSelect
              value={length}
              onValueChange={setLength}
              placeholder="Select content length"
              options={lengthOptions}
              label="Length"
            />

            <div>
              <Label htmlFor="audience" className="text-sm font-medium text-gray-300 mb-3 block">
                Target Audience (optional)
              </Label>
              <Input
                id="audience"
                placeholder="e.g., Students, Gym Enthusiasts"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 text-base"
              />
            </div>

            <div>
              <Label htmlFor="context" className="text-sm font-medium text-gray-300 mb-3 block">
                Additional Context (optional)
              </Label>
              <Textarea
                id="context"
                placeholder="Add background details, target product or event info..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 text-base min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic.trim() || !type.trim()}
              className="w-full py-6 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 hover:from-orange-600 hover:via-yellow-600 hover:to-amber-600 text-white font-semibold text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Generate Content
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
