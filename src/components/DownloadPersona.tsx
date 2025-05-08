import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { PersonaType, PersonaTrait } from './PersonaCard';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface DownloadPersonaProps {
  persona: PersonaType;
  index?: number;
  productDescription?: string;
  className?: string;
}

const getTraitBgColor = (color: string) => {
  switch (color) {
    case 'blue': return { bg: 'rgb(219, 234, 254)', text: 'rgb(30, 64, 175)' }; // bg-blue-100 text-blue-800
    case 'green': return { bg: 'rgb(220, 252, 231)', text: 'rgb(22, 101, 52)' }; // bg-green-100 text-green-800
    case 'purple': return { bg: 'rgb(237, 233, 254)', text: 'rgb(91, 33, 182)' }; // bg-purple-100 text-purple-800
    case 'pink': return { bg: 'rgb(252, 231, 243)', text: 'rgb(157, 23, 77)' }; // bg-pink-100 text-pink-800
    case 'orange': return { bg: 'rgb(255, 237, 213)', text: 'rgb(194, 65, 12)' }; // bg-orange-100 text-orange-800
    case 'yellow': return { bg: 'rgb(254, 249, 195)', text: 'rgb(133, 77, 14)' }; // bg-yellow-100 text-yellow-800
    default: return { bg: 'rgb(243, 244, 246)', text: 'rgb(31, 41, 55)' }; // bg-gray-100 text-gray-800
  }
};

