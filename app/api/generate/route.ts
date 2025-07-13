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
  topic: string
  [key: string]: any
}) {
  const { tool, topic, ...otherParams } = params;

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
  else if (tool === "thesis") {
    try {
      const validPositions = new Set(["Supportive", "Critical", "Neutral", "Comparative"]);
      const validFields = new Set(["Literature", "History", "Science", "Technology", "Social Studies", "General"]);
      const validComplexities = new Set(["Simple", "Medium", "Complex", "Advanced"]);

      const position = validPositions.has(otherParams.position) ? otherParams.position : "Neutral";
      const field = validFields.has(otherParams.field) ? otherParams.field : "General";
      const complexity = validComplexities.has(otherParams.complexity) ? otherParams.complexity : "Medium";

      const apiUrl = new URL("https://fallmodz.in/jsw/api_thesis.php");
      const params = new URLSearchParams();
      
      params.append("prompt", encodeURIComponent(topic.trim()));
      params.append("position", position);
      params.append("field", field);
      params.append("complexity", complexity.toLowerCase());
      params.append("nocache", Date.now().toString());

      apiUrl.search = params.toString();

      const response = await fetch(apiUrl.toString(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.text();
      console.log("Thesis API Response:", result);
      
      return cleanApiResponse(result);
    } catch (error) {
      console.error("Thesis API error:", error);
      return `THESIS STATEMENT: ${topic}\n\nThis ${otherParams.complexity || "medium"}-complexity thesis takes a ${otherParams.position || "neutral"} position on ${topic} within the field of ${otherParams.field || "general"} studies.`;
    }
  }
  else if (tool === "essay") {
    try {
      const level = otherParams.stage || "High School";
      const type = otherParams.type || "Argumentative";
      const longtype = 
        otherParams.length === "Short" ? "short" :
        otherParams.length === "Long" ? "long" : "mid";
      
      const apiUrl = new URL("https://fallmodz.in/jsw/api.php");
      apiUrl.searchParams.append("prompt", topic);
      apiUrl.searchParams.append("type", type);
      apiUrl.searchParams.append("level", level);
      apiUrl.searchParams.append("longtype", longtype);
      
      const response = await fetch(apiUrl.toString());
      if (!response.ok) throw new Error(`Status ${response.status}`);
      return cleanApiResponse(await response.text());
    } catch (error) {
      console.error("Essay API error:", error);
      return `### Introduction\n\nThe topic of "${topic.replace(/\+/g, " ")}" has become increasingly relevant.\n\n### Main Body\n\nThe significance cannot be understated.\n\n### Conclusion\n\nIn conclusion, this remains important.`;
    }
  }
  else if (tool === "story") {
    try {
      const validGenres = ["Adventure", "Romance", "Mystery", "Fantasy", "Sci-Fi", "Horror"];
      const genre = validGenres.includes(otherParams.genre) ? otherParams.genre : "Adventure";
      
      const lengthMap: Record<string, string> = {
        "Short": "short",
        "Medium": "mid",
        "Long": "long"
      };
      const length = lengthMap[otherParams.length] || "mid";
      
      const validTones = ["Engaging", "Dramatic", "Humorous", "Dark", "Inspirational"];
      const tone = validTones.includes(otherParams.tone) ? otherParams.tone : "Engaging";
      
      const apiUrl = new URL("https://fallmodz.in/jsw/api_story.php");
      apiUrl.searchParams.append("prompt", topic);
      apiUrl.searchParams.append("genre", genre);
      apiUrl.searchParams.append("length", length);
      apiUrl.searchParams.append("tone", tone);
      
      const response = await fetch(apiUrl.toString());
      if (!response.ok) throw new Error(`Status ${response.status}`);
      return cleanApiResponse(await response.text());
    } catch (error) {
      console.error("Story API error:", error);
      const genre = otherParams.genre || "Adventure";
      const genreFlavors: Record<string, string> = {
        "Adventure": "embarked on an exciting journey",
        "Romance": "found love in unexpected places",
        "Mystery": "uncovered secrets that would change everything",
        "Fantasy": "discovered magical realms beyond imagination",
        "Sci-Fi": "encountered advanced technologies that defied belief",
        "Horror": "faced terrors that chilled them to the bone"
      };
      return `# ${topic.replace(/\+/g, " ")}\n\nIn a ${genre.toLowerCase()} setting, our protagonist ${genreFlavors[genre]}.`;
    }
  }
  else if (tool === "poem") {
    try {
      const validStyles = ["Free Verse", "Sonnet", "Haiku", "Limerick", "Ballad"];
      const style = validStyles.includes(otherParams.style) ? otherParams.style : "Free Verse";
      
      const validMoods = ["Reflective", "Joyful", "Melancholic", "Romantic", "Inspirational"];
      const mood = validMoods.includes(otherParams.mood) ? otherParams.mood : "Reflective";
      
      const lengthMap: Record<string, string> = {
        "Short": "short",
        "Medium": "medium", 
        "Long": "long"
      };
      const length = lengthMap[otherParams.length] || "medium";
      
      const apiUrl = new URL("https://fallmodz.in/jsw/api_poem.php");
      apiUrl.searchParams.append("prompt", encodeURIComponent(topic));
      apiUrl.searchParams.append("style", style);
      apiUrl.searchParams.append("mood", mood);
      apiUrl.searchParams.append("length", length);
      
      const response = await fetch(apiUrl.toString());
      if (!response.ok) throw new Error(`Status ${response.status}`);
      return cleanApiResponse(await response.text());
    } catch (error) {
      console.error("Poem API error:", error);
      const style = otherParams.style || "Free Verse";
      const mood = otherParams.mood || "Reflective";
      const moodDescriptors: Record<string, string> = {
        "Reflective": "thoughtful contemplation",
        "Joyful": "cheerful delight",
        "Melancholic": "wistful sorrow",
        "Romantic": "passionate longing", 
        "Inspirational": "hopeful aspiration"
      };
      const styleFormats: Record<string, string> = {
        "Free Verse": `About ${topic}\n\nFlowing freely like a river,\nUnbound by rules or rhyme,\nExpressing ${moodDescriptors[mood]}\nIn its own space and time.`,
        "Sonnet": `Shall I compare ${topic} to a summer's day?\nThou art more lovely and more temperate...`,
        "Haiku": `${topic} in spring\n${moodDescriptors[mood]} grows\nMorning dew glistens`,
        "Limerick": `There once was ${topic} so fine\nWhose ${moodDescriptors[mood]} did shine\nWith a tip and a tap\nAnd a snap and a clap\nIt became quite divine!`,
        "Ballad": `Oh gather round and I'll tell you true\nOf ${topic} and ${moodDescriptors[mood]} too...`
      };
      return styleFormats[style] || styleFormats["Free Verse"];
    }
  }
  else if (tool === "email") {
    try {
      const validTones = ["Professional", "Friendly", "Formal", "Casual", "Persuasive"];
      const tone = validTones.includes(otherParams.tone) ? otherParams.tone : "Professional";
      
      const validRecipients = ["Boss", "Colleague", "Client", "Friend", "General"];
      const recipient = validRecipients.includes(otherParams.recipient) ? otherParams.recipient : "General";
      
      const apiUrl = new URL("https://fallmodz.in/jsw/api_email.php");
      apiUrl.searchParams.append("prompt", encodeURIComponent(topic));
      apiUrl.searchParams.append("tone", tone);
      apiUrl.searchParams.append("recipient", recipient);
      
      if (otherParams.context && otherParams.context.trim()) {
        apiUrl.searchParams.append("context", encodeURIComponent(otherParams.context.trim()));
      }
      
      const response = await fetch(apiUrl.toString());
      if (!response.ok) throw new Error(`Status ${response.status}`);
      return cleanApiResponse(await response.text());
    } catch (error) {
      console.error("Email API error:", error);
      const recipientMap: Record<string, string> = {
        "Boss": "Dear Manager",
        "Colleague": "Hi [Colleague's Name]",
        "Client": "Dear Valued Client",
        "Friend": "Hey [Friend's Name]",
        "General": "To Whom It May Concern"
      };
      const toneMap: Record<string, string> = {
        "Professional": "I hope this message finds you well.",
        "Friendly": "Hope you're doing great!",
        "Formal": "I am writing to formally address",
        "Casual": "Just wanted to drop you a note about",
        "Persuasive": "I strongly recommend considering"
      };
      return `Subject: ${topic}\n\n${recipientMap[otherParams.recipient] || recipientMap["General"]},\n\n${toneMap[otherParams.tone] || toneMap["Professional"]} ${topic}.\n\n${otherParams.context ? `Additional details: ${otherParams.context}\n\n` : ''}Best regards,\n[Your Name]`;
    }
  }
  else if (tool === "paragraph") {
    try {
      const validPurposes = ["Informative", "Persuasive", "Descriptive", "Narrative", "Explanatory"];
      const purpose = validPurposes.includes(otherParams.purpose) ? otherParams.purpose : "Informative";
      
      const lengthMap: Record<string, string> = {
        "Short": "short",
        "Medium": "medium",
        "Long": "long"
      };
      const length = lengthMap[otherParams.length] || "medium";
      
      const validTones = ["Neutral", "Formal", "Casual", "Academic", "Creative"];
      const tone = validTones.includes(otherParams.tone) ? otherParams.tone : "Neutral";
      
      const apiUrl = new URL("https://fallmodz.in/jsw/api_paragraph.php");
      apiUrl.searchParams.append("prompt", encodeURIComponent(topic));
      apiUrl.searchParams.append("purpose", purpose);
      apiUrl.searchParams.append("tone", tone);
      apiUrl.searchParams.append("length", length);
      
      const response = await fetch(apiUrl.toString());
      if (!response.ok) throw new Error(`Status ${response.status}`);
      return cleanApiResponse(await response.text());
    } catch (error) {
      console.error("Paragraph API error:", error);
      const purposeMap: Record<string, string> = {
        "Informative": "provides information about",
        "Persuasive": "makes a compelling case for",
        "Descriptive": "vividly describes",
        "Narrative": "tells a story about",
        "Explanatory": "explains the concept of"
      };
      const toneMap: Record<string, string> = {
        "Neutral": "This paragraph",
        "Formal": "This formal composition",
        "Casual": "Here's a casual take on",
        "Academic": "From an academic perspective,",
        "Creative": "Imagine this creative exploration of"
      };
      const lengthMap: Record<string, string> = {
        "Short": "short",
        "Medium": "medium",
        "Long": "long"
      };
      return `${toneMap[otherParams.tone] || toneMap["Neutral"]} ${purposeMap[otherParams.purpose] || purposeMap["Informative"]} ${topic}. The ${lengthMap[otherParams.length] || "medium"}-length treatment offers ${otherParams.purpose === "Descriptive" ? "rich details" : "key insights"} on this subject.`;
    }
  }

  return `Content about ${topic.replace(/\+/g, " ")} could not be generated.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("API Request Received:", {
      tool: body.tool,
      topic: body.topic,
      otherParams: body
    });

    const { tool, topic, ...otherParams } = body;

    if (!tool || !topic) {
      return NextResponse.json(
        { success: false, error: "Tool and topic are required" },
        { status: 400 }
      );
    }

    const content = await generateContent({ tool, topic, ...otherParams });
    
    return NextResponse.json({ 
      success: true, 
      content,
      debug: {
        receivedParams: { tool, topic, ...otherParams }
      }
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to generate content",
        debug: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}