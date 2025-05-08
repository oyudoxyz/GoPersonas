import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export type PersonaTrait = {
  name: string;
  color: string;
};

export type PersonaType = {
  id: string;
  name: string;
  imageUrl: string;
  demographic: string;
  traits: PersonaTrait[];
  mainGoal: string;
  goals: string[];
  painPoints: string[];
  expectations: string[];
};

interface PersonaCardProps {
  persona: PersonaType;
  isEditing?: boolean;
  onEditableChange?: (e: React.FocusEvent<HTMLElement>, field: string, nestedField?: string, index?: number) => void;
  onImageUpload?: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const getTraitBgColor = (color: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-100 text-blue-800';
    case 'green': return 'bg-green-100 text-green-800';
    case 'purple': return 'bg-purple-100 text-purple-800';
    case 'pink': return 'bg-pink-100 text-pink-800';
    case 'orange': return 'bg-orange-100 text-orange-800';
    case 'yellow': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Helper component for inline editable fields
const EditableField: React.FC<React.PropsWithChildren<{
  isEditing?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void; // Explicitly HTMLElement
  className?: string;
  as?: 'h3' | 'p' | 'span' | 'li'; // Restrict to common HTML text elements
}>> = ({ isEditing, onBlur, children, className, as: Element = 'p' }) => {
  if (isEditing) {
    return (
      <Element
        contentEditable
        suppressContentEditableWarning
        onBlur={onBlur}
        className={`border-b border-dashed border-gray-300 focus:outline-none focus:border-purple-500 ${className || ''}`}
      >
        {children}
      </Element>
    );
  }
  return <Element className={className}>{children}</Element>;
};

const PersonaCard: React.FC<PersonaCardProps> = ({ 
  persona, 
  isEditing,
  onEditableChange,
  onImageUpload,
  fileInputRef,
  onFileChange 
}) => {
  return (
    <Card className="card-shadow overflow-hidden rounded-xl border-none max-w-3xl mx-auto bg-white">
      <div className="p-4 sm:p-6">
        {/* Header Section - Flex column on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-gray-100 pb-5">
          <div 
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0 self-center sm:self-start ${isEditing ? 'cursor-pointer relative group' : ''}`}
            onClick={isEditing ? onImageUpload : undefined}
          >
            {isEditing && fileInputRef && (
              <Input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={onFileChange}
              />
            )}
            <img src={persona.imageUrl} alt={persona.name} className="w-full h-full object-cover" />
            {isEditing && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            )}
          </div>
          <div className="flex-1 w-full">
            <EditableField 
              as="h3"
              isEditing={isEditing} 
              onBlur={(e) => onEditableChange?.(e, 'name')} 
              className="text-xl sm:text-2xl font-bold mb-1 text-gray-900 truncate"
            >
              {persona.name}
            </EditableField>
            <EditableField 
              as="p" // Ensure it's 'p' for proper type check
              isEditing={isEditing} 
              onBlur={(e) => onEditableChange?.(e, 'demographic')} 
              className="text-gray-600 text-sm sm:text-base mb-3 truncate"
            >
              {persona.demographic}
            </EditableField>
            
            <div className="flex flex-wrap gap-2">
              {persona.traits.map((trait, index) => (
                <EditableField
                  key={index}
                  as="span" // Ensure it's 'span'
                  isEditing={isEditing}
                  onBlur={(e) => onEditableChange?.(e, 'traits', 'traits', index)} // Pass 'traits' as nestedField
                  className={`${getTraitBgColor(trait.color)} text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full`}
                >
                  {trait.name}
                </EditableField>
              ))}
            </div>
          </div>
        </div>
        
        {/* Details Section - responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 mt-6 border-b border-gray-100 pb-6">
          <div className="col-span-12 md:col-span-5">
            <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-800">Main Goal</h4>
            <EditableField as="p" isEditing={isEditing} onBlur={(e) => onEditableChange?.(e, 'mainGoal')} className="text-gray-700 text-sm sm:text-base">
              {persona.mainGoal}
            </EditableField>
          </div>
          
          <div className="col-span-12 md:col-span-7">
            <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-800">Goals</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm sm:text-base">
              {persona.goals.map((goal, index) => (
                <EditableField as="li" key={index} isEditing={isEditing} onBlur={(e) => onEditableChange?.(e, 'goals', 'goals', index)}>
                  {goal}
                </EditableField>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-8 mt-6">
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-800">Pain points & objections</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm sm:text-base">
              {persona.painPoints.map((point, index) => (
                <EditableField as="li" key={index} isEditing={isEditing} onBlur={(e) => onEditableChange?.(e, 'painPoints', 'painPoints', index)}>
                  {point}
                </EditableField>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-800">Expectations & needs</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm sm:text-base">
              {persona.expectations.map((expectation, index) => (
                <EditableField as="li" key={index} isEditing={isEditing} onBlur={(e) => onEditableChange?.(e, 'expectations', 'expectations', index)}>
                  {expectation}
                </EditableField>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonaCard;
