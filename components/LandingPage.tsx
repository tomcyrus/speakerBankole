import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, BookOpen, Users, Calendar, Mail, MapPin, Phone, Shield, Target, Zap, ChevronRight, ChevronDown, ChevronUp, Award, User, ShoppingBag, ArrowUpRight, Play } from 'lucide-react';
import { Button } from './Button';
import { CourseModal } from './CourseModal';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'about' | 'app') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleRegister = (courseName: string) => {
    setSelectedCourse(courseName);
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
      
      {/* Registration Modal */}
      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={selectedCourse} 
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-black font-serif italic font-bold text-lg">B</span>
            </div>
            <span className="hidden sm:inline-block text-zinc-900">Speaker Bankole</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <button onClick={() => onNavigate('about')} className="hover:text-amber-600 transition-colors">About Me</button>
            <button onClick={() => onNavigate('masterclass')} className="hover:text-amber-600 transition-colors">Masterclasses</button>
            <button onClick={() => onNavigate('resources')} className="hover:text-amber-600 transition-colors">Resources</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-600 transition-colors">Contact</button>
          </div>
          <Button onClick={() => onNavigate('masterclass')} className="rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10">
            Reserve Spot
          </Button>
        </div>
      </nav>

      {/* Hero Carousel Section - Keeps Dark Overlay for Image Readability */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        
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
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>
        ))}

        {/* Content Container */}
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <div key={currentSlide} className="animate-fade-in-up">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-semibold mb-8 uppercase tracking-widest ${slides[currentSlide].accent}`}>
              <Target size={12} />
              <span>{slides[currentSlide].tag}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl text-zinc-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => handleRegister(slides[currentSlide].title)}
                className="h-14 px-10 rounded-full bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              >
                {slides[currentSlide].cta}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm ${idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Instructor */}
      <section id="about" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Video Introduction */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                  <Play className="text-amber-500 fill-amber-500" size={20} />
                  Introduction
                </h2>
                <p className="text-zinc-500">A personal message from Bankole Olalekan</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 bg-black aspect-video relative group">
              <video 
                controls
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              >
                {/* Sample video URL - in production this would be the actual intro video */}
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-duration-500"></div>
              <div className="relative h-[500px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 flex items-end p-8 shadow-xl">
                {/* Placeholder for Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-1">Bankole Olalekan</h3>
                  <p className="text-amber-400 font-medium">Co-Founder, Extramile Africa</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">About Your Instructor</h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                Bankole has helped hundreds of Africans transition from financial uncertainty to building sustainable wealth through strategic asset acquisition. As co-founder of Extramile Africa, he’s dedicated to democratizing wealth-building knowledge and making financial freedom accessible to everyone, regardless of starting capital.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">12+</div>
                  <div className="text-sm text-zinc-500">Years of Experience</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">32</div>
                  <div className="text-sm text-zinc-500">Awards & Honors</div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('about')}
                className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-500"
              >
                Read Full Bio <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900">What You'll Walk Away With</h2>
            <p className="text-zinc-500">By the end of this masterclass, you will have:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard 
              icon={<Target className="text-amber-500" size={24} />}
              title="Crystal-Clear Direction"
              description="You’ll know exactly which assets to prioritize based on your current financial situation."
            />
            <BenefitCard 
              icon={<TrendingUp className="text-emerald-500" size={24} />}
              title="A Personalized Start"
              description="You’ll learn the best first moves for your specific budget and goals."
            />
            <BenefitCard 
              icon={<Shield className="text-blue-500" size={24} />}
              title="Risk Management"
              description="Learn how to protect your capital while still pursuing growth—key to sustainability."
            />
            <BenefitCard 
              icon={<Zap className="text-purple-500" size={24} />}
              title="Action Plan"
              description="Leave with a clear next step you can implement within 30 days."
            />
          </div>
        </div>
      </section>

      {/* Ebooks Section */}
      <section id="resources" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-zinc-900">Featured Ebooks</h2>
              <p className="text-zinc-500 max-w-xl">
                While you're waiting for the masterclass, get a head start with our carefully curated eBooks designed to fast-track your financial education.
              </p>
            </div>
            <button onClick={() => onNavigate('resources')} className="text-amber-600 flex items-center gap-2 hover:text-amber-500 transition-colors font-medium">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <EbookCard number="1" />
            <EbookCard number="2" />
            <EbookCard number="3" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-zinc-900">Student Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard 
              quote="I've acquired my first income-generating asset through a cooperative investment, and it's already paying dividends. This isn't theory—this is real, practical guidance that works!"
              author="Adebayo"
              role="HR Professional"
              location="Lagos"
            />
            <TestimonialCard 
              quote="Before this masterclass, I thought investing was only for rich people. The Speaker broke everything down so clearly. I had created a side income stream that now covers my rent. Game changer!"
              author="CHIOMA"
              role="Software Developer"
              location="Abuja"
            />
            <TestimonialCard 
              quote="The difference? This focuses on strategies that actually work in Nigeria—not some American advice that doesn't apply here. I finally have a clear roadmap."
              author="Mohammed"
              role="Entrepreneur"
              location="Kano"
            />
            <TestimonialCard 
              quote="I thought I needed to wait until I was earning more. Bankole showed me how to start small and scale up. I'm now 8 months into building my asset portfolio."
              author="David"
              role="Marketing Executive"
              location="Port Harcourt"
            />
          </div>
        </div>
      </section>

      {/* Masterclasses List */}
      <section id="masterclass" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900">Upcoming & Past Masterclasses</h2>
            <p className="text-zinc-500">Join our live strategy sessions or catch up on recordings.</p>
          </div>

          <div className="space-y-4">
            <MasterclassItem 
              title="How to Start Owning Income-Generating Assets Portfolios in 2025 Even on Budget"
              desc="Learn the exact blueprint for building your first asset portfolio with limited capital. Join Bankole Olalekan for this strategic session."
              image="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop" // Assets/Growth
              onClick={() => handleRegister("How to Start Owning Income-Generating Assets Portfolios")}
            />
            <MasterclassItem 
              title="How to Make Tons of Money from Agro Commodities Business 2025"
              desc="Discover the untapped potential in Nigeria's agricultural sector. A free training on Live YouTube."
              image="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop" // Agriculture
              onClick={() => handleRegister("Agro-Commodities Business Strategy")}
            />
            <MasterclassItem 
              title="Business Owner Strategy: Funding & Scaling Your Business"
              desc="We create a world where funding your business becomes easier. Learn how to scale from a side hustle to a structured business."
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop" // Business/Suit
              onClick={() => handleRegister("Scaling Your Side Hustle")}
            />
          </div>
          
          <div className="mt-12 text-center">
             <Button variant="secondary" onClick={() => onNavigate('masterclass')} className="rounded-full px-8 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50">View All Sessions</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900">Frequently Asked Questions</h2>
            <p className="text-zinc-500">Everything you need to know about the masterclass.</p>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Resource CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-50 to-purple-50 border border-zinc-200 rounded-3xl p-12 text-center relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] -z-10"></div>
          <h2 className="text-3xl font-bold mb-6 text-zinc-900">Free MasterClass Resource</h2>
          <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
            Access our complete library of wealth-building tools, templates, and guides. Everything you need to start your journey to financial freedom—absolutely free.
          </p>
          <button 
            onClick={() => onNavigate('resources')}
            className="bg-zinc-900 text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10"
          >
            View All Resources
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-24 pb-12 bg-zinc-900 text-white border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Get weekly strategies, techniques & offers.</h3>
              <p className="text-zinc-400 mb-6">
                Join Africa's fastest-growing community of wealth builders. Get weekly insights, connect with like-minded investors, and access resources that make financial freedom achievable.
              </p>
              <form className="flex gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50"
                />
                <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400">About Me</button></li>
                <li><button onClick={() => onNavigate('masterclass')} className="hover:text-amber-400">All Courses</button></li>
                <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-400 text-left">Resources</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400">Contact Me</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-6">Contact Me</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-500 shrink-0" />
                  <span>123 Fifth Avenue, New York, NY 12004.<br/>United States.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-500 shrink-0" />
                  <span>mail@example.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-500 shrink-0" />
                  <span>+01 – 123 456 78 90</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Speaker Bankole | Powered by Speaker Bankole</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
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
    <div className="border-b border-zinc-200 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-amber-600' : 'text-zinc-900 group-hover:text-amber-600'}`}>
          {question}
        </span>
        <div className={`shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-amber-100 text-amber-600' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}`}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-zinc-600 leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
};

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white border border-zinc-200 hover:shadow-lg transition-all duration-300 group shadow-sm">
    <div className="w-12 h-12 rounded-lg bg-zinc-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-3 text-zinc-900">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const EbookCard: React.FC<{ number: string }> = ({ number }) => (
  <div className="group cursor-pointer">
    <div className="bg-zinc-100 aspect-[3/4] rounded-xl mb-4 relative overflow-hidden border border-zinc-200 shadow-sm">
      {/* Abstract Cover Design */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-80 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        #10,000
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2 block">Ebook #{number}</span>
        <h3 className="text-xl font-bold text-white">Wealth Strategy Vol. {number}</h3>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-xs text-zinc-500">PDF • Instant Download</p>
      <button className="text-sm font-bold text-zinc-900 hover:text-amber-600 transition-colors flex items-center gap-1">
        Buy Now <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ quote: string, author: string, role: string, location: string }> = ({ quote, author, role, location }) => (
  <div className="bg-white border border-zinc-200 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
    <div className="absolute -top-4 -left-2 text-6xl text-zinc-100 font-serif">"</div>
    <p className="text-zinc-600 italic mb-6 relative z-10 font-light leading-relaxed">
      {quote}
    </p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-bold text-white text-sm">
        {author.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-zinc-900 text-sm">{author}</h4>
        <p className="text-xs text-zinc-500">{location} | {role}</p>
      </div>
    </div>
  </div>
);

const MasterclassItem: React.FC<{ title: string, desc: string, image: string, onClick: () => void }> = ({ title, desc, image, onClick }) => (
  <div onClick={onClick} className="group flex flex-col md:flex-row gap-6 p-4 rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm hover:shadow-lg">
    <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden shrink-0 relative">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
        <Users size={12} />
        <span>Open Strategy Session</span>
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">{title}</h3>
      <p className="text-zinc-600 text-sm mb-4 max-w-2xl">{desc}</p>
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 group-hover:text-amber-600">
        <span>View Details</span>
        <ArrowUpRight size={12} />
      </div>
    </div>
  </div>
);