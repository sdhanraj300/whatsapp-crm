'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MessageSquare, BarChart } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Reminders",
      description: "Never forget to follow up with automated reminders that adapt to your schedule."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Multi-Channel Follow-Ups",
      description: "Reach out via email, SMS, or WhatsApp - all from one platform."
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Track open rates, responses, and conversion metrics to optimize your outreach."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Easy Integration",
      description: "Connect with your existing CRM and tools for a seamless workflow."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            How FollowUp Works
          </h2>
          <p className="text-lg text-gray-300">
            Simple, powerful features designed to help you close more deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 h-full"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
