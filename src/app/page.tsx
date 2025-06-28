import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Bot, Zap, BarChart2, MessageSquare, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Leverage cutting-edge AI to automate responses and analyze customer interactions."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Omnichannel Support",
      description: "Seamlessly integrate with WhatsApp, email, and other messaging platforms."
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Get actionable insights with our powerful analytics dashboard."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work together with your team on customer interactions and support tickets."
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed how we handle customer support. The AI suggestions are incredibly accurate.",
      author: "Sarah Johnson",
      role: "Customer Support Manager, TechCorp"
    },
    {
      quote: "The analytics dashboard gives us insights we never had before. Our response time improved by 60%.",
      author: "Michael Chen",
      role: "Operations Director, GrowthLabs"
    },
    {
      quote: "Easy to set up and our team was able to get started immediately. The AI is impressively smart.",
      author: "Emily Rodriguez",
      role: "CEO, StartupX"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/10 via-purple-900/10 to-indigo-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/1 backdrop-blur-sm"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 text-white mb-8 text-sm font-medium shadow-xl">
              <Zap className="w-4 h-4 animate-pulse text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">AI-Powered Customer Engagement</span>
            </div>

            {/* Main headline with improved gradient contrast */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-8 space-y-4">
              <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Transform Your Business
              </span>
              <span className="block bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
                with AI-Driven Conversations
              </span>
            </h1>

            <p className="text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Revolutionize your customer interactions with our AI-powered platform that understands, engages, and converts leads like never before.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
              <Button asChild size="lg" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-6 text-lg shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="/demo">
                  <Bot className="mr-2 h-5 w-5 text-cyan-400" />
                  See Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-black/50 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features for Modern Businesses
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Everything you need to build meaningful customer relationships at scale.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See what our customers say about their experience with our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic group-hover:text-white transition-colors duration-300">"{testimonial.quote}"</p>
                <div className="font-medium text-white group-hover:text-purple-300 transition-colors duration-300">{testimonial.author}</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-cyan-900/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.4),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Ready to Transform Your Customer Experience?
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust our AI platform to power their customer interactions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-10 py-6 text-lg shadow-2xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40">
                <Link href="/register">
                  Start Free Trial
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-10 py-6 text-lg shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}