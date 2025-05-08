
import React from 'react';
import { PersonaType } from './PersonaCard';

interface PersonaThumbnailProps {
  persona: PersonaType;
  isSelected: boolean;
  onClick: () => void;
}

const PersonaThumbnail: React.FC<PersonaThumbnailProps> = ({ persona, isSelected, onClick }) => {
  return (
    <div 
      className={`
        cursor-pointer rounded-lg overflow-hidden aspect-square transition-all
        ${isSelected 
          ? 'ring-2 ring-purple-600 scale-105 shadow-lg' 
          : 'opacity-80 hover:opacity-100 ring-1 ring-gray-200'}
      `}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        <img 
          src={persona.imageUrl} 
          alt={persona.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <span className="text-white text-sm font-medium p-2 truncate w-full">
            {persona.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonaThumbnail;