// Create a custom persona card renderer for the canvas
const renderPersonaCardToCanvas = async (persona: PersonaType, productDescription?: string): Promise<HTMLCanvasElement> => {
  // Create a container for our custom render
  const container = document.createElement('div');
  container.style.width = '768px'; // Fixed width
  container.style.padding = '24px';
  container.style.backgroundColor = 'white';
  container.style.borderRadius = '12px';
  container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  
  // Start building our card HTML structure
  const headerDiv = document.createElement('div');
  headerDiv.style.display = 'flex';
  headerDiv.style.alignItems = 'flex-start';
  headerDiv.style.gap = '16px';
  headerDiv.style.paddingBottom = '20px';
  headerDiv.style.borderBottom = '1px solid rgb(243, 244, 246)';
  
  // Image section
  const imageDiv = document.createElement('div');
  imageDiv.style.width = '96px';
  imageDiv.style.height = '96px';
  imageDiv.style.borderRadius = '8px';
  imageDiv.style.overflow = 'hidden';
  imageDiv.style.backgroundColor = 'rgb(243, 232, 255)'; // bg-purple-100
  imageDiv.style.flexShrink = '0';
  
  const img = document.createElement('img');
  img.src = persona.imageUrl;
  img.alt = persona.name;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  imageDiv.appendChild(img);
  
  // Content section
  const contentDiv = document.createElement('div');
  contentDiv.style.flex = '1';
  
  // Name
  const nameHeading = document.createElement('h3');
  nameHeading.textContent = persona.name;
  nameHeading.style.fontSize = '20px';
  nameHeading.style.fontWeight = 'bold';
  nameHeading.style.marginBottom = '4px';
  
  // Demographic
  const demoP = document.createElement('p');
  demoP.textContent = persona.demographic;
  demoP.style.color = 'rgb(75, 85, 99)'; // text-gray-600
  demoP.style.marginBottom = '12px';
  
  // Traits
  const traitsDiv = document.createElement('div');
  traitsDiv.style.display = 'flex';
  traitsDiv.style.flexWrap = 'wrap';
  traitsDiv.style.gap = '8px';
  
  persona.traits.forEach(trait => {
    const colors = getTraitBgColor(trait.color);
    const traitSpan = document.createElement('span');
    traitSpan.textContent = trait.name;
    traitSpan.style.fontFamily = 'Satoshi, sans-serif';
    traitSpan.style.fontSize = '12px';
    traitSpan.style.paddingTop = '-16px';
    traitSpan.style.paddingBottom = '12px';
    traitSpan.style.paddingLeft = '16px';
    traitSpan.style.paddingRight = '16px';
    traitSpan.style.borderRadius = '16px';
    traitSpan.style.backgroundColor = colors.bg;
    traitSpan.style.color = colors.text;
    traitSpan.style.display = 'flex';
    traitSpan.style.alignItems = 'center';
    traitSpan.style.justifyContent = 'center';
    traitSpan.style.lineHeight = 'normal';
    traitSpan.style.fontWeight = '200';
    traitsDiv.appendChild(traitSpan);
  });
  
  // Append all elements
  contentDiv.appendChild(nameHeading);
  contentDiv.appendChild(demoP);
  contentDiv.appendChild(traitsDiv);
  
  headerDiv.appendChild(imageDiv);
  headerDiv.appendChild(contentDiv);
  container.appendChild(headerDiv);
  
  // Goals section
  const goalsSection = document.createElement('div');
  goalsSection.style.display = 'grid';
  goalsSection.style.gridTemplateColumns = 'repeat(12, minmax(0, 1fr))';
  goalsSection.style.gap = '32px';
  goalsSection.style.marginTop = '24px';
  goalsSection.style.paddingBottom = '24px';
  goalsSection.style.borderBottom = '1px solid rgb(243, 244, 246)';
  
  // Main Goal
  const mainGoalDiv = document.createElement('div');
  mainGoalDiv.style.gridColumn = 'span 5 / span 5';
  
  const mainGoalHeading = document.createElement('h4');
  mainGoalHeading.textContent = 'Main Goal';
  mainGoalHeading.style.fontSize = '18px';
  mainGoalHeading.style.fontWeight = 'bold';
  mainGoalHeading.style.marginBottom = '8px';
  
  const mainGoalP = document.createElement('p');
  mainGoalP.textContent = persona.mainGoal;
  mainGoalP.style.color = 'rgb(55, 65, 81)'; // text-gray-700
  
  mainGoalDiv.appendChild(mainGoalHeading);
  mainGoalDiv.appendChild(mainGoalP);
  
  // Goals
  const goalsDiv = document.createElement('div');
  goalsDiv.style.gridColumn = 'span 7 / span 7';
  
  const goalsHeading = document.createElement('h4');
  goalsHeading.textContent = 'Goals';
  goalsHeading.style.fontSize = '18px';
  goalsHeading.style.fontWeight = 'bold';
  goalsHeading.style.marginBottom = '8px';
  
  const goalsList = document.createElement('ul');
  goalsList.style.listStyleType = 'disc';
  goalsList.style.paddingLeft = '20px';
  goalsList.style.color = 'rgb(55, 65, 81)'; // text-gray-700
  
  persona.goals.forEach(goal => {
    const goalItem = document.createElement('li');
    goalItem.textContent = goal;
    goalItem.style.marginBottom = '4px';
    goalsList.appendChild(goalItem);
  });
  
  goalsDiv.appendChild(goalsHeading);
  goalsDiv.appendChild(goalsList);
  
  goalsSection.appendChild(mainGoalDiv);
  goalsSection.appendChild(goalsDiv);
  container.appendChild(goalsSection);
  
  // Pain Points and Expectations section
  const bottomSection = document.createElement('div');
  bottomSection.style.display = 'grid';
  bottomSection.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
  bottomSection.style.gap = '32px';
  bottomSection.style.marginTop = '24px';
  
  // Pain Points
  const painDiv = document.createElement('div');
  
  const painHeading = document.createElement('h4');
  painHeading.textContent = 'Pain points & objections';
  painHeading.style.fontSize = '18px';
  painHeading.style.fontWeight = 'bold';
  painHeading.style.marginBottom = '8px';
  
  const painList = document.createElement('ul');
  painList.style.listStyleType = 'disc';
  painList.style.paddingLeft = '20px';
  painList.style.color = 'rgb(55, 65, 81)'; // text-gray-700
  
  persona.painPoints.forEach(point => {
    const painItem = document.createElement('li');
    painItem.textContent = point;
    painItem.style.marginBottom = '4px';
    painList.appendChild(painItem);
  });
  
  painDiv.appendChild(painHeading);
  painDiv.appendChild(painList);
  
  // Expectations
  const expDiv = document.createElement('div');
  
  const expHeading = document.createElement('h4');
  expHeading.textContent = 'Expectations & needs';
  expHeading.style.fontSize = '18px';
  expHeading.style.fontWeight = 'bold';
  expHeading.style.marginBottom = '8px';
  
  const expList = document.createElement('ul');
  expList.style.listStyleType = 'disc';
  expList.style.paddingLeft = '20px';
  expList.style.color = 'rgb(55, 65, 81)'; // text-gray-700
  
  persona.expectations.forEach(expectation => {
    const expItem = document.createElement('li');
    expItem.textContent = expectation;
    expItem.style.marginBottom = '4px';
    expList.appendChild(expItem);
  });
  
  expDiv.appendChild(expHeading);
  expDiv.appendChild(expList);
  
  bottomSection.appendChild(painDiv);
  bottomSection.appendChild(expDiv);
  container.appendChild(bottomSection);
  

  // Append the container to the body
  document.body.appendChild(container);
  
  // Wait for the image to load
  await new Promise((resolve) => {
    if (img.complete) {
      resolve(true);
    } else {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    }
  });
  
  // Render to canvas
  const canvas = await html2canvas(container, {
    scale: 2, // 2x scale for better quality
    logging: false,
    backgroundColor: 'white',
    allowTaint: true,
    useCORS: true,
  });
  
  // Clean up
  document.body.removeChild(container);
  
  return canvas;
};

const DownloadPersona: React.FC<DownloadPersonaProps> = ({ persona, index = 1, productDescription, className }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Show loading toast
      toast({
        title: 'Preparing download',
        description: 'Creating PNG image of your persona...',
      });
      
      // Render our custom persona card to canvas
      const canvas = await renderPersonaCardToCanvas(persona, productDescription);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to convert canvas to blob');
          setIsDownloading(false);
          toast({
            title: 'Download failed',
            description: 'Could not create the PNG file. Please try again.',
            variant: 'destructive',
          });
          return;
        }
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Create filename in the format "Persona 1 - Name.png"
        const fileName = `Persona ${index} - ${persona.name}.png`;
        
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
        
        // Success toast
        toast({
          title: 'Download complete',
          description: `Saved as "${fileName}"`,
        });
      }, 'image/png');
    } catch (error) {
      console.error('Error generating PNG:', error);
      setIsDownloading(false);
      toast({
        title: 'Download failed',
        description: 'An error occurred while creating the PNG file.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Button 
      onClick={handleDownload} 
      variant="outline" 
      className={cn("absolute top-4 right-20", className)}
      size="icon"
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span className="sr-only">Download persona as PNG</span>
    </Button>
  );
};

export default DownloadPersona;
