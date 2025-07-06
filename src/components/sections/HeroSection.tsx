'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Glassmorphism overlay - reduced blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/1 backdrop-blur-[1px]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-50"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-xl">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Never Let a Lead Go Cold Again
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span 
              className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Never Miss a <span className="text-green-500 italic font-medium">FollowUp</span>
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Close More Deals with Ease
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            FollowUp helps businesses turn more leads into customers with automated, personalized follow-ups that keep your pipeline moving forward.
          </motion.p>

          {/* CTA Buttons with enhanced styling */}
          <motion.div 
            className="mt-12 flex items-center justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-6 text-lg shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
              <Link href="/register">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 px-8 py-6 text-lg shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-md">
              <Link href="/demo" className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
