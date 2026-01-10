import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, BookOpen, Users, Calendar, Mail, MapPin, Phone, Shield, Target, Zap, ChevronRight, ChevronDown, ChevronUp, Award, User, ShoppingBag, ArrowUpRight, Play, History } from 'lucide-react';
import { Button } from './Button';
import { CourseModal, CourseData } from './CourseModal';
import { Navbar } from './Navbar';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'about' | 'app') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  const handleRegister = (course: CourseData) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const slides = [
    {
      id: 1,
      tag: "Free Live Masterclass",
      title: "Extramile Africa: Building Great Lives Through Asset Ownership",
      subtitle: "Join Bankole Olalekan for a FREE Live Masterclass on Owning Non-Consumable Assets (even on a budget) and paying on installment.",
      cta: "Reserve Your Spot",
      accent: "text-emerald-400",
      glow: "bg-emerald-500/20",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" // Professional Speaker/Conference
    },
    {
      id: 2,
      tag: "Agro-Business Strategy",
      title: "How to Make Tons of Money From Agro Commodities Business",
      subtitle: "Join Bankole Olalekan for a FREE Clarity and Strategic Session on profitable agriculture value chains.",
      cta: "Join Session",
      accent: "text-amber-400",
      glow: "bg-amber-500/20",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" // Agriculture
    }
  ];

  const faqs = [
    {
      question: "Who is this masterclass for?",
      answer: "This masterclass is designed for anyone looking to build sustainable wealth, whether you're a complete beginner or an experienced investor looking to diversify into asset portfolios. It's particularly focused on the African market context."
    },
    {
      question: "Do I need a huge capital to start?",
      answer: "Not at all. One of the core pillars of our strategy is showing you how to start small with what you have and scale up using compound growth principles. We have strategies for various budget levels."
    },
    {
      question: "Is the session live or pre-recorded?",
      answer: "The strategy sessions are live, allowing you to ask questions directly to Bankole. However, we do provide limited-time replays for registered attendees if you happen to miss the live broadcast."
    },
    {
      question: "How do I access the bonus materials?",
      answer: "All bonus templates, including the wealth-building roadmap and asset checklist, will be sent to your registered email address immediately after you complete your registration."
    },
    {
      question: "Can I implement these strategies while working a 9-5?",
      answer: "Absolutely. Most of our students are professionals who build their portfolios on the side. The strategies are designed to be low-maintenance once set up."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden font-sans selection:bg-amber-500/30">
      
      <Navbar onNavigate={onNavigate} activePage="landing" />

      {/* Registration Modal */}
      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        course={selectedCourse} 
      />

      {/* Hero Carousel Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 px-4 md:px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        
        {/* Background Images with Cross-fade */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Image Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-[10000ms] ease-linear"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1.0)'
              }}
            />
            {/* Overlays for Readability */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>
        ))}

        {/* Content Container */}
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <div key={currentSlide} className="animate-fade-in-up">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-semibold mb-6 md:mb-8 uppercase tracking-widest ${slides[currentSlide].accent}`}>
              <Target size={14} />
              <span>{slides[currentSlide].tag}</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-white drop-shadow-2xl px-2">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-200 mb-10 md:mb-14 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-light px-4 font-sans">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <button 
                onClick={() => handleRegister({
                    title: slides[currentSlide].title,
                    subtitle: slides[currentSlide].subtitle,
                    price: "Free"
                })}
                className="w-full sm:w-auto h-14 px-12 rounded-full bg-amber-600 text-white font-bold text-lg hover:bg-amber-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(217,119,6,0.4)] hover:shadow-[0_0_40px_rgba(217,119,6,0.6)] hover:-translate-y-1"
              >
                {slides[currentSlide].cta}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm ${idx === currentSlide ? 'w-10 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Instructor */}
      <section id="about" className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-amber-700 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-duration-500"></div>
              <div className="relative h-[500px] lg:h-[600px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl">
                {/* Placeholder for Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                  <h3 className="text-4xl font-serif font-bold text-white mb-2">Bankole Olalekan</h3>
                  <p className="text-amber-400 font-medium tracking-widest uppercase text-sm">Co-Founder, Extramile Africa</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <span className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-4 block">The Instructor</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-zinc-900 leading-tight">Empowering a Generation of Asset Owners</h2>
              <div className="space-y-6 text-lg text-zinc-600 font-light leading-relaxed">
                <p>
                  Bankole has helped hundreds of Africans transition from financial uncertainty to building sustainable wealth through strategic asset acquisition.
                </p>
                <p>
                   As co-founder of Extramile Africa, he’s dedicated to democratizing wealth-building knowledge and making financial freedom accessible to everyone, regardless of starting capital.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 my-10 border-t border-b border-zinc-200 py-8">
                <div>
                  <div className="text-5xl font-serif font-bold text-zinc-900 mb-2">12+</div>
                  <div className="text-sm text-zinc-500 uppercase tracking-widest">Years Experience</div>
                </div>
                <div>
                  <div className="text-5xl font-serif font-bold text-zinc-900 mb-2">50k+</div>
                  <div className="text-sm text-zinc-500 uppercase tracking-widest">Students Mentored</div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('about')}
                className="inline-flex items-center text-zinc-900 font-bold hover:text-amber-600 transition-colors border-b-2 border-zinc-900 hover:border-amber-600 pb-1"
              >
                Read Full Biography <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-4 block">Key Takeaways</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-zinc-900">What You'll Walk Away With</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">By the end of this masterclass, you will have a concrete roadmap for your financial future.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard 
              icon={<Target className="text-amber-600" size={28} />}
              title="Crystal-Clear Direction"
              description="You’ll know exactly which assets to prioritize based on your current financial situation."
            />
            <BenefitCard 
              icon={<TrendingUp className="text-amber-600" size={28} />}
              title="A Personalized Start"
              description="You’ll learn the best first moves for your specific budget and goals."
            />
            <BenefitCard 
              icon={<Shield className="text-amber-600" size={28} />}
              title="Risk Management"
              description="Learn how to protect your capital while still pursuing growth—key to sustainability."
            />
            <BenefitCard 
              icon={<Zap className="text-amber-600" size={28} />}
              title="Action Plan"
              description="Leave with a clear next step you can implement within 30 days."
            />
          </div>
        </div>
      </section>

      {/* Masterclasses List */}
      <section id="masterclass" className="py-20 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
               <span className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-4 block">Academy</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Upcoming Strategy Sessions</h2>
               <p className="text-zinc-400 text-lg">Join our live sessions or catch up on recordings.</p>
            </div>
            <Button variant="secondary" onClick={() => onNavigate('masterclass')} className="rounded-full px-8 bg-white text-zinc-900 hover:bg-zinc-200">
                View All Sessions
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MasterclassCard 
              title="Ordinary to Global"
              subtitle="Leadership Repositions You Without Noise"
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              tag="Featured"
              onClick={() => handleRegister({
                title: "From Ordinary to Global",
                subtitle: "How Leadership Repositions You Without Noise",
                date: "Jan 21, 2026",
                price: "Free"
              })}
            />
            <MasterclassCard 
              title="Agro-Commodities 2025"
              subtitle="Making Money from Agriculture Value Chains"
              image="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
              onClick={() => handleRegister({
                title: "Agro-Commodities Business Strategy",
                subtitle: "Making Money from Agriculture",
                price: "Free"
              })}
            />
            <MasterclassCard 
              title="2024 Year-End Review"
              subtitle="Strategic Financial Post-Mortem"
              image="https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop"
              isReplay
              onClick={() => handleRegister({
                title: "2024 Year-End Review (Replay)",
                subtitle: "Strategic Financial Post-Mortem",
                price: "Free Replay"
              })}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900">Success Stories</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard 
              quote="I've acquired my first income-generating asset through a cooperative investment, and it's already paying dividends. This isn't theory—this is real, practical guidance that works!"
              author="Adebayo"
              role="HR Professional"
            />
            <TestimonialCard 
              quote="Before this masterclass, I thought investing was only for rich people. The Speaker broke everything down so clearly. I had created a side income stream that now covers my rent."
              author="Chioma"
              role="Software Developer"
            />
          </div>
        </div>
      </section>

      {/* Free Resource CTA */}
      <section className="py-20 px-4 md:px-6 bg-zinc-50">
        <div className="max-w-5xl mx-auto bg-white border border-zinc-200 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[80px] -z-10"></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-zinc-900">Start With Free Resources</h2>
          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto font-light">
            Access our complete library of wealth-building tools, templates, and guides. Everything you need to start your journey to financial freedom—absolutely free.
          </p>
          <button 
            onClick={() => onNavigate('resources')}
            className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-900/10"
          >
            Access Library
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-24 pb-12 bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 font-bold text-2xl tracking-tight mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full flex items-center justify-center">
                    <span className="text-black font-serif italic font-bold text-lg">B</span>
                </div>
                <span>Speaker Bankole</span>
              </div>
              <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed font-light">
                Join Africa's fastest-growing community of wealth builders. Get weekly insights, connect with like-minded investors, and access resources that make financial freedom achievable.
              </p>
              <form className="flex gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-600 transition-colors"
                />
                <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 rounded-lg font-medium transition-colors">
                  Join
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Menu</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => onNavigate('about')} className="hover:text-amber-500 transition-colors">About Bankole</button></li>
                <li><button onClick={() => onNavigate('masterclass')} className="hover:text-amber-500 transition-colors">Masterclasses</button></li>
                <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-500 transition-colors">Resources</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-500 transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Contact</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-600 shrink-0" />
                  <span>123 Fifth Avenue, New York.<br/>United States.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-600 shrink-0" />
                  <span>mail@example.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <p>© {new Date().getFullYear()} Speaker Bankole. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-amber-600' : 'text-zinc-900 group-hover:text-amber-600'}`}>
          {question}
        </span>
        <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-600' : 'text-zinc-400'}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-zinc-500 leading-relaxed pr-8 font-light">
          {answer}
        </p>
      </div>
    </div>
  );
};

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-zinc-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-zinc-100">
    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform border border-zinc-100">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-zinc-900 font-serif">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed font-light">
      {description}
    </p>
  </div>
);

