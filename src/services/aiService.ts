import { PersonaType } from "@/components/PersonaCard";
import { getSelectedModel } from "@/components/APIDebugger";
import { findBestMatchingImage, getDefaultImage } from "@/utils/imageMatchUtils";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample profile images (kept as fallback)
const profileImages = [
  "/images/chef-marcus.png",
  "/images/mrs-thompson.png",
  "/images/rosa-mendez.png",
  "/images/carmen-rivera.png",
  "/images/david-chen.png",
  "/images/arjun-patel.png",
  "/images/samir-alfarsi.png",
  "/images/amina-johnson.png",
  "/images/nonbinary-graphic-designer.png",
  "/images/east-african-grandmother.png",
  "/images/se-asian-influencer.png",
  "/images/me-business-owner.png",
  "/images/black-hr-manager.png",
  "/images/enviro-scientist.png",
  "/images/sa-elementary-teacher.png",
  "/images/latino-teen-student.png",
  "/images/ea-nonbinary-artist.png",
  "/images/indigenous-park-ranger.png",
  "/images/white-college-freshman.png",
  "/images/black-retired-judge.png",
];

// Sample trait colors
const traitColors = ["blue", "green", "purple", "pink", "orange", "yellow"];

/**
 * Try to extract valid JSON from a string that might contain additional text
 * @param text The text that might contain JSON
 * @returns The parsed JSON object or null if no valid JSON found
 */
const extractJSON = (text: string): any | null => {
  // First, try to parse the entire text as JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    // Direct JSON parsing failed, trying alternatives
  }

  // Try to find JSON by looking for matching curly braces
  try {
    // Find first { and last }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
      const jsonCandidate = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonCandidate);
    }
  } catch (e) {
    // Curly brace extraction failed
  }
  
  // Try looking for JSON in code blocks (e.g., ```json ... ```)
  try {
    const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      return JSON.parse(codeBlockMatch[1]);
    }
  } catch (e) {
    // Code block extraction failed
  }
  
  // Try looking for JSON within square brackets
  try {
    // Find first [ and last ]
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
      const arrayCandidate = text.substring(firstBracket, lastBracket + 1);
      return JSON.parse(arrayCandidate);
    }
  } catch (e) {
    // Bracket extraction failed
  }
  
  return null;
};

/**
 * Creates basic fallback personas when AI generation fails
 */
const createFallbackPersonas = (description: string): PersonaType[] => {
  const personas: PersonaType[] = [];
    
  const templates = [
    {
      name: "Power User Pat",
      demographic: "Non-binary, 32, Product Manager",
      traits: [
        { name: "Analytical", color: "blue" },
        { name: "Detail-oriented", color: "purple" }
      ],
      mainGoal: `Optimize productivity using ${description}`,
      goals: [
        "Find advanced features quickly",
        "Customize the experience"
      ],
      painPoints: [
        "Basic interfaces lack power features",
        "Too many clicks to accomplish tasks"
      ],
      expectations: [
        "Robust customization options",
        "Responsive performance"
      ]
    },
    {
      name: "Casual User Chris",
      demographic: "Female, 28, Marketing Specialist",
      traits: [
        { name: "Creative", color: "pink" },
        { name: "Intuitive", color: "yellow" }
      ],
      mainGoal: `Accomplish basic tasks with ${description} without complexity`,
      goals: [
        "Complete common tasks easily",
        "Learn without reading documentation"
      ],
      painPoints: [
        "Overwhelmed by complex interfaces",
        "Frustrated by technical jargon"
      ],
      expectations: [
        "Simple, intuitive UI",
        "Clear, visual guidance"
      ]
    },
    {
      name: "New User Noa",
      demographic: "Male, 24, Recent Graduate",
      traits: [
        { name: "Curious", color: "green" },
        { name: "Open-minded", color: "orange" }
      ],
      mainGoal: `Learn how to use ${description} effectively`,
      goals: [
        "Master basic functionality quickly",
        "Discover key benefits"
      ],
      painPoints: [
        "Steep learning curve",
        "Lack of beginner tutorials"
      ],
      expectations: [
        "Clear onboarding process",
        "Helpful tips and guidance"
      ]
    },
    {
      name: "Admin User Avery",
      demographic: "Female, 41, IT Director",
      traits: [
        { name: "Strategic", color: "blue" },
        { name: "Security-conscious", color: "purple" }
      ],
      mainGoal: `Manage and oversee team usage of ${description}`,
      goals: [
        "Control access and permissions",
        "Monitor usage and performance"
      ],
      painPoints: [
        "Limited visibility into team activities",
        "Complex security configuration"
      ],
      expectations: [
        "Robust admin dashboard",
        "Detailed reporting features"
      ]
    }
  ];
  
  return templates.map(template => ({
    ...template,
    id: generateId(),
    imageUrl: profileImages[Math.floor(Math.random() * profileImages.length)]
  }));
};

