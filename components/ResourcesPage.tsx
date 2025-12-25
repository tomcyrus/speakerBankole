import React from 'react';
import { ArrowRight, Check, MapPin, Mail, Phone, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from './Button';

interface ResourcesPageProps {
  onNavigate: (page: 'landing' | 'masterclass' | 'contact' | 'resources' | 'about' | 'app') => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
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
            <button className="text-amber-600 font-semibold">Resources</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-600 transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => onNavigate('masterclass')} className="rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 border-none shadow-lg shadow-zinc-900/10">
              Reserve Spot
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">Resources</h1>
          <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Aliquet adipiscing in dignissim scelerisque fermentum nibh condimentum ligula eget nunc blandit interdum eros, massa ante ipsum senectus quis in.
          </p>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-zinc-900">Best practices for digital marketing</h2>
          <div className="prose prose-lg text-zinc-600 leading-relaxed">
            <p className="mb-6">
              Pellentesque vel tempus ultrices fringilla feugiat sagittis, fermentum eget nunc lacus, mi ut eros sed a tincidunt massa amet tellus tempor, nec curabitur ultricies.
            </p>
            <p>
              Consequat neque fermentum facilisi neque lacus elit velit ultrices aliquam nibh lorem arcu consequat mauris lacus, risus egestas quam dictum enim diam sociis volutpat vel id id non interdum sollicitudin sit est arcu vulputate quis vulputate facilisi in nibh urna.
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Book 1 */}
            <BookCard 
              title="Digital Marketing Essentials #1"
              price="#15,000"
              image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
              desc="At non dui maecenas nulla imperdiet mi libero, arcu aenean enim tempor pharetra tellus fames amet. Id quis enim, at rutrum gravida mauris, dignissim justo."
            />

            {/* Book 2 */}
            <BookCard 
              title="Digital Marketing Essentials #2"
              price="#18,000"
              image="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
              desc="At non dui maecenas nulla imperdiet mi libero, arcu aenean enim tempor pharetra tellus fames amet. Id quis enim, at rutrum gravida mauris, dignissim justo."
            />

            {/* Book 3 */}
            <BookCard 
              title="Digital Marketing Handbook"
              price="#25,000"
              image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop"
              desc="At non dui maecenas nulla imperdiet mi libero, arcu aenean enim tempor pharetra tellus fames amet. Id quis enim, at rutrum gravida mauris, dignissim justo."
            />

          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 text-zinc-900">Digital Marketing News & Blog</h2>
              <p className="text-zinc-500 text-lg">
                Sit nunc quis viverra commodo risus integer imperdiet massa blandit odio eu nunc, sed gravida nisl, sit eu auctor id ut pretium ultrices in.
              </p>
            </div>
            <Button variant="secondary" className="bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50">
              View All Posts
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BlogCard 
              image="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
              title="Elit mattis platea rhoncus"
              excerpt="Id nullam massa morbi tellus ullamcorper dui mauris sed placerat at lacus lorem fringilla"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop"
              title="Nisl eleifend vulputate ultricies"
              excerpt="Id nullam massa morbi tellus ullamcorper dui mauris sed placerat at lacus lorem fringilla"
            />
            <BlogCard 
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
              title="Porttitor quam dolor"
              excerpt="Id nullam massa morbi tellus ullamcorper dui mauris sed placerat at lacus lorem fringilla"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-24 pb-12 bg-zinc-900 text-white border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Get weekly strategies, techniques & offers.</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Join Africa's fastest-growing community of wealth builders. Get weekly insights, connect with like-minded investors, and access resources that make financial freedom achievable.
              </p>
              
              <div className="space-y-4">
                <p className="text-sm font-semibold text-white">Get digital marketing tips & trick direct to your inbox</p>
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
            </div>

            {/* Services / Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Services</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#" className="hover:text-amber-400">Digital Marketing Courses</a></li>
                <li><a href="#" className="hover:text-amber-400">Interactive Virtual Event</a></li>
                <li><a href="#" className="hover:text-amber-400">Virtual Keynote Speaker</a></li>
                <li><a href="#" className="hover:text-amber-400">Customer Experience Speaker</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6">Quick Link</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 text-left">About Me</button></li>
                <li><button onClick={() => onNavigate('masterclass')} className="hover:text-amber-400 text-left">All Courses</button></li>
                <li><button onClick={() => onNavigate('resources')} className="hover:text-amber-400 text-left">Resources</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400 text-left">Contact Me</button></li>
              </ul>
            </div>
          </div>
          
          {/* Contact Details Bottom */}
          <div className="border-t border-zinc-800 pt-12 pb-8">
             <div className="grid md:grid-cols-2 gap-8 mb-8">
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

const BookCard: React.FC<{ title: string; price: string; image: string; desc: string }> = ({ title, price, image, desc }) => (
  <div className="group">
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-100 mb-6 border border-zinc-200">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-900 shadow-sm">
        {price}
      </div>
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-3">
      {desc}
    </p>
    <button className="text-sm font-bold text-zinc-900 hover:text-amber-600 flex items-center gap-2 transition-colors">
      Purchase Now <ArrowRight size={16} />
    </button>
  </div>
);

const BlogCard: React.FC<{ image: string; title: string; excerpt: string }> = ({ image, title, excerpt }) => (
  <div className="group cursor-pointer">
    <div className="aspect-video bg-zinc-100 rounded-xl overflow-hidden mb-6 border border-zinc-200">
      <div 
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
      <span>Digital Marketing</span>
      <span className="w-1 h-1 rounded-full bg-zinc-300" />
      <span>5 Min Read</span>
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed mb-4">
      {excerpt}
    </p>
    <span className="text-sm font-bold text-zinc-900 underline decoration-zinc-300 underline-offset-4 group-hover:decoration-amber-500 transition-all">Read Article</span>
  </div>
);
