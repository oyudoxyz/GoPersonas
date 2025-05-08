import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Edit, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PersonaCard, { PersonaType } from '@/components/PersonaCard';
import PersonaThumbnail from '@/components/PersonaThumbnail';
import DownloadPersona from '@/components/DownloadPersona';
import LoadingState from '@/components/LoadingState';
import ModelSelector from '@/components/APIDebugger';
import { generatePersona } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Generator = () => {
  const [description, setDescription] = useState('');
  const [personas, setPersonas] = useState<PersonaType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersona, setEditedPersona] = useState<PersonaType | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPersona = personas.length > 0 ? personas[currentPersonaIndex] : null;

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please provide a description to generate personas.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsGenerating(true);
      setUsingFallback(false);
      toast({
        title: 'Generating personas',
        description: 'Using AI to create unique personas based on your description...',
      });
      
      try {
        const generatedPersonas = await generatePersona(description);
        setPersonas(generatedPersonas);
        setCurrentPersonaIndex(0);
        
        // Check if we're using fallback personas by looking for predefined names
        const fallbackNames = ["Power User Pat", "Casual User Chris", "New User Noa", "Admin User Avery"];
        const isUsingFallback = generatedPersonas.some(p => fallbackNames.includes(p.name));
        
        setUsingFallback(isUsingFallback);
        
        if (isUsingFallback) {
          toast({
            title: 'Using basic personas',
            description: 'AI generation failed. Using basic personas instead. Try a different model in Debug API.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Personas generated!',
            description: '4 personas have been created based on your description.',
          });
        }
      } catch (error) {
        console.error('Generation error:', error);
        // Show a more detailed error message
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (error instanceof Error) {
          errorMessage = error.message;
          
          // Add some helpful guidance for common errors
          if (errorMessage.includes('API key')) {
            errorMessage = 'OpenRouter API key is missing or invalid. Please check your .env file and make sure VITE_OPENROUTER_API_KEY is set correctly.';
          } else if (errorMessage.includes('CORS') || errorMessage.includes('Network')) {
            errorMessage = 'Network error. Please check your internet connection and ensure OpenRouter is accessible.';
          }
        }
        
        toast({
          title: 'AI Generation Failed',
          description: errorMessage,
          variant: 'destructive'
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPersona = (index: number) => {
    setCurrentPersonaIndex(index);
    if (isEditing) {
      setIsEditing(false);
      setEditedPersona(null);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (editedPersona) {
        const updatedPersonas = [...personas];
        updatedPersonas[currentPersonaIndex] = editedPersona;
        setPersonas(updatedPersonas);
        toast({
          title: 'Persona updated',
          description: `${editedPersona.name} has been successfully updated.`,
        });
      }
      setIsEditing(false);
      setEditedPersona(null);
    } else {
      // Start editing
      setEditedPersona({...currentPersona!});
      setIsEditing(true);
    }
  };

  const handleNavigatePersona = (direction: 'prev' | 'next') => {
    if (personas.length === 0) return;

    if (isEditing) {
      // If editing, save changes before navigating
      if (editedPersona) {
        const updatedPersonas = [...personas];
        updatedPersonas[currentPersonaIndex] = editedPersona;
        setPersonas(updatedPersonas);
      }
    }

    if (direction === 'prev') {
      setCurrentPersonaIndex((prev) => 
        prev === 0 ? personas.length - 1 : prev - 1
      );
    } else {
      setCurrentPersonaIndex((prev) => 
        prev === personas.length - 1 ? 0 : prev + 1
      );
    }

    if (isEditing) {
      const newIndex = direction === 'prev' 
        ? (currentPersonaIndex === 0 ? personas.length - 1 : currentPersonaIndex - 1)
        : (currentPersonaIndex === personas.length - 1 ? 0 : currentPersonaIndex + 1);
      setEditedPersona({...personas[newIndex]});
    }
  };

  const handleEditableChange = (
    e: React.FocusEvent<HTMLElement>, 
    field: string,
    nestedField?: string,
    index?: number
  ) => {
    if (!editedPersona || !isEditing) return;
    
    const value = e.currentTarget.innerText;
    
    let updatedPersona = {...editedPersona};
    
    if (nestedField && typeof index === 'number') {
      // Handle array fields like goals, painPoints, expectations
      const arrayField = updatedPersona[nestedField as keyof typeof updatedPersona] as string[];
      const newArray = [...arrayField];
      newArray[index] = value;
      updatedPersona = {...updatedPersona, [nestedField]: newArray};
    } else if (field === 'traits' && typeof index === 'number') {
      // Handle traits which is an array of objects
      const newTraits = [...updatedPersona.traits];
      newTraits[index] = {...newTraits[index], name: value};
      updatedPersona = {...updatedPersona, traits: newTraits};
    } else {
      // Handle simple fields like name, demographic, mainGoal
      updatedPersona = {...updatedPersona, [field]: value};
    }
    
    setEditedPersona(updatedPersona);
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editedPersona) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result && typeof event.target.result === 'string') {
          setEditedPersona({
            ...editedPersona,
            imageUrl: event.target.result
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-24 pb-20 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Persona Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Describe your target users or product context and we'll generate detailed personas with AI to guide your product development.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-16">
          <div className="card-shadow rounded-xl p-8 bg-white relative overflow-hidden group">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl group-hover:bg-purple-300/20 transition-colors duration-500"></div>
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl group-hover:bg-indigo-300/20 transition-colors duration-500"></div>
            
            <div className="flex justify-between items-center mb-2 relative z-10">
              <label htmlFor="description" className="block font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                Describe your product or target users
              </label>
              <div className="relative z-20">
                <ModelSelector />
              </div>
            </div>
            <Textarea
              id="description"
              placeholder="e.g., Mobile app for fitness enthusiasts who want to track their workouts and nutrition"
              className="mb-4 min-h-[120px] bg-white/50 backdrop-blur-sm border-2 border-gray-100 focus:border-purple-200 focus:ring-2 focus:ring-purple-100 rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-700 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]" 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Personas...
                </>
              ) : (
                <>
                  Generate Personas with AI
                  <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isGenerating && <LoadingState />}
        
        {!isGenerating && personas.length > 0 && (
          <div className="mb-16 animate-scale-in">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Your Generated Personas
              {usingFallback && (
                <span className="block text-sm font-normal text-amber-600 mt-2">
                  Using basic fallback personas. Try a different model in the Debug API panel.
                </span>
              )}
            </h2>
            
            {/* Thumbnail Navigation */}
            <div className="flex items-center justify-center mb-10">
              <Button 
                variant="outline" 
                size="icon" 
                className="mr-4 rounded-full" 
                onClick={() => handleNavigatePersona('prev')}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous persona</span>
              </Button>
              
              <div className="grid grid-cols-4 gap-4 max-w-xl">
                {personas.map((persona, index) => (
                  <PersonaThumbnail 
                    key={persona.id}
                    persona={persona}
                    isSelected={index === currentPersonaIndex}
                    onClick={() => handleSelectPersona(index)}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="ml-4 rounded-full" 
                onClick={() => handleNavigatePersona('next')}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next persona</span>
              </Button>
            </div>
            
            {/* Current Persona View */}
            {currentPersona && (
              <div className="max-w-3xl mx-auto relative">
                <div className="card-shadow overflow-hidden rounded-xl border-none bg-white">
                  <div className="p-6">
                    {/* Header with name, demographic, and traits */}
                    <div className="flex items-start gap-4 border-b border-gray-100 pb-5">
                      <div 
                        className={`w-24 h-24 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0 ${isEditing ? 'cursor-pointer relative group' : ''}`}
                        onClick={isEditing ? handleImageUpload : undefined}
                      >
                        {isEditing && (
                          <input 
                            type="file" 
                            className="hidden" 
                            ref={fileInputRef} 
                            accept="image/*" 
                            onChange={handleFileChange}
                          />
                        )}
                        <img 
                          src={isEditing ? editedPersona?.imageUrl : currentPersona.imageUrl} 
                          alt={isEditing ? editedPersona?.name : currentPersona.name} 
                          className="w-full h-full object-cover"
                        />
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs">Change</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 
                          className={`text-xl font-bold mb-1 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleEditableChange(e, 'name')}
                        >
                          {isEditing ? editedPersona?.name : currentPersona.name}
                        </h3>
                        <p 
                          className={`text-gray-600 mb-3 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleEditableChange(e, 'demographic')}
                        >
                          {isEditing ? editedPersona?.demographic : currentPersona.demographic}
                        </p>
                        
                        {/* Traits moved here */}
                        <div className="flex flex-wrap gap-2">
                          {(isEditing ? editedPersona?.traits : currentPersona.traits).map((trait, index) => (
                            <span 
                              key={index} 
                              className={`text-sm px-3 py-1 rounded-full ${trait.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                                trait.color === 'green' ? 'bg-green-100 text-green-800' : 
                                trait.color === 'purple' ? 'bg-purple-100 text-purple-800' : 
                                trait.color === 'pink' ? 'bg-pink-100 text-pink-800' : 
                                trait.color === 'orange' ? 'bg-orange-100 text-orange-800' : 
                                trait.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'} ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                              contentEditable={isEditing}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => handleEditableChange(e, 'traits', undefined, index)}
                            >
                              {trait.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Goal and Goals section */}
                    <div className="grid grid-cols-12 gap-8 mt-6 border-b border-gray-100 pb-6">
                      {/* Main Goal */}
                      <div className="col-span-12 md:col-span-5">
                        <h4 className={`font-bold text-lg mb-2 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                           contentEditable={isEditing}
                           suppressContentEditableWarning={true}>
                          Main Goal
                        </h4>
                        <p 
                          className={`text-gray-700 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleEditableChange(e, 'mainGoal')}
                        >
                          {isEditing ? editedPersona?.mainGoal : currentPersona.mainGoal}
                        </p>
                      </div>
                      
                      {/* Goals */}
                      <div className="col-span-12 md:col-span-7">
                        <h4 className={`font-bold text-lg mb-2 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                           contentEditable={isEditing}
                           suppressContentEditableWarning={true}>
                          Goals
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {(isEditing ? editedPersona?.goals : currentPersona.goals).map((goal, index) => (
                            <li 
                              key={index}
                              className={isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}
                              contentEditable={isEditing}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => handleEditableChange(e, 'goals', 'goals', index)}
                            >
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pain points and Expectations section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      {/* Pain points */}
                      <div>
                        <h4 className={`font-bold text-lg mb-2 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                           contentEditable={isEditing}
                           suppressContentEditableWarning={true}>
                          Pain points & objections
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {(isEditing ? editedPersona?.painPoints : currentPersona.painPoints).map((point, index) => (
                            <li 
                              key={index}
                              className={isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}
                              contentEditable={isEditing}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => handleEditableChange(e, 'painPoints', 'painPoints', index)}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Expectations */}
                      <div>
                        <h4 className={`font-bold text-lg mb-2 ${isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}`}
                           contentEditable={isEditing}
                           suppressContentEditableWarning={true}>
                          Expectations & needs
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {(isEditing ? editedPersona?.expectations : currentPersona.expectations).map((expectation, index) => (
                            <li 
                              key={index}
                              className={isEditing ? 'border-b border-dashed border-gray-300 focus:outline-none' : ''}
                              contentEditable={isEditing}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => handleEditableChange(e, 'expectations', 'expectations', index)}
                            >
                              {expectation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Edit/Save button */}
                <Button 
                  onClick={handleEditToggle} 
                  className="absolute top-4 right-4 rounded-full"
                  size="icon"
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                  <span className="sr-only">{isEditing ? "Save changes" : "Edit persona"}</span>
                </Button>
                
                {/* Download button - only show when not editing */}
                {!isEditing && <DownloadPersona persona={currentPersona} index={currentPersonaIndex + 1} productDescription={description} />}
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Generator;