// OpenRouter API call to generate personas
const generateAIPersonas = async (description: string): Promise<PersonaType[]> => {
  // Use Vite's environment variable approach
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return createFallbackPersonas(description);
  }

  const modelId = getSelectedModel();
  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Design Spark Personas",
      },
      body: JSON.stringify({
        model: modelId,
        response_format: { "type": "json_object" },
        messages: [
          {
            role: "system",
            content: `You are a system that generates user personas in JSON format. Do not respond with any explanations, reflections, or text outside of the JSON data. Only return valid, properly formatted JSON data.`
          },
          {
            role: "user",
            content: `Generate 4 distinct user personas for the following product/context: "${description}".
                     Each persona must include:
                     1. A descriptive name reflecting their user type (e.g., "Power User Alex")
                     2. Demographics (gender, age, occupation)
                     3. 2-3 personality traits
                     4. A main goal related to the product
                     5. 2-3 specific goals they want to achieve
                     6. 2-3 pain points or challenges they face
                     7. 2-3 expectations they have
                     
                     IMPORTANT: You must respond ONLY with a JSON array containing 4 persona objects.
                     The structure must be exactly:
                     
                     {
                       "personas": [
                         {
                           "name": "string",
                           "demographic": "string",
                           "traits": [{"name": "string", "color": "blue|green|purple|pink|orange|yellow"}],
                           "mainGoal": "string",
                           "goals": ["string"],
                           "painPoints": ["string"],
                           "expectations": ["string"]
                         },
                         // 3 more persona objects with the same structure
                       ]
                     }
                     
                     Do not include any explanations or text outside of this JSON structure.`
          }
        ]
      })
    });

    if (!response.ok) {
      let errorMessage = `API Error (Status ${response.status}): `;
      
      try {
        const errorData = await response.json();
        errorMessage += errorData.error?.message || response.statusText;
      } catch (parseError) {
        errorMessage += `Could not parse error response: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const aiGeneratedContent = data.choices[0].message.content;
    
    // Parse the AI response and convert it to the expected format
    let personasData;
    try {
      // First try standard JSON parsing
      personasData = JSON.parse(aiGeneratedContent);
    } catch (error) {
      // Try to extract JSON from text
      const extractedJSON = extractJSON(aiGeneratedContent);
      if (!extractedJSON) {
        throw new Error(`Failed to parse AI-generated personas: ${error instanceof Error ? error.message : 'Unknown parsing error'}`);
      }
      
      personasData = extractedJSON;
    }
    
    // Check if we got the expected nested "personas" array structure
    if (personasData.personas && Array.isArray(personasData.personas)) {
      personasData = personasData.personas;
    }
    
    // Validate and ensure the response matches our expected format
    if (!Array.isArray(personasData) || personasData.length === 0) {
      throw new Error("Invalid response format: Expected an array of personas");
    }
    
    // Check if the structure of each persona is correct
    for (const persona of personasData) {
      if (!persona.name || !persona.demographic || !Array.isArray(persona.traits) || 
          !persona.mainGoal || !Array.isArray(persona.goals) || 
          !Array.isArray(persona.painPoints) || !Array.isArray(persona.expectations)) {
        throw new Error("Invalid persona structure in API response");
      }
    }
    
    // Modify the final map function before returning personas
    return personasData.map((persona: any) => {
      // Find the best matching image for this persona
      let imageUrl = findBestMatchingImage(persona);
      
      // Use default image matching if the best match function fails for any reason
      if (!imageUrl) {
        try {
          imageUrl = getDefaultImage(persona);
        } catch (error) {
          // Last fallback: use random image
          imageUrl = profileImages[Math.floor(Math.random() * profileImages.length)];
        }
      }
      
      return {
        id: generateId(),
        imageUrl,
        ...persona,
      };
    });
  } catch (error) {
    return createFallbackPersonas(description);
  }
};

// Generate specific persona based on description
export const generatePersona = async (description: string): Promise<PersonaType[]> => {
  return await generateAIPersonas(description);
};
