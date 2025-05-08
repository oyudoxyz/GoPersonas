
import React from 'react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    quote: "Personify has completely transformed how we approach product development. The personas are incredibly realistic and save us hours of research time.",
    author: "Sarah Johnson",
    role: "Product Manager at Designify",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    quote: "Our team uses Personify personas for every new feature. The level of detail in each persona helps us anticipate user needs we wouldn't have considered.",
    author: "Michael Chen",
    role: "UX Director at TechFlow",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "As a startup with limited resources, Personify gives us enterprise-level user insights without the expensive research. It's a game-changer for us.",
    author: "Elena Rodriguez",
    role: "Founder of LaunchPad",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const TestimonialSection = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Loved by Design Teams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-shadow p-8 rounded-xl border-none">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
