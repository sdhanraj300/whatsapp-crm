'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const testimonials = [
  {
    quote: "FollowUp has completely transformed our sales process. Our follow-up rate increased by 85% and we've closed 30% more deals.",
    author: "Sarah Johnson",
    role: "Sales Director, TechGrowth"
  },
  {
    quote: "The automated reminders and follow-up sequences have saved us countless hours. Our team is more productive than ever.",
    author: "Michael Chen",
    role: "Founder, ScaleUp"
  },
  {
    quote: "Before FollowUp, we were losing track of leads. Now our follow-up process is seamless and we're seeing better conversion rates.",
    author: "Emily Rodriguez",
    role: "Marketing Lead, GrowthHive"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '6rem 4rem'
        }} />
      </div>
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-white/20 text-white mb-6 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              Supercharge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Follow-Up</span> Process
            </h2>
            <p className="text-lg text-gray-300">
              Everything you need to turn more leads into customers with less effort.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
