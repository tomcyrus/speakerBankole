import React, { useState } from 'react';
import { Clock, Users, Calendar, ArrowRight, CheckCircle2, Star, Target, Zap, Shield, MapPin, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { CourseModal } from './CourseModal';
import { Navbar } from './Navbar';

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

  const otherCourses = [
    {
      title: "Wealth Building 101: The Foundations",
      price: "Free",
      date: "Oct 24, 2025",
      duration: "2 Hours",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop",
      desc: "Perfect for beginners. Learn how to budget effectively, save strategically, and prepare your mindset for investing.",
    },
    {
      title: "Agro-Business Mastery: Profiting from the Soil",
      price: "#50,000",
      date: "Nov 12, 2025",
      duration: "4 Weeks",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
      desc: "A deep dive into the agricultural value chain. Learn how to invest in agro-commodities without owning a farm.",
    },
    {
      title: "Real Estate on a Budget",
      price: "#75,000",
      date: "Dec 05, 2025",
      duration: "3 Days",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      desc: "You don't need millions to own property. Discover co-ownership models and land banking strategies for high returns.",
    },
    {
      title: "Stock Market & Assets Portfolio",
      price: "#45,000",
      date: "Jan 15, 2026",
      duration: "2 Weeks",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
      desc: "Build a diversified portfolio that pays you while you sleep. Covers local and international stocks.",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-500/30">
      
      <Navbar onNavigate={onNavigate} activePage="masterclass" />

      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={selectedCourse} 
      />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 bg-zinc-900 text-white border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Transformational Education</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Unlock Your Leadership Potential</h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Join our exclusive programs designed to reposition your mindset, wealth, and influence.
          </p>
        </div>
      </section>

      {/* FEATURED PROGRAM: From Ordinary to Global */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-zinc-100">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
               {/* Left: Image Card */}
               <div className="w-full lg:w-1/2 sticky top-24">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 relative aspect-[4/5] group">
                     <img 
                       src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1287&auto=format&fit=crop" 
                       alt="Leadership Program" 
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                     <div className="absolute top-6 left-6 bg-amber-500 text-black font-bold px-4 py-2 rounded-full shadow-lg z-10 animate-pulse">
                        Free (Registration Required)
                     </div>
                     <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                            <Calendar size={14} />
                            <span>29th December 2025</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">From Ordinary to Global</h3>
                     </div>
                  </div>
               </div>

               {/* Right: Detailed Content */}
               <div className="w-full lg:w-1/2 pt-4">
                  <div className="inline-flex items-center gap-2 text-amber-600 font-bold tracking-widest uppercase text-xs mb-6 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                     <Star size={14} className="fill-amber-600" />
                     <span>Featured Program</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 leading-[1.1]">
                     From Ordinary to Global: How Leadership Repositions You Without Noise
                  </h2>
                  
                  <div className="prose prose-lg text-zinc-600 mb-10 leading-relaxed">
                     <p className="mb-4">
                       This 1-Day Free Virtual Leadership Program is designed for individuals who feel ordinary but know they are meant for more.
                     </p>
                     <p className="mb-4 font-medium text-zinc-800 italic border-l-4 border-amber-500 pl-4">
                       "Leadership is not about noise, titles, or hype. Leadership is about alignment, posture, clarity, and influence."
                     </p>
                     <p>
                       In this session, SpeakerBankole will share his real-life journey from ordinary beginnings to global relevance and reveal how leadership reshapes destiny, attracts opportunities, and positions people to win without struggle. This is not just motivation; it is leadership revelation and destiny repositioning.
                     </p>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
                        <Calendar size={16} /> Date
                      </div>
                      <div className="text-zinc-900 font-semibold">29th December 2025</div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
                        <Clock size={16} /> Time
                      </div>
                      <div className="text-zinc-900 font-semibold">2:00 PM - 5:00 PM (WAT)</div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
                        <MapPin size={16} /> Format
                      </div>
                      <div className="text-zinc-900 font-semibold">Virtual (Online)</div>
                    </div>
                     <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
                        <AlertCircle size={16} /> Deadline
                      </div>
                      <div className="text-zinc-900 font-semibold">Before 29th Dec 2025</div>
                    </div>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 mb-10 shadow-sm">
                     <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                        <Target className="text-amber-500" /> What You'll Learn
                     </h3>
                     <ul className="grid gap-4">
                        {[
                          "Why leadership is everything",
                          "How ordinary people rise faster through leadership",
                          "Leadership vs hustle",
                          "How posture attracts opportunities",
                          "The spiritual foundation of leadership",
                          "How leadership creates influence without noise"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-700 font-medium">
                             <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                             <span>{item}</span>
                          </li>
                        ))}
                     </ul>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-10">
                     <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <Users className="text-blue-500" size={18} /> Who Should Attend?
                     </h3>
                     <div className="flex flex-wrap gap-3">
                        {[
                          "Young leaders, professionals & entrepreneurs",
                          "Individuals seeking clarity, purpose & direction",
                          "Anyone tired of struggle and ready for growth",
                          "Spiritually hungry people ready for alignment"
                        ].map((item, i) => (
                          <span key={i} className="bg-white border border-zinc-200 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 shadow-sm hover:border-amber-400 hover:text-amber-600 transition-colors cursor-default">
                             {item}
                          </span>
                        ))}
                     </div>
                  </div>

                  {/* What Happens Next */}
                  <div className="mb-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                      <h3 className="text-lg font-bold text-zinc-900 mb-3">What Happens Next?</h3>
                      <p className="text-zinc-700 text-sm leading-relaxed">
                        After this session, registration opens for the first 100 people to show interest in joining the <strong>SpeakerBankole Leadership Discipleship Program</strong> (90-day cohort starting February), featuring mentorship, accountability partners, and a pathway into the Mastermind Group.
                      </p>
                  </div>

                  <Button 
                     onClick={() => handleRegister("From Ordinary to Global")}
                     className="w-full md:w-auto px-12 py-5 text-lg bg-zinc-900 text-white rounded-full hover:bg-zinc-800 shadow-xl shadow-zinc-900/10 flex items-center justify-center gap-2 font-bold transition-transform active:scale-95"
                  >
                     Register for Free <ArrowRight size={20} />
                  </Button>
                  <p className="mt-4 text-xs text-zinc-500">
                    * Registration is compulsory to receive the meeting link.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Other Sessions Grid */}
      <section className="py-16 md:py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-bold text-zinc-900">Other Strategy Sessions</h2>
             <Button variant="ghost" onClick={() => onNavigate('contact')} className="hidden md:flex">Contact for Private Sessions</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-xl transition-all group flex flex-col hover:border-amber-400/50">
                <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${course.image})` }}></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black font-bold px-3 py-1 text-sm rounded-full shadow-lg">
                        {course.price}
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {course.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">{course.title}</h3>
                    <p className="text-zinc-600 text-sm mb-6 leading-relaxed flex-1">
                        {course.desc}
                    </p>
                    
                    <button 
                        onClick={() => handleRegister(course.title)}
                        className="w-full py-3 bg-zinc-100 text-zinc-900 rounded-xl font-bold hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        View Details <ArrowRight size={16} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* FAQ/Support CTA */}
       <section className="py-16 md:py-24 px-6 bg-white border-t border-zinc-200">
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