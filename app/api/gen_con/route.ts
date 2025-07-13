import { type NextRequest, NextResponse } from "next/server"

function cleanApiResponse(text: string): string {
  try {
    const jsonResponse = JSON.parse(text);
    if (jsonResponse.success && jsonResponse.reply) {
      text = jsonResponse.reply;
    }
  } catch (e) {}

  const boldMap: Record<string, string> = {
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 
    'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
    'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼',
    'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
    'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘',
    'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
    'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢',
    'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
    'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
    '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
    ' ': ' '
  };

  const toBold = (str: string) => str.split('').map(c => boldMap[c] || c).join('');

  return text
    .replace(/###\s*([^\n]+)/g, (_, h) => `\n\n${toBold(h.toUpperCase())}\n\n\n`)
    .replace(/#\s*([^\n]+)/g, '\n➥ $1\n')
    .replace(/\*\*(.*?)\*\*/g, (_, t) => toBold(t))
    .replace(/\n{4,}/g, '\n\n')
    .replace(/\n{3,}$/g, '\n')
    .trim();
}

async function generateContent(params: {
  topic: string
  type: string
  tone: string
  length: string
  audience?: string
  context?: string
}) {
  try {
    const { topic, type, tone, length, audience, context } = params

    if (!topic || !type || !tone || !length) {
      throw new Error("Missing required fields")
    }

    const urlParams = new URLSearchParams({
      prompt: topic,
      type,
      tone,
      length,
      audience: audience || "",
      context: context || "",
      _: Date.now().toString(), // cache buster
    })

    const url = `https://sttricks.site/jsw/api_content.php?${urlParams.toString()}`
    console.log("Content API URL:", url)

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })

    const result = await res.json()
    if (!result.success) throw new Error(result.error || "API failed")

    return cleanApiResponse(result.reply)
  } catch (err) {
    console.error("Content API Error:", err)
    return `𝗖𝗢𝗡𝗧𝗘𝗡𝗧\n\n𝗧𝗼𝗽𝗶𝗰: ${params.topic || "Untitled"}\n\n${params.context || "No context provided."}`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, type, tone, length, audience, context } = body

    const content = await generateContent({ topic, type, tone, length, audience, context })

    return NextResponse.json({
      success: true,
      content,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate content",
      },
      { status: 500 }
    )
  }
}
