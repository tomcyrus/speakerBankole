import React, { useState, useMemo } from 'react';
import { Clock, Users, Calendar, ArrowRight, CheckCircle2, Star, Target, Zap, Shield, MapPin, AlertCircle, Quote, XCircle, Check, Flame, Trophy } from 'lucide-react';
import { Button } from './Button';
import { CourseModal, CourseData } from './CourseModal';
import { Navbar } from './Navbar';

interface MasterclassPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'app') => void;
}

interface Program {
  title: string;
  subtitle?: string;
  price: string;
  date: string;
  dateObj: Date;
  time?: string;
  duration: string;
  location?: string;
  image: string;
  desc: string;
  learningPoints?: string[];
  featured?: boolean;
}

export const MasterclassPage: React.FC<MasterclassPageProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  const handleRegister = (course: CourseData) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Helper function to parse dates
  const parseDate = (dateStr: string): Date => {
    // Handle different date formats
    const formats = [
      // "21st Jan 2026" format
      /(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/,
      // "Oct 24, 2025" format
      /([A-Za-z]+)\s+(\d+),?\s+(\d{4})/,
    ];

    for (const format of formats) {
      const match = dateStr.match(format);
      if (match) {
        if (format === formats[0]) {
          // "21st Jan 2026" format
          const day = parseInt(match[1]);
          const month = match[2];
          const year = parseInt(match[3]);
          return new Date(`${month} ${day}, ${year}`);
        } else {
          // "Oct 24, 2025" format
          return new Date(dateStr);
        }
      }
    }
    return new Date(dateStr);
  };

  // Check if a program is expired
  const isExpired = (dateObj: Date): boolean => {
    const now = new Date();
    return dateObj < now;
  };

  // All programs including the featured one
  const allPrograms: Program[] = useMemo(() => {
    const programs = [
      {
        title: "From Ordinary to Global",
        subtitle: "How Leadership Repositions You Without Noise",
        price: "Free",
        date: "21st Jan 2026",
        dateObj: parseDate(" Jan 212026"),
        time: "2:00 PM – 5:00 PM (WAT)",
        duration: "3 Hours",
        location: "Virtual (Online)",
        image: "/assets/ads1.png",
        desc: "Leadership is not about noise, titles, or hype. Leadership is about alignment, posture, clarity, and influence.",
        learningPoints: [
          "Why leadership is everything",
          "How ordinary people rise faster through leadership",
          "Leadership vs hustle",
          "How posture attracts opportunities",
          "The spiritual foundation of leadership",
          "How leadership creates influence without noise"
        ],
        featured: true
      },
      {
        title: "Wealth Building 101: The Foundations",
        price: "Free",
        date: "Oct 24, 2025",
        dateObj: parseDate("Oct 24, 2025"),
        duration: "2 Hours",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop",
        desc: "Perfect for beginners. Learn how to budget effectively, save strategically, and prepare your mindset for investing.",
      },
      {
        title: "Agro-Business Mastery: Profiting from the Soil",
        price: "#50,000",
        date: "Nov 12, 2025",
        dateObj: parseDate("Nov 12, 2025"),
        duration: "4 Weeks",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
        desc: "A deep dive into the agricultural value chain. Learn how to invest in agro-commodities without owning a farm.",
      },
      {
        title: "Real Estate on a Budget",
        price: "#75,000",
        date: "Dec 05, 2025",
        dateObj: parseDate("Dec 05, 2025"),
        duration: "3 Days",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
        desc: "You don't need millions to own property. Discover co-ownership models and land banking strategies for high returns.",
      },
      {
        title: "Stock Market & Assets Portfolio",
        price: "#45,000",
        date: "Jan 15, 2025",
        dateObj: parseDate("Jan 15, 2025"),
        duration: "2 Weeks",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
        desc: "Build a diversified portfolio that pays you while you sleep. Covers local and international stocks.",
      }
    ];

    // Sort by date (upcoming first, then past)
    return programs.sort((a, b) => {
      const aExpired = isExpired(a.dateObj);
      const bExpired = isExpired(b.dateObj);
      
      // If one is expired and the other isn't, upcoming comes first
      if (aExpired && !bExpired) return 1;
      if (!aExpired && bExpired) return -1;
      
      // Otherwise sort by date (closest first for upcoming, most recent first for expired)
      if (!aExpired) {
        return a.dateObj.getTime() - b.dateObj.getTime();
      } else {
        return b.dateObj.getTime() - a.dateObj.getTime();
      }
    });
  }, []);

  // Get the featured program (first upcoming program)
  const featuredProgram = useMemo(() => {
    return allPrograms[0];
  }, [allPrograms]);

  // Get other programs (excluding the featured one)
  const otherPrograms = useMemo(() => {
    return allPrograms.slice(1);
  }, [allPrograms]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-500/30">
      
      <Navbar onNavigate={onNavigate} activePage="masterclass" />

      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        course={selectedCourse} 
      />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 bg-zinc-900 text-white border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Welcome to the Academy</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SpeakerBankole Leadership Academy</h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Where ordinary people are repositioned for global relevance through the power of leadership.
          </p>
        </div>
      </section>
     {/* FEATURED PROGRAM: Dynamic based on date */}
      <section id="featured-program" className="py-20 px-6 bg-zinc-900 text-white relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
             
             {/* Content Side */}
             <div>
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Star size={12} className="fill-amber-400" /> 
                    {isExpired(featuredProgram.dateObj) ? 'Past Program' : 'Featured Leadership Experience'}
                 </div>
                 
                 {/* Expired Badge */}
                 {isExpired(featuredProgram.dateObj) && (
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold mb-4">
                     <XCircle size={16} />
                     EXPIRED
                   </div>
                 )}
                 
                 <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
                    {featuredProgram.title.toUpperCase()}{featuredProgram.subtitle && ': '}<br/>
                    {featuredProgram.subtitle && <span className="text-amber-500">{featuredProgram.subtitle}</span>}
                 </h2>
                 <p className="text-xl text-zinc-300 mb-8 font-light italic border-l-4 border-amber-500 pl-4">
                    {featuredProgram.desc}
                 </p>

                 <div className="space-y-8 mb-8">
                     <div className="flex flex-wrap gap-4">
                        <div className="bg-black/30 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3">
                            <Calendar size={18} className="text-amber-500" />
                            <span className="font-bold text-sm">{featuredProgram.date}</span>
                        </div>
                        {featuredProgram.time && (
                          <div className="bg-black/30 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3">
                              <Clock size={18} className="text-amber-500" />
                              <span className="font-bold text-sm">{featuredProgram.time}</span>
                          </div>
                        )}
                        {featuredProgram.location && (
                          <div className="bg-black/30 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3">
                              <MapPin size={18} className="text-amber-500" />
                              <span className="font-bold text-sm">{featuredProgram.location}</span>
                          </div>
                        )}
                     </div>

                     {featuredProgram.learningPoints && featuredProgram.learningPoints.length > 0 && (
                       <div>
                          <h4 className="text-amber-500 font-bold mb-4 uppercase tracking-wider text-sm">What You Will Learn</h4>
                          <ul className="grid sm:grid-cols-1 gap-2">
                              {featuredProgram.learningPoints.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                                      <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                                      <span>{item}</span>
                                  </li>
                              ))}
                          </ul>
                       </div>
                     )}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Button 
                        onClick={() => handleRegister({
                          title: featuredProgram.title,
                          subtitle: featuredProgram.subtitle || featuredProgram.desc,
                          date: featuredProgram.date,
                          price: featuredProgram.price
                        })}
                        className={`px-8 py-4 text-base font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)] ${
                          isExpired(featuredProgram.dateObj) 
                            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                            : 'bg-amber-500 text-black hover:bg-amber-400'
                        }`}
                        disabled={isExpired(featuredProgram.dateObj)}
                    >
                        {isExpired(featuredProgram.dateObj) ? 'Program Ended' : `Secure Your ${featuredProgram.price === 'Free' ? 'Free' : ''} Spot`}
                    </Button>
                    {!isExpired(featuredProgram.dateObj) && (
                      <div className="text-xs text-zinc-500 max-w-xs mt-2">
                          <p className="mb-2">* Registration is COMPULSORY. Only registered participants get the link.</p>
                          {featuredProgram.featured && (
                            <p className="text-amber-500/80">
                                <strong>What Happens Next:</strong> After this session, registration opens for the first 100 people to join the Discipleship Program (90-day cohort).
                            </p>
                          )}
                      </div>
                    )}
                 </div>
             </div>

             {/* Visual Side */}
             <div className="relative">
                 <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-amber-500/10 group relative">
                    <img 
                        src={featuredProgram.image} 
                        alt={featuredProgram.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    {/* Expired Overlay */}
                    {isExpired(featuredProgram.dateObj) && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
                          <p className="text-2xl font-bold text-white">Program Expired</p>
                          <p className="text-zinc-400 mt-2">Check other available programs below</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay Details */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                            HOST
                        </div>
                        <div className="text-white font-bold text-2xl mb-1">SpeakerBankole</div>
                        <div className="text-zinc-300 text-sm uppercase tracking-wider mb-4">Leadership Architect</div>
                        
                        <div className="flex gap-2">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 flex-1">
                                <span className="block text-amber-500 font-bold text-lg">
                                  {featuredProgram.dateObj.getDate()}
                                </span>
                                <span className="text-xs text-zinc-400 uppercase">
                                  {featuredProgram.dateObj.toLocaleString('en', { month: 'short' })}
                                </span>
                            </div>
                            {featuredProgram.time && (
                              <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 flex-1">
                                  <span className="block text-amber-500 font-bold text-lg">
                                    {featuredProgram.time.split(':')[0].trim()}
                                  </span>
                                  <span className="text-xs text-zinc-400 uppercase">
                                    {featuredProgram.time.includes('PM') ? 'PM' : 'AM'}
                                  </span>
                              </div>
                            )}
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 flex-1">
                                <span className="block text-amber-500 font-bold text-lg">
                                  {featuredProgram.price === 'Free' ? 'FREE' : featuredProgram.price}
                                </span>
                                <span className="text-xs text-zinc-400 uppercase">Entry</span>
                            </div>
                        </div>
                    </div>
                 </div>
                 
                 {/* Floating Badge */}
                 {!isExpired(featuredProgram.dateObj) && (
                   <div className="absolute -top-6 -right-6 bg-amber-500 text-black font-bold rounded-full w-24 h-24 flex items-center justify-center text-center text-xs p-2 shadow-xl animate-pulse ring-4 ring-amber-500/20">
                      GET ON<br/>TOP OF<br/>YOUR GAME
                   </div>
                 )}
             </div>
         </div>
      </section>

      {/* THE STORY SECTION */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-xs mb-6">
            <Quote size={16} />
            <span>The Origin Story</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8">The Story That Gave Birth to This Academy</h2>
          
          <div className="prose prose-lg text-zinc-600 leading-relaxed space-y-6">
            <p className="font-serif text-xl text-zinc-800 italic border-l-4 border-amber-500 pl-6 my-8">
              “Mama, I won!”
            </p>
            <p>
              That was what I wanted to tell my mother, but I couldn’t. Not because I didn’t win, but because fear had been deeply planted in our home; Fear of competition, fear of visibility, fear of standing out.
            </p>
            <p>
              In our clime, parents, especially mothers, don’t intentionally raise leaders; they raise safe children. <span className="text-zinc-900 font-semibold">“Don’t try.” “Don’t compete.” “Don’t put yourself out there.”</span> I grew up watching life instead of living it. I feared leadership, I feared ambition, and I feared becoming anything meaningful.
            </p>
            <p>
              Then one day, I decided to battle that fear, and I won. In 2007, an opportunity I never anticipated came: an all-expense-paid trip to the UK, sponsored by my university. When my Dean called my mother and said, <span className="italic">“Your son is on top of the world,”</span> something shifted forever.
            </p>
            <p className="font-medium text-amber-600">
              That day, I realized a powerful truth: you don’t have to be the best student to be on top; you only need to be <span className="inline-flex items-center gap-1"><Flame size={18} /> top of your game.</span>
            </p>
          </div>
        </div>
      </section>

      {/* DIAGNOSIS SECTION */}
      <section className="py-16 md:py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Have You Ever Felt This? */}
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
              <AlertCircle className="text-amber-500" /> Have You Ever Felt This?
            </h3>
            <ul className="space-y-4">
              {[
                "You know you’re capable of more… but fear keeps holding you back",
                "You avoid competition, visibility, and leadership roles",
                "You keep “trying small” so you won’t fail big",
                "You’re busy, but not progressing",
                "You blame the system, the country, the economy — yet deep down you know the real problem is missing leadership"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                  <div className="mt-1 text-amber-500 shrink-0"><CheckCircle2 size={20} /></div>
                  <span className="text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-zinc-500 italic font-medium border-l-2 border-amber-500 pl-4">
                If this sounds like you, this academy was built for you.
            </p>
          </div>

          {/* The Hard Truth */}
          <div className="bg-zinc-900 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px]"></div>
            <h3 className="text-2xl font-bold mb-2 text-white relative z-10 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              THE HARD TRUTH
            </h3>
            <p className="text-zinc-400 mb-8 relative z-10 text-sm">Why You May Still Be Struggling in 2026</p>
            
            <p className="text-zinc-300 mb-6 leading-relaxed relative z-10">
              Not because Nigeria failed you. Not because AI replaced you. Not because opportunities disappeared. But because:
            </p>

            <ul className="space-y-3 relative z-10 mb-8">
              {[
                "You didn’t learn leadership",
                "You chased activities instead of direction",
                "You didn’t mind your business",
                "You refused to evolve",
                "You stayed petty, stale, and small",
                "You talked about AI instead of leveraging it",
                "You never nurtured the “U” in YOU"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <XCircle size={16} className="text-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="relative z-10 pt-6 border-t border-zinc-700">
                <p className="text-amber-400 font-medium leading-relaxed">
                    This 1-Day Free SpeakerBankole Leadership Academy is designed for individuals who feel ordinary but know they are meant for more.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ACADEMY EXISTS & BENEFITS */}
      <section className="py-16 md:py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold text-zinc-900 mb-6">Why We Exist</h2>
               <div className="space-y-2 text-lg text-zinc-600">
                 <p>Because fear is still destroying destinies.</p>
                 <p>Because brilliance without leadership leads to mediocrity.</p>
                 <p>Because many people are busy… but not building.</p>
                 <p className="font-bold text-zinc-900 pt-2">Businesses don’t fail — people fail. And most people fail because they never learned leadership.</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
               {/* What You Will Learn */}
               <div className="bg-amber-50 rounded-3xl p-8 md:p-12 border border-amber-100">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                     <Zap className="text-amber-500" /> WHAT THIS ACADEMY WILL DO FOR YOU
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                     {[
                       "Conquer fear and self-limiting beliefs",
                       "Lead yourself before leading others",
                       "Become valuable in business & career",
                       "Stop watching life and start winning",
                       "Build confidence, clarity, and competence",
                       "Develop industry-specific leadership skills",
                       "Rise above mediocrity",
                       "Create opportunities instead of chasing them"
                     ].map((item, i) => (
                       <div key={i} className="flex items-start gap-2">
                          <Check size={18} className="text-amber-600 mt-1 shrink-0" />
                          <span className="text-zinc-800 text-sm font-medium">{item}</span>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Who Is This For */}
               <div className="bg-white rounded-3xl p-8 md:p-12 border border-zinc-200 shadow-xl shadow-zinc-200/50">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                     <Target className="text-blue-500" /> THIS ACADEMY IS FOR YOU IF:
                  </h3>
                   <ul className="space-y-4">
                     {[
                       "You’re tired of being average",
                       "You want to dominate your field",
                       "You’re done blaming the system",
                       "You want real growth, not motivation",
                       "You want to be relevant in the AI age",
                       "You want to win — anywhere, anyhow"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-zinc-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="font-medium">{item}</span>
                       </li>
                     ))}
                   </ul>

                   <div className="mt-8 pt-8 border-t border-zinc-100">
                      <p className="font-serif italic text-lg text-zinc-500">
                        "The journey becomes beautiful when you start. Even if you fail several times, don’t quit. Dust yourself. Get up. Lead."
                      </p>
                   </div>
               </div>
            </div>
         </div>
      </section>

 
      {/* Other Sessions Grid */}
      <section className="py-16 md:py-24 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-bold text-zinc-900">Other Strategy Sessions</h2>
             <Button variant="ghost" onClick={() => onNavigate('contact')} className="hidden md:flex">Contact for Private Sessions</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherPrograms.map((program, index) => {
              const programExpired = isExpired(program.dateObj);
              
              return (
                <div key={index} className={`bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-xl transition-all group flex flex-col ${
                  programExpired ? 'opacity-75 hover:border-red-400/50' : 'hover:border-amber-400/50'
                }`}>
                  <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${program.image})` }}></div>
                      
                      {/* Expired Overlay on Image */}
                      {programExpired && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                          <div className="bg-red-500/90 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                            <XCircle size={18} />
                            EXPIRED
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black font-bold px-3 py-1 text-sm rounded-full shadow-lg">
                          {program.price}
                      </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {program.date}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {program.duration}</span>
                          {programExpired && (
                            <span className="flex items-center gap-1 text-red-500 font-bold">
                              <XCircle size={14} /> Expired
                            </span>
                          )}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${
                        programExpired ? 'text-zinc-500' : 'text-zinc-900 group-hover:text-amber-600'
                      }`}>{program.title}</h3>
                      <p className="text-zinc-600 text-sm mb-6 leading-relaxed flex-1">
                          {program.desc}
                      </p>
                      
                      <button 
                          onClick={() => handleRegister({
                            title: program.title,
                            subtitle: program.subtitle || program.desc,
                            date: program.date,
                            price: program.price
                          })}
                          disabled={programExpired}
                          className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm ${
                            programExpired 
                              ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed' 
                              : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                          }`}
                      >
                          {programExpired ? 'Program Ended' : 'View Details'} <ArrowRight size={16} />
                      </button>
                  </div>
                </div>
              );
            })}
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