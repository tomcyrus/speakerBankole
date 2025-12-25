import React, { useState } from 'react';
import { Clock, Users, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { CourseModal } from './CourseModal';

interface MasterclassPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'app') => void;
}

export const MasterclassPage: React.FC<MasterclassPageProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleRegister = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const courses = [
    {
      title: "Wealth Building 101: The Foundations",
      price: "Free",
      date: "Oct 24, 2025",
      duration: "2 Hours",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop",
      desc: "Perfect for beginners. Learn how to budget effectively, save strategically, and prepare your mindset for investing.",
      features: ["Budgeting Templates", "Debt Reduction Strategy", "Savings Automation"]
    },
    {
      title: "Agro-Business Mastery: Profiting from the Soil",
      price: "#50,000",
      date: "Nov 12, 2025",
      duration: "4 Weeks",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
      desc: "A deep dive into the agricultural value chain. Learn how to invest in agro-commodities without owning a farm.",
      features: ["Supply Chain Secrets", "Export Documentation", "Risk Mitigation"]
    },
    {
      title: "Real Estate on a Budget",
      price: "#75,000",
      date: "Dec 05, 2025",
      duration: "3 Days",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      desc: "You don't need millions to own property. Discover co-ownership models and land banking strategies for high returns.",
      features: ["Land Banking Guide", "C of O Verification", "Co-operative Investment"]
    },
    {
      title: "Stock Market & Assets Portfolio",
      price: "#45,000",
      date: "Jan 15, 2026",
      duration: "2 Weeks",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
      desc: "Build a diversified portfolio that pays you while you sleep. Covers local and international stocks.",
      features: ["Portfolio Analysis", "Dividend Strategy", "Technical Analysis Basics"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-500/30">
      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={selectedCourse} 
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-black font-serif italic font-bold text-lg">B</span>
            </div>
            <span className="hidden sm:inline-block text-zinc-900">Speaker Bankole</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <button onClick={() => onNavigate('landing')} className="hover:text-amber-600 transition-colors">Home</button>
            <button onClick={() => onNavigate('about')} className="hover:text-amber-600 transition-colors">About Me</button>
            <button className="text-amber-600 font-semibold">Masterclasses</button>
            <button onClick={() => onNavigate('resources')} className="hover:text-amber-600 transition-colors">Resources</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-600 transition-colors">Contact</button>
          </div>
          <Button onClick={() => handleRegister('General Admission')} className="rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10">
            Reserve Spot
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Education for the Future</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Unlock Your Financial Potential</h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Practical, strategy-driven courses designed to take you from novice to expert investor. Choose your path below.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-xl transition-all group flex flex-col">
                <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${course.image})` }}></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black font-bold px-4 py-2 rounded-full shadow-lg">
                        {course.price}
                    </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {course.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">{course.title}</h3>
                    <p className="text-zinc-600 mb-6 leading-relaxed">
                        {course.desc}
                    </p>
                    
                    <div className="mt-auto">
                        <div className="space-y-2 mb-8">
                            {course.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-zinc-500">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => handleRegister(course.title)}
                            className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                        >
                            Enroll Now <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* FAQ/Support CTA */}
       <section className="py-24 px-6 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
            <p className="text-zinc-500 mb-8">
                Our team can help analyze your current financial standing and recommend the best course for you.
            </p>
            <button 
                onClick={() => onNavigate('contact')}
                className="text-amber-600 font-bold hover:text-amber-700 underline underline-offset-4"
            >
                Contact Support Team
            </button>
        </div>
      </section>
    </div>
  );
};