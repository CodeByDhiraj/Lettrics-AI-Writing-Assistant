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
    '!': '!', '?': '?', '.': '.', ',': ',', ':': ':', 
    ';': ';', '(': '(', ')': ')', '[': '[', ']': ']',
    '{': '{', '}': '}', '+': '+', '-': '-', '=': '=',
    '/': '/', '\\': '\\', '|': '|', '<': '<', '>': '>',
    '@': '@', '#': '#', '$': '$', '%': '%', '^': '^',
    '&': '&', '*': '*', '_': '_', '"': '"', "'": "'",
    ' ': ' '
  };

  const toBold = (str: string) => str.split('').map(c => boldMap[c] || c).join('');

  return text
    .replace(/###\s*([^\n]+)/g, (_, h) => `\n\n${toBold(h.toUpperCase())}\n\n\n`)
    .replace(/#\s*([^\n]+)/g, '\n• $1\n')
    .replace(/\*\*(.*?)\*\*/g, (_, t) => toBold(t))
    .replace(/__(.*?)__/g, (_, t) => toBold(t))
    .replace(/\*(.*?)\*/g, (_, t) => toBold(t))
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\')
    .replace(/\\\//g, '/')
    .replace(/\\u2014/g, '—')
    .replace(/\\u2013/g, '–')
    .replace(/\\u2018/g, '‘')
    .replace(/\\u2019/g, '’')
    .replace(/\\u201c/g, '“')
    .replace(/\\u201d/g, '”')
    .replace(/\\u2026/g, '…')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/\n{3,}$/g, '\n\n')
    .trim();
}

async function generateContent(params: {
  tool: string
  [key: string]: any
}) {
  const { tool, ...otherParams } = params;

  if (tool === "application") {
    try {
      // Validate required fields
      const requiredFields = ['category', 'type', 'receiver', 'name'];
      const missingFields = requiredFields.filter(field => !otherParams[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Prepare API parameters exactly as expected
      const apiParams = new URLSearchParams();
      apiParams.append('category', otherParams.category.charAt(0).toUpperCase() + otherParams.category.slice(1).toLowerCase());
      apiParams.append('type', encodeURIComponent(otherParams.type));
      apiParams.append('receiver', encodeURIComponent(otherParams.receiver));
      apiParams.append('name', encodeURIComponent(otherParams.name));
      
      if (otherParams.reason) {
        apiParams.append('reason', encodeURIComponent(otherParams.reason));
      }

      // Add cache buster
      apiParams.append('_', Date.now().toString());

      const apiUrl = `https://fallmodz.in/jsw/api_application.php?${apiParams.toString()}`;
      console.log('API Request:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'API returned unsuccessful response');
      }

      return cleanApiResponse(result.reply);
    } catch (error) {
      console.error('Application generation failed:', error);
      // Generate fallback application
      return `**APPLICATION**\n\n**To:** ${otherParams.receiver || 'Sir/Madam'}\n\nI, ${otherParams.name || 'Applicant'}, am writing to request ${otherParams.type || 'leave'}.\n\n${otherParams.reason ? `**Reason:** ${otherParams.reason}\n\n` : ''}**Sincerely,**\n${otherParams.name || 'Applicant'}`;
    }
  }

  // ... (keep your other tool cases unchanged)
  return `Content could not be generated for tool: ${tool}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received generation request:', JSON.stringify(body, null, 2));

    const { tool } = body;
    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Tool parameter is required' },
        { status: 400 }
      );
    }

    const content = await generateContent(body);
    
    return NextResponse.json({ 
      success: true, 
      content,
      debug: {
        receivedParams: body
      }
    });
  } catch (error) {
    console.error('Generation endpoint error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate content',
        debug: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}