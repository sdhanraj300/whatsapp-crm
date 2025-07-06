import { HeroSection } from '@/components/sections/HeroSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CTASection } from '@/components/sections/CTASection';
import { FloatingShapes } from '@/components/animations/FloatingShapes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-20">
          <FloatingShapes />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-indigo-800/20 to-slate-800/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="pt-16">
          <HeroSection />
          <div id="features">
            <FeaturesSection />
          </div>
          <div id="testimonials">
            <TestimonialsSection />
          </div>
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
}