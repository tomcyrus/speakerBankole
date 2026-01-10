import React from 'react';
import { Target, Users, Award, ArrowRight, Heart } from 'lucide-react';
import { Button } from './Button';
import { Navbar } from './Navbar';

interface AboutPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'app') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-500/30">
      
      <Navbar onNavigate={onNavigate} activePage="about" />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">The Man Behind the Mission</h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            "Wealth is not just about accumulation; it's about distribution, impact, and legacy. My journey is proof that with the right strategy, anyone can build sustainable wealth."
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                     <div className="absolute inset-0 bg-[url('/assets/mr_bankole.png')] bg-cover bg-center"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <p className="font-serif italic text-2xl">Bankole Olalekan</p>
                        <p className="text-sm opacity-80 uppercase tracking-widest mt-1">Financial Strategist</p>
                     </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-zinc-900">From Humble Beginnings to Financial Freedom</h2>
              <div className="prose prose-lg text-zinc-600 space-y-6">
                <p>
                  Bankole Olalekan is a renowned financial strategist, investor, and the co-founder of Extramile Africa. With over a decade of experience in agro-business, real estate, and asset management, he has dedicated his life to demystifying the secrets of wealth creation for the average African.
                </p>
                <p>
                  Starting his career with limited resources, Bankole discovered that the barrier to wealth wasn't money—it was knowledge. He spent years mastering the principles of compound interest, strategic asset acquisition, and market timing.
                </p>
                <p>
                  Today, he leads a community of over 50,000 aspiring investors, helping them transition from financial uncertainty to owning income-generating portfolios. His philosophy is simple: <strong>start small, think big, and scale fast.</strong>
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-zinc-900">50k+</h4>
                        <p className="text-sm text-zinc-500">Students Mentored</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                        <Award size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-zinc-900">12+</h4>
                        <p className="text-sm text-zinc-500">Years Experience</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values/Mission */}
      <section className="py-16 md:py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Core Philosophy</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">We believe that financial freedom is a right, not a privilege reserved for the few.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-zinc-800 rounded-2xl border border-zinc-700">
                    <Target className="text-amber-500 mb-6" size={32} />
                    <h3 className="text-xl font-bold mb-4">Practicality Over Theory</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        We don't teach abstract economic theories. We provide actionable steps that you can implement immediately to see results in your bank account.
                    </p>
                </div>
                <div className="p-8 bg-zinc-800 rounded-2xl border border-zinc-700">
                    <Heart className="text-red-500 mb-6" size={32} />
                    <h3 className="text-xl font-bold mb-4">Community First</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        Wealth building is a lonely journey if you walk alone. We foster a supportive environment where iron sharpens iron.
                    </p>
                </div>
                <div className="p-8 bg-zinc-800 rounded-2xl border border-zinc-700">
                    <Award className="text-purple-500 mb-6" size={32} />
                    <h3 className="text-xl font-bold mb-4">Integrity & Transparency</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        We only recommend investment vehicles that we have personally vetted and put our own money into. No get-rich-quick schemes.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 bg-amber-500">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Rewrite Your Financial Story?</h2>
            <p className="text-black/80 text-xl mb-10 max-w-2xl mx-auto">
                Join Bankole in his next masterclass and take the first step towards the life you deserve.
            </p>
            <button 
                onClick={() => onNavigate('masterclass')}
                className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mx-auto"
            >
                Explore Masterclasses <ArrowRight size={20} />
            </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-zinc-500">© {new Date().getFullYear()} Speaker Bankole. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};