import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface ContactPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'app') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
        setStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-500/30">
      
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
            <button onClick={() => onNavigate('masterclass')} className="hover:text-amber-600 transition-colors">Masterclasses</button>
            <button onClick={() => onNavigate('resources')} className="hover:text-amber-600 transition-colors">Resources</button>
            <button className="text-amber-600 font-semibold">Contact</button>
          </div>
          <Button onClick={() => onNavigate('app')} className="rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10">
            Client Portal
          </Button>
        </div>
      </nav>

      <div className="pt-20 min-h-screen flex flex-col md:flex-row">
        
        {/* Contact Info Side */}
        <div className="w-full md:w-1/2 bg-zinc-900 text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Let's Start a Conversation</h1>
            <p className="text-zinc-400 text-lg mb-12 relative z-10">
                Whether you have questions about our masterclasses, need consulting, or just want to say hello, we're here to help you navigate your wealth journey.
            </p>

            <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Our Office</h3>
                        <p className="text-zinc-400">123 Fifth Avenue, New York,<br />NY 12004, United States.</p>
                    </div>
                </div>

                <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 shrink-0">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Email Us</h3>
                        <p className="text-zinc-400">mail@example.com</p>
                        <p className="text-zinc-500 text-sm">Response within 24 hours</p>
                    </div>
                </div>

                <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 shrink-0">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Call Us</h3>
                        <p className="text-zinc-400">+01 – 123 456 78 90</p>
                        <p className="text-zinc-500 text-sm">Mon-Fri, 9am - 5pm EST</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 bg-white p-12 md:p-24 flex items-center">
            <div className="w-full max-w-md mx-auto">
                {status === 'success' ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h2>
                        <p className="text-zinc-500">We'll get back to you as soon as possible.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-8 text-amber-600 font-bold hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-900 mb-8">Send a Message</h2>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">First Name</label>
                                <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Last Name</label>
                                <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                            <input required type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Subject</label>
                            <select className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors">
                                <option>General Inquiry</option>
                                <option>Masterclass Support</option>
                                <option>Partnership</option>
                                <option>Speaking Engagement</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Message</label>
                            <textarea required rows={4} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" placeholder="How can we help you?"></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'sending'}
                            className="w-full py-4 bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                        >
                            {status === 'sending' ? (
                                <><Loader2 className="animate-spin" /> Sending...</>
                            ) : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