const TestimonialCard: React.FC<{ quote: string, author: string, role: string }> = ({ quote, author, role }) => (
  <div className="bg-zinc-50 p-10 rounded-3xl relative">
    <div className="text-amber-500 mb-6">
        <Star size={24} className="fill-current inline-block" />
        <Star size={24} className="fill-current inline-block" />
        <Star size={24} className="fill-current inline-block" />
        <Star size={24} className="fill-current inline-block" />
        <Star size={24} className="fill-current inline-block" />
    </div>
    <p className="text-zinc-700 italic mb-8 relative z-10 font-serif text-lg leading-relaxed">
      "{quote}"
    </p>
    <div>
        <h4 className="font-bold text-zinc-900">{author}</h4>
        <p className="text-xs text-zinc-500 uppercase tracking-wider">{role}</p>
    </div>
  </div>
);

const MasterclassCard: React.FC<{ title: string, subtitle: string, image: string, tag?: string, isReplay?: boolean, onClick: () => void }> = ({ title, subtitle, image, tag, isReplay, onClick }) => (
    <div onClick={onClick} className="group cursor-pointer flex flex-col h-full">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            {tag && <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{tag}</div>}
            {isReplay && <div className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">REPLAY</div>}
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
        <p className="text-zinc-400 font-light mb-4 line-clamp-2">{subtitle}</p>
        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
            {isReplay ? 'Watch Now' : 'Register Now'} <ArrowUpRight size={16} />
        </div>
    </div>
);