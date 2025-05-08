import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { PersonaType } from '@/components/PersonaCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Save, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import PersonaCard from '@/components/PersonaCard';
import DownloadPersona from '@/components/DownloadPersona';
import imageMetadata from '../data/imageMetadata.json';

// Custom DialogContent without the X button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
CustomDialogContent.displayName = "CustomDialogContent";

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Generate 20 example personas from image metadata with more realistic content
const examplePersonas: PersonaType[] = [
  {
    id: "ex1",
    name: "Chef Marcus",
    imageUrl: "/images/chef-marcus.png",
    demographic: "Male, 54, Restaurant Owner",
    traits: [
      { name: "Disciplined", color: "blue" },
      { name: "Detail-Oriented", color: "green" },
      { name: "Resilient", color: "orange" }
    ],
    mainGoal: "Streamline restaurant operations while maintaining exceptional food quality.",
    goals: [
      "Efficiently manage staff schedules and performance",
      "Track inventory and reduce waste",
      "Enhance customer satisfaction and loyalty"
    ],
    painPoints: [
      "Limited time to manage both kitchen and business tasks",
      "Staff turnover and training challenges",
      "Difficulty maintaining consistency across busy shifts"
    ],
    expectations: [
      "Intuitive scheduling tools that reduce administrative work",
      "Real-time inventory management with automated alerts",
      "Customer feedback analytics to improve offerings"
    ]
  },
  {
    id: "ex2",
    name: "Retired Teacher Margaret",
    imageUrl: "/images/mrs-thompson.png",
    demographic: "Female, 72, Retired Educator",
    traits: [
      { name: "Patient", color: "yellow" },
      { name: "Caring", color: "pink" },
      { name: "Curious", color: "green" }
    ],
    mainGoal: "Stay mentally active and socially connected in retirement.",
    goals: [
      "Discover community activities that match her interests",
      "Access digital learning resources with ease",
      "Maintain meaningful connections with family and friends"
    ],
    painPoints: [
      "Finds complicated technology interfaces frustrating",
      "Difficulty finding local events relevant to her interests",
      "Feels isolated since retiring from teaching"
    ],
    expectations: [
      "Clear, large-text interfaces with minimal steps",
      "Personalized recommendations for nearby activities",
      "Simple video calling options to connect with family"
    ]
  },
  {
    id: "ex3",
    name: "Community Leader Rosa",
    imageUrl: "/images/rosa-mendez.png",
    demographic: "Female, 47, Cultural Program Director",
    traits: [
      { name: "Empathetic", color: "purple" },
      { name: "Organized", color: "blue" },
      { name: "Inspirational", color: "orange" }
    ],
    mainGoal: "Build stronger community bonds through cultural programs and education.",
    goals: [
      "Increase participation in local cultural events",
      "Secure funding and resources for community initiatives",
      "Preserve and promote cultural heritage through education"
    ],
    painPoints: [
      "Limited resources for outreach and promotion",
      "Difficulty coordinating volunteers and schedules",
      "Bureaucratic barriers to implementing programs"
    ],
    expectations: [
      "Centralized platform for event management and promotion",
      "Grant application tracking and deadline reminders",
      "Simple tools for creating bilingual communications"
    ]
  },
  {
    id: "ex4",
    name: "Nurse Carmen",
    imageUrl: "/images/carmen-rivera.png",
    demographic: "Female, 38, Pediatric Nurse",
    traits: [
      { name: "Compassionate", color: "pink" },
      { name: "Efficient", color: "green" },
      { name: "Adaptable", color: "yellow" }
    ],
    mainGoal: "Provide exceptional patient care while managing a heavy workload.",
    goals: [
      "Efficiently track patient information during busy shifts",
      "Coordinate care with doctors and specialists seamlessly",
      "Balance work responsibilities with personal wellbeing"
    ],
    painPoints: [
      "Frequent interruptions during critical care moments",
      "Documentation takes time away from patient interaction",
      "Inconsistent communication between departments"
    ],
    expectations: [
      "Mobile-friendly tools for bedside documentation",
      "Secure messaging system for quick team communication",
      "Automated patient monitoring alerts for critical changes"
    ]
  },
  {
    id: "ex5",
    name: "Tech Executive David",
    imageUrl: "/images/david-chen.png",
    demographic: "Male, 45, Product Director",
    traits: [
      { name: "Strategic", color: "blue" },
      { name: "Data-Driven", color: "purple" },
      { name: "Innovative", color: "orange" }
    ],
    mainGoal: "Drive product innovation while ensuring market fit and business growth.",
    goals: [
      "Align team efforts toward key business objectives",
      "Make data-informed decisions quickly and confidently",
      "Stay ahead of market trends and competitor movements"
    ],
    painPoints: [
      "Information silos between departments slow decision making",
      "Difficulty balancing short-term results with long-term vision",
      "Struggle to prioritize features with limited development resources"
    ],
    expectations: [
      "Real-time dashboards showing key performance metrics",
      "Collaborative roadmapping tools for cross-functional planning",
      "AI-powered market analysis and competitive intelligence"
    ]
  },
  {
    id: "ex6",
    name: "Developer Arjun",
    imageUrl: "/images/arjun-patel.png",
    demographic: "Male, 29, Backend Engineer",
    traits: [
      { name: "Analytical", color: "green" },
      { name: "Focused", color: "blue" },
      { name: "Collaborative", color: "yellow" }
    ],
    mainGoal: "Create stable, scalable code while continuously improving technical skills.",
    goals: [
      "Build maintainable systems that solve real user problems",
      "Collaborate effectively with global team members",
      "Stay current with evolving technologies and frameworks"
    ],
    painPoints: [
      "Interruptions break deep focus and reduce productivity",
      "Technical debt slows down new feature development",
      "Time zone differences complicate real-time collaboration"
    ],
    expectations: [
      "Clean, well-documented APIs and development environments",
      "Asynchronous collaboration tools that respect focus time",
      "Integrated learning resources for new technologies"
    ]
  },
  {
    id: "ex7",
    name: "Marketing Intern Samir",
    imageUrl: "/images/samir-alfarsi.png",
    demographic: "Male, 23, Graduate Student",
    traits: [
      { name: "Energetic", color: "orange" },
      { name: "Creative", color: "purple" },
      { name: "Ambitious", color: "blue" }
    ],
    mainGoal: "Gain practical marketing experience and build professional connections.",
    goals: [
      "Apply classroom knowledge to real-world campaigns",
      "Develop a portfolio of successful marketing projects",
      "Network with industry professionals and potential employers"
    ],
    painPoints: [
      "Limited practical experience makes applying theory difficult",
      "Unclear expectations and minimal guidance on projects",
      "Balancing internship responsibilities with graduate studies"
    ],
    expectations: [
      "Clear project briefs with specific objectives and success metrics",
      "Regular feedback and mentorship from experienced marketers",
      "Opportunities to present ideas and receive constructive criticism"
    ]
  },
  {
    id: "ex8",
    name: "Student Amina",
    imageUrl: "/images/amina-johnson.png",
    demographic: "Female, 21, Undergraduate",
    traits: [
      { name: "Motivated", color: "blue" },
      { name: "Social", color: "pink" },
      { name: "Adaptable", color: "green" }
    ],
    mainGoal: "Balance academic success with financial stability and social connections.",
    goals: [
      "Maintain high GPA while working part-time",
      "Build meaningful relationships and professional networks",
      "Develop practical skills for post-graduation employment"
    ],
    painPoints: [
      "Overwhelming course load combined with work commitments",
      "Difficulty organizing study time and assignments effectively",
      "Financial stress affecting focus and performance"
    ],
    expectations: [
      "Intuitive scheduling tools that sync academics and work",
      "Affordable study resources accessible across devices",
      "Flexible learning options for different learning styles"
    ]
  },
  {
    id: "ex9",
    name: "Designer Taylor",
    imageUrl: "/images/nonbinary-graphic-designer.png",
    demographic: "Non-binary, 34, Creative Director",
    traits: [
      { name: "Visionary", color: "purple" },
      { name: "Detail-oriented", color: "green" },
      { name: "Expressive", color: "pink" }
    ],
    mainGoal: "Translate brand values into compelling visual experiences.",
    goals: [
      "Create consistent design systems that scale across platforms",
      "Balance artistic expression with client business objectives",
      "Stay ahead of design trends while maintaining timeless appeal"
    ],
    painPoints: [
      "Client feedback cycles are inefficient and unclear",
      "Difficulty translating abstract concepts into specific deliverables",
      "Managing multiple projects with competing deadlines"
    ],
    expectations: [
      "Collaborative design tools with intuitive feedback mechanisms",
      "Organized asset management across projects and clients",
      "Inspiration resources that connect to practical applications"
    ]
  },
  {
    id: "ex10",
    name: "Elder Ayana",
    imageUrl: "/images/east-african-grandmother.png",
    demographic: "Female, 68, Community Elder",
    traits: [
      { name: "Wise", color: "purple" },
      { name: "Patient", color: "blue" },
      { name: "Nurturing", color: "pink" }
    ],
    mainGoal: "Pass cultural knowledge to younger generations while adapting to modern life.",
    goals: [
      "Connect with family members across distances",
      "Preserve cultural traditions and stories digitally",
      "Navigate essential services like healthcare and banking"
    ],
    painPoints: [
      "Complex technology interfaces with small text and icons",
      "Language barriers when using digital services",
      "Concern about online privacy and security"
    ],
    expectations: [
      "Simple, consistent interfaces with minimal steps",
      "Multilingual support for essential services",
      "Clear visual cues that don't rely on text alone"
    ]
  },
  {
    id: "ex11",
    name: "Content Creator Lin",
    imageUrl: "/images/se-asian-influencer.png",
    demographic: "Female, 26, Social Media Influencer",
    traits: [
      { name: "Trendsetter", color: "pink" },
      { name: "Authentic", color: "green" },
      { name: "Strategic", color: "blue" }
    ],
    mainGoal: "Build an engaged audience while maintaining personal authenticity.",
    goals: [
      "Create consistent content across multiple platforms",
      "Collaborate with brands aligned with personal values",
      "Track performance metrics to optimize content strategy"
    ],
    painPoints: [
      "Algorithm changes affecting reach and engagement",
      "Time-consuming content creation and editing process",
      "Balancing authentic expression with commercial partnerships"
    ],
    expectations: [
      "Intuitive content scheduling across platforms",
      "Comprehensive analytics with actionable insights",
      "Efficient editing tools for various content formats"
    ]
  },
  {
    id: "ex12",
    name: "Business Owner Khalid",
    imageUrl: "/images/me-business-owner.png",
    demographic: "Male, 42, Small Business Owner",
    traits: [
      { name: "Practical", color: "blue" },
      { name: "Determined", color: "orange" },
      { name: "Detail-focused", color: "green" }
    ],
    mainGoal: "Grow business profitability while maintaining customer relationships.",
    goals: [
      "Streamline operations to reduce overhead costs",
      "Increase customer retention and referrals",
      "Maintain accurate financial records for decision-making"
    ],
    painPoints: [
      "Administrative tasks take time away from customer service",
      "Cash flow fluctuations make planning difficult",
      "Difficulty competing with larger businesses' marketing"
    ],
    expectations: [
      "All-in-one business management platform",
      "Clear financial reporting with forecasting tools",
      "Customer relationship management that requires minimal effort"
    ]
  },
  {
    id: "ex13",
    name: "HR Manager Janelle",
    imageUrl: "/images/black-hr-manager.png",
    demographic: "Female, 41, Human Resources Director",
    traits: [
      { name: "Diplomatic", color: "blue" },
      { name: "Organized", color: "green" },
      { name: "Empathetic", color: "pink" }
    ],
    mainGoal: "Create an inclusive workplace culture that attracts and retains talent.",
    goals: [
      "Streamline recruitment and onboarding processes",
      "Develop effective employee engagement initiatives",
      "Ensure compliance with changing regulations"
    ],
    painPoints: [
      "Siloed HR systems require duplicate data entry",
      "Difficulty measuring effectiveness of culture initiatives",
      "Balancing employee advocacy with company objectives"
    ],
    expectations: [
      "Integrated HR platform with automated workflows",
      "Analytics dashboard for tracking engagement metrics",
      "Customizable policies and compliance checklists"
    ]
  },
  {
    id: "ex14",
    name: "Environmental Scientist Blake",
    imageUrl: "/images/enviro-scientist.png",
    demographic: "Male, 29, Field Researcher",
    traits: [
      { name: "Analytical", color: "blue" },
      { name: "Passionate", color: "orange" },
      { name: "Detail-oriented", color: "green" }
    ],
    mainGoal: "Collect accurate environmental data to inform conservation efforts.",
    goals: [
      "Efficiently gather and organize field research data",
      "Collaborate with international research teams",
      "Translate research findings into accessible information"
    ],
    painPoints: [
      "Limited connectivity in remote research locations",
      "Complex data sets requiring specialized analysis",
      "Communicating technical findings to non-scientific audiences"
    ],
    expectations: [
      "Mobile tools that function offline with data syncing",
      "Visualization tools for complex environmental data",
      "Collaboration platforms that work with low bandwidth"
    ]
  },
  {
    id: "ex15",
    name: "Teacher Priya",
    imageUrl: "/images/sa-elementary-teacher.png",
    demographic: "Female, 35, Elementary Educator",
    traits: [
      { name: "Nurturing", color: "pink" },
      { name: "Creative", color: "purple" },
      { name: "Patient", color: "blue" }
    ],
    mainGoal: "Foster a love of learning while addressing diverse student needs.",
    goals: [
      "Create engaging lessons for various learning styles",
      "Track individual student progress effectively",
      "Maintain communication with parents and school staff"
    ],
    painPoints: [
      "Limited classroom time to address individual needs",
      "Administrative paperwork reduces teaching preparation time",
      "Difficulty finding diverse, inclusive teaching materials"
    ],
    expectations: [
      "Customizable lesson planning tools with resource libraries",
      "Simplified student assessment and progress tracking",
      "Efficient parent communication platform integrated with school systems"
    ]
  },
  {
    id: "ex16",
    name: "Student Athlete Carlos",
    imageUrl: "/images/latino-teen-student.png",
    demographic: "Male, 17, High School Student",
    traits: [
      { name: "Energetic", color: "orange" },
      { name: "Ambitious", color: "blue" },
      { name: "Disciplined", color: "green" }
    ],
    mainGoal: "Balance academic achievement with athletic excellence.",
    goals: [
      "Maintain competitive GPA for college applications",
      "Improve athletic performance to qualify for scholarships",
      "Manage time effectively between studies and sports"
    ],
    painPoints: [
      "Exhausting schedule leaves little time for schoolwork",
      "Difficulty tracking assignments across different classes",
      "Stress from competing expectations of coaches and teachers"
    ],
    expectations: [
      "Mobile-friendly homework and schedule management",
      "Study resources that accommodate practice schedules",
      "Tools to track both academic and athletic progress"
    ]
  },
  {
    id: "ex17",
    name: "Urban Artist Kai",
    imageUrl: "/images/ea-nonbinary-artist.png",
    demographic: "Non-binary, 25, Multimedia Artist",
    traits: [
      { name: "Creative", color: "purple" },
      { name: "Independent", color: "orange" },
      { name: "Expressive", color: "pink" }
    ],
    mainGoal: "Express authentic perspectives through accessible art forms.",
    goals: [
      "Develop a distinctive artistic voice and style",
      "Build a sustainable career through multiple revenue streams",
      "Connect with communities that resonate with their work"
    ],
    painPoints: [
      "Inconsistent income makes financial planning difficult",
      "Limited access to affordable studio space and materials",
      "Balancing artistic integrity with commercial viability"
    ],
    expectations: [
      "Flexible portfolio platforms that showcase diverse media",
      "Direct-to-fan sales options with minimal fees",
      "Community spaces for collaboration and skill-sharing"
    ]
  },
  {
    id: "ex18",
    name: "Park Ranger Miguel",
    imageUrl: "/images/indigenous-park-ranger.png",
    demographic: "Male, 41, Conservation Specialist",
    traits: [
      { name: "Knowledgeable", color: "green" },
      { name: "Patient", color: "blue" },
      { name: "Observant", color: "purple" }
    ],
    mainGoal: "Protect natural resources while educating visitors about conservation.",
    goals: [
      "Monitor and maintain protected ecosystems effectively",
      "Create engaging educational experiences for visitors",
      "Document and report changing environmental conditions"
    ],
    painPoints: [
      "Limited technology access in remote park locations",
      "Difficulty balancing visitor services with conservation work",
      "Maintaining accurate records across large geographical areas"
    ],
    expectations: [
      "Mobile tools that function without consistent connectivity",
      "Simple systems for visitor management and education",
      "Efficient reporting templates for environmental monitoring"
    ]
  },
  {
    id: "ex19",
    name: "College Freshman Emma",
    imageUrl: "/images/white-college-freshman.png",
    demographic: "Female, 18, First-Year Student",
    traits: [
      { name: "Curious", color: "purple" },
      { name: "Adaptable", color: "green" },
      { name: "Social", color: "pink" }
    ],
    mainGoal: "Successfully transition to college life academically and socially.",
    goals: [
      "Develop effective study habits for college-level courses",
      "Build new friendships and social connections",
      "Explore potential majors and career paths"
    ],
    painPoints: [
      "Overwhelming amount of information during orientation",
      "Difficulty navigating campus services and resources",
      "Anxiety about making the right academic choices"
    ],
    expectations: [
      "Intuitive campus navigation and service information",
      "Clear degree planning tools with requirement tracking",
      "Social platforms to connect with peers and organizations"
    ]
  },
  {
    id: "ex20",
    name: "Retired Judge Walter",
    imageUrl: "/images/black-retired-judge.png",
    demographic: "Male, 65, Legal Consultant",
    traits: [
      { name: "Analytical", color: "blue" },
      { name: "Principled", color: "purple" },
      { name: "Articulate", color: "green" }
    ],
    mainGoal: "Share legal expertise while maintaining a balanced retirement lifestyle.",
    goals: [
      "Consult on complex cases selectively",
      "Mentor young legal professionals",
      "Stay current on evolving legal precedents"
    ],
    painPoints: [
      "Digital legal research platforms with poor usability",
      "Difficulty limiting professional commitments to maintain work-life balance",
      "Frustration with inefficiencies in the legal system"
    ],
    expectations: [
      "Streamlined legal research tools with intuitive interfaces",
      "Secure virtual consultation platforms for remote work",
      "Efficient document management systems for case files"
    ]
  }
];

