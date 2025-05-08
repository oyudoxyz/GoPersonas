import React from 'react';
import { Card } from '@/components/ui/card';

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

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  return (
    <Card className="card-shadow overflow-hidden rounded-xl border-none max-w-3xl mx-auto">
      <div className="p-6">
        <div className="flex items-start gap-4 border-b border-gray-100 pb-5">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0">
            <img src={persona.imageUrl} alt={persona.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{persona.name}</h3>
            <p className="text-gray-600 mb-3">{persona.demographic}</p>
            
            <div className="flex flex-wrap gap-2">
              {persona.traits.map((trait, index) => (
                <span 
                  key={index} 
                  className={`${getTraitBgColor(trait.color)} text-sm px-3 py-1 rounded-full`}
                >
                  {trait.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-8 mt-6 border-b border-gray-100 pb-6">
          <div className="col-span-12 md:col-span-5">
            <h4 className="font-bold text-lg mb-2">Main Goal</h4>
            <p className="text-gray-700">{persona.mainGoal}</p>
          </div>
          
          <div className="col-span-12 md:col-span-7">
            <h4 className="font-bold text-lg mb-2">Goals</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {persona.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <h4 className="font-bold text-lg mb-2">Pain points & objections</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {persona.painPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-2">Expectations & needs</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {persona.expectations.map((expectation, index) => (
                <li key={index}>{expectation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonaCard;
