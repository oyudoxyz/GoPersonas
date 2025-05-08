import imageMetadata from '../data/imageMetadata.json';
import { PersonaType } from '@/components/PersonaCard';

// Define image metadata type
type ImageMetadata = {
  path: string;
  gender: string;
  ageGroup: string;
  occupations: string[];
  traits: string[];
  style: string;
};

// Cast the imported JSON to our type
const typedImageMetadata = imageMetadata as ImageMetadata[];

// Define weights for different matching criteria
const MATCHING_WEIGHTS = {
  gender: 10,
  ageGroup: 8,
  occupation: 15,
  trait: 5,
  style: 7
};

// Helper function to extract age group from a numeric age
function getAgeGroup(age: number): string {
  if (age < 30) return 'Young';
  if (age < 50) return 'Middle-aged';
  if (age < 65) return 'Older';
  return 'Elderly';
}

// Helper function to extract gender and age from demographic string
// Example: "Male, 32, Software Developer" -> { gender: "Male", age: 32, occupation: "Software Developer" }
function parseDemographic(demographic: string): { gender: string; age: number; occupation: string } {
  const parts = demographic.split(',').map(part => part.trim());
  
  // Default values
  const result = {
    gender: 'Unknown',
    age: 30,
    occupation: 'Unknown'
  };
  
  if (parts.length >= 1) {
    result.gender = parts[0];
  }
  
  if (parts.length >= 2) {
    // Extract age, assuming format like "32 years old" or just "32"
    const ageMatch = parts[1].match(/(\d+)/);
    if (ageMatch) {
      result.age = parseInt(ageMatch[1], 10);
    }
  }
  
  if (parts.length >= 3) {
    result.occupation = parts[2];
  }
  
  return result;
}

// Find the best matching image for a persona
export function findBestMatchingImage(persona: PersonaType): string {
  // Parse demographic information
  const { gender, age, occupation } = parseDemographic(persona.demographic);
  const ageGroup = getAgeGroup(age);
  
  // Extract traits from persona
  const traits = persona.traits.map(t => t.name.toLowerCase());
  
  // Track best match
  let highestScore = 0;
  let bestMatch = typedImageMetadata[0].path; // Default to first image
  
  // Calculate score for each image
  for (const image of typedImageMetadata) {
    let score = 0;
    
    // Gender matching
    if (image.gender.toLowerCase() === gender.toLowerCase()) {
      score += MATCHING_WEIGHTS.gender;
    }
    
    // Age group matching
    if (image.ageGroup === ageGroup) {
      score += MATCHING_WEIGHTS.ageGroup;
    }
    
    // Occupation matching - check if any occupation keyword is present
    const occupationLower = occupation.toLowerCase();
    if (image.occupations.some(occ => occupationLower.includes(occ))) {
      score += MATCHING_WEIGHTS.occupation;
    }
    
    // Trait matching
    for (const trait of traits) {
      if (image.traits.some(t => trait.includes(t) || t.includes(trait.toLowerCase()))) {
        score += MATCHING_WEIGHTS.trait;
      }
    }
    
    // Check if this is the best match so far
    if (score > highestScore) {
      highestScore = score;
      bestMatch = image.path;
    }
  }
  
  return bestMatch;
}

// Function to get a default image based on gender and age
export function getDefaultImage(persona: PersonaType): string {
  const { gender, age } = parseDemographic(persona.demographic);
  const ageGroup = getAgeGroup(age);
  
  // Find image matching gender and age group
  const matchingImage = typedImageMetadata.find(img => 
    img.gender.toLowerCase() === gender.toLowerCase() && img.ageGroup === ageGroup
  );
  
  // If found, return it
  if (matchingImage) {
    return matchingImage.path;
  }
  
  // If no match by gender and age, match just by gender
  const genderMatch = typedImageMetadata.find(img => 
    img.gender.toLowerCase() === gender.toLowerCase()
  );
  
  if (genderMatch) {
    return genderMatch.path;
  }
  
  // Last resort, return first image
  return typedImageMetadata[0].path;
} 