const ExamplesPage = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersona, setEditedPersona] = useState<PersonaType | null>(null);

  // Handle edit start
  const handleEdit = () => {
    setIsEditing(true);
    setEditedPersona(selectedPersona);
  };

  // Handle edit save
  const handleSave = () => {
    setIsEditing(false);
    setSelectedPersona(editedPersona);
  };

  // Handle edit cancel
  const handleCancel = () => {
    setIsEditing(false);
    setEditedPersona(selectedPersona);
  };

  // Handle field change
  const handleFieldChange = (field: keyof PersonaType, value: any) => {
    if (!editedPersona) return;
    setEditedPersona({ ...editedPersona, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Design Personas Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Explore our curated collection of diverse user personas. Each card represents a unique perspective, 
            helping you understand and empathize with different user needs and goals.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/generator" className="flex items-center gap-2">
                Try the Generator
              </Link>
            </Button>
          </div>
        </div>

        {/* Redesigned card grid with max-width */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
            {examplePersonas.map((persona) => (
              <Card
                key={persona.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 bg-white"
                onClick={() => { setSelectedPersona(persona); setIsEditing(false); setEditedPersona(null); }}
              >
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <img
                    src={persona.imageUrl}
                    alt={persona.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{persona.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{persona.demographic}</p>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {persona.traits.slice(0, 3).map((trait, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                          idx % 6 === 0 ? 'bg-blue-50 text-blue-700' : 
                          idx % 6 === 1 ? 'bg-green-50 text-green-700' : 
                          idx % 6 === 2 ? 'bg-purple-50 text-purple-700' : 
                          idx % 6 === 3 ? 'bg-pink-50 text-pink-700' : 
                          idx % 6 === 4 ? 'bg-orange-50 text-orange-700' : 
                          'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {trait.name}
                      </span>
                    ))}
                    {persona.traits.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                        +{persona.traits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Persona Detail Dialog */}
      <Dialog open={!!selectedPersona} onOpenChange={(open) => { if (!open) { setSelectedPersona(null); setIsEditing(false); setEditedPersona(null); } }}>
        <CustomDialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {selectedPersona && (
            <div className="relative">
              {/* Edit/Save button - match Generator.tsx positioning */}
              <Button 
                onClick={isEditing ? handleSave : handleEdit}
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
              
              {/* Download button - only show when not editing, match Generator.tsx */}
              {!isEditing && <DownloadPersona persona={selectedPersona} />}

              {/* Card styling to match Generator.tsx */}
              <div className="card-shadow overflow-hidden rounded-xl border-none bg-white">
                <div className="p-6">
                  {/* Show editable fields if editing, else show regular view */}
                  {/* Header with name, demographic, and traits */}
                  <div className="flex items-start gap-4 border-b border-gray-100 pb-5">
                    <div 
                      className={`w-24 h-24 rounded-lg overflow-hidden bg-purple-100 flex-shrink-0 ${isEditing ? 'cursor-pointer relative group' : ''}`}
                    >
                      <img 
                        src={isEditing ? editedPersona?.imageUrl : selectedPersona.imageUrl} 
                        alt={isEditing ? editedPersona?.name : selectedPersona.name} 
                        className="w-full h-full object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs">Change</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      {!isEditing ? (
                        <>
                          <h3 className="text-xl font-bold mb-1">{selectedPersona.name}</h3>
                          <p className="text-gray-600 mb-3">{selectedPersona.demographic}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {selectedPersona.traits.map((trait, index) => (
                              <span 
                                key={index} 
                                className={`text-sm px-3 py-1 rounded-full ${
                                  trait.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                                  trait.color === 'green' ? 'bg-green-100 text-green-800' : 
                                  trait.color === 'purple' ? 'bg-purple-100 text-purple-800' : 
                                  trait.color === 'pink' ? 'bg-pink-100 text-pink-800' : 
                                  trait.color === 'orange' ? 'bg-orange-100 text-orange-800' : 
                                  trait.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-gray-100 text-gray-800'}`}
                              >
                                {trait.name}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            className="text-xl font-bold mb-1 w-full outline-none border-b border-gray-200 focus:border-purple-400"
                            value={editedPersona?.name}
                            onChange={e => handleFieldChange('name', e.target.value)}
                          />
                          <input
                            className="text-gray-600 mb-3 w-full outline-none border-b border-gray-200 focus:border-purple-400"
                            value={editedPersona?.demographic}
                            onChange={e => handleFieldChange('demographic', e.target.value)}
                          />
                          <div className="flex flex-wrap gap-2">
                            {editedPersona?.traits.map((trait, index) => (
                              <input
                                key={index}
                                className={`text-sm px-3 py-1 rounded-full outline-none border border-gray-200 focus:border-purple-400 ${
                                  trait.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                                  trait.color === 'green' ? 'bg-green-100 text-green-800' : 
                                  trait.color === 'purple' ? 'bg-purple-100 text-purple-800' : 
                                  trait.color === 'pink' ? 'bg-pink-100 text-pink-800' : 
                                  trait.color === 'orange' ? 'bg-orange-100 text-orange-800' : 
                                  trait.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-gray-100 text-gray-800'}`}
                                value={trait.name}
                                onChange={e => {
                                  const newTraits = [...(editedPersona.traits || [])];
                                  newTraits[index] = { ...newTraits[index], name: e.target.value };
                                  handleFieldChange('traits', newTraits);
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Main Goal and Goals section */}
                  <div className="grid grid-cols-12 gap-8 mt-6 border-b border-gray-100 pb-6">
                    <div className="col-span-12 md:col-span-5">
                      <h4 className="font-bold text-lg mb-2">Main Goal</h4>
                      {!isEditing ? (
                        <p className="text-gray-700">{selectedPersona.mainGoal}</p>
                      ) : (
                        <textarea
                          className="text-gray-700 w-full outline-none border-b border-gray-200 focus:border-purple-400"
                          value={editedPersona?.mainGoal}
                          onChange={e => handleFieldChange('mainGoal', e.target.value)}
                        />
                      )}
                    </div>
                    
                    <div className="col-span-12 md:col-span-7">
                      <h4 className="font-bold text-lg mb-2">Goals</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {(isEditing ? editedPersona?.goals : selectedPersona.goals).map((goal, index) => (
                          !isEditing ? (
                            <li key={index}>{goal}</li>
                          ) : (
                            <li key={index}>
                              <input
                                className="w-full outline-none border-b border-gray-200 focus:border-purple-400"
                                value={goal}
                                onChange={e => {
                                  const newGoals = [...(editedPersona?.goals || [])];
                                  newGoals[index] = e.target.value;
                                  handleFieldChange('goals', newGoals);
                                }}
                              />
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pain points and Expectations section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h4 className="font-bold text-lg mb-2">Pain points & objections</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {(isEditing ? editedPersona?.painPoints : selectedPersona.painPoints).map((point, index) => (
                          !isEditing ? (
                            <li key={index}>{point}</li>
                          ) : (
                            <li key={index}>
                              <input
                                className="w-full outline-none border-b border-gray-200 focus:border-purple-400"
                                value={point}
                                onChange={e => {
                                  const newPainPoints = [...(editedPersona?.painPoints || [])];
                                  newPainPoints[index] = e.target.value;
                                  handleFieldChange('painPoints', newPainPoints);
                                }}
                              />
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-2">Expectations & needs</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {(isEditing ? editedPersona?.expectations : selectedPersona.expectations).map((expectation, index) => (
                          !isEditing ? (
                            <li key={index}>{expectation}</li>
                          ) : (
                            <li key={index}>
                              <input
                                className="w-full outline-none border-b border-gray-200 focus:border-purple-400"
                                value={expectation}
                                onChange={e => {
                                  const newExpectations = [...(editedPersona?.expectations || [])];
                                  newExpectations[index] = e.target.value;
                                  handleFieldChange('expectations', newExpectations);
                                }}
                              />
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CustomDialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default ExamplesPage;
