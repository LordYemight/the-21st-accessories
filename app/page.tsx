'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronRight, Zap, Truck, RefreshCw, Star, Quote, Send, Instagram, Mail, Phone, MapPin, Shirt, Palette, Gem, ExternalLink, ArrowRight, Package, TrendingUp, Shield } from 'lucide-react';

// --- Hooks ---
const useScrollReveal = (threshold: number = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Data Structure (Mocked from Brief) ---
const BRAND_DATA = {
  name: "The 21st Accessories",
  tagline: "Jewelries = MOOD ✨ Endless Styles",
  description: "The 21st Accessories offers the best prices for trendy jewelries, sunglasses, scarfs, and bags in Lagos. We believe accessories set the mood and complete every outfit, offering style that is bold, youthful, and street-luxe approved.",
  contact: { whatsapp: "+2348000000000", instagram: "@the21staccessoriesng", email: "contact@the21staccessories.com", address: "Lagos, Nigeria" },
  colors: { primary: "#0a0a0a", secondary: "#d4af37", accent: "#e84393" },
  products: [
    { name: "Chunky Gold Ring", description: "A statement piece to elevate any look.", price: "₦12,500", emoji: "💍", icon: "Ring" },
    { name: "Oversized Shades", description: "High-fashion sunglasses perfect for sunny Lagos days.", price: "₦28,000", emoji: "😎", icon: "Sunglasses" },
    { name: "Layering Gold Chains", description: "Multiple delicate chains designed to be worn together.", price: "₦18,000", emoji: "🔗", icon: "Link" },
  ],
  features: [
    { title: "Mood Bundle Builder", description: "Create custom style bundles based on your current vibe and save instantly.", icon: "Zap" },
    { title: "Lagos Express Delivery", description: "Fast and reliable delivery service across Lagos mainland and island.", icon: "Truck" },
    { title: "Exchange Guarantee", description: "Hassle-free exchange available within 7 days (T&C apply).", icon: "RefreshCw" },
  ],
  testimonials: [
    { name: "Ayo M.", text: "My layering chains are flawless and look way more expensive than they were! Fast delivery too.", role: "Fashion Influencer" },
    { name: "Tosin B.", text: "The quality of the bags is amazing for the price point. I got so many compliments!", role: "Lagos Client" },
  ],
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "Shop", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
};

// --- Utility Components ---

const IconMap: { [key: string]: React.ElementType } = {
    Zap, Truck, RefreshCw, Star, Quote, Send, Instagram, Mail, Phone, MapPin, Shirt, Palette, Gem, ArrowRight, Package, TrendingUp, Shield,
    // Added specific icons needed for content
    Link: Package, UtensilsCrossed: Package, ChefHat: Package, Leaf: Package, Coffee: Package, Wine: Package, Cookie: Package,
    Ring: Gem, Sunglasses: Palette, Crown: Gem, Eye: Eye, Award: Award
};

const LucideIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
  const Component = IconMap[name] || Package;
  return <Component size={size} className={className} />;
};

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => (
    <a 
        href={href} 
        onClick={onClick}
        className="relative text-lg font-medium text-white/80 hover:text-white transition-colors duration-300 px-3 py-2 group"
    >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
);

// --- Layout Components ---

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        id="home"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="text-2xl font-heading font-extrabold tracking-widest text-[var(--secondary)]">
              21st<span className="text-[var(--accent)]">.NG</span>
            </a>
            
            <nav className="hidden md:flex space-x-6">
              {BRAND_DATA.navLinks.map(link => (
                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
              ))}
            </nav>

            <div className="hidden md:block">
                <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-primary transition-all duration-300 hover:brightness-125">
                    Holla At Us <ArrowRight size={16} />
                </a>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-0 z-[100] transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Backdrop */}
        {menuOpen && (
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
        
        {/* Panel */}
        <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[var(--primary)] shadow-2xl border-l-2 border-[var(--accent)] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-heading font-extrabold tracking-widest text-[var(--secondary)]">21st.NG</span>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full text-white hover:bg-[var(--accent)] transition-colors duration-300"
              aria-label="Close Menu"
            >
              <X size={30} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 flex-grow">
            {BRAND_DATA.navLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-heading font-bold text-white hover:text-[var(--accent)] transition-colors duration-300 py-3 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className='mt-8 pt-4 border-t border-white/10'>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary w-full block text-center py-3 rounded-lg font-bold text-lg">
                Get In Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Section Components ---

// HR1 Hero Section
const HeroSection = () => {
    const { ref, isVisible } = useScrollReveal(0.1);
    return (
        <section ref={ref} id="hero" className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/70 z-0 opacity-90" />
            
            {/* Abstract Shapes for Depth */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-3xl animate-float" style={{animationDelay: '-2s'}}></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl animate-float" style={{animationDelay: '-4s'}}></div>


            <div className={`z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-extrabold mb-4 leading-tight tracking-tighter drop-shadow-lg">
                    {BRAND_DATA.tagline.split(' ').map((word, index) => (
                        <span key={index} className={`block ${index === 1 ? 'text-[var(--accent)]' : 'text-white'}`}>
                            {word}
                        </span>
                    ))}
                </h1>
                <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto mb-10 font-medium">
                    Trendy jewelries, sunglasses, scarfs, and bags in Lagos. Street-Luxe styles starting at ₦10k.
                </p>
                <a href={BRAND_DATA.navLinks.find(l => l.name === "Shop")?.href} className="btn-primary inline-flex items-center gap-3 px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    Shop The Mood <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </section>
    );
};

// S3 Marquee Section
const MarqueeSection = () => {
    const items = useMemo(() => [...BRAND_DATA.features, ...BRAND_DATA.features].map(item => item.title), [BRAND_DATA.features]);
    return (
        <div className="py-4 bg-white/5 border-y border-white/10 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((item, index) => (
                    <span key={index} className="mx-10 text-3xl sm:text-4xl font-heading font-extrabold text-[var(--secondary)] uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default select-none">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Products Section (Layout Grid-3)
const ProductsSection = () => {
    const { ref, isVisible } = useScrollReveal();
    
    const ProductCard = ({ product, index }: { product: (typeof BRAND_DATA.products)[0], index: number }) => {
        const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1);
        
        return (
            <div 
                ref={cardRef}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-700 border border-white/10 
                  bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/5 
                  hover:scale-[1.03] shadow-lg hover:shadow-[0_0_30px_rgba(232,67,147,0.3)]
                  ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
            >
                {/* Icon Visual */}
                <span className="text-7xl block mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500 text-[var(--secondary)]">
                    <LucideIcon name={product.icon} size={64} />
                </span>
                
                <h3 className="font-heading text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-white/70 mt-2 text-base line-clamp-3">{product.description}</p>
                <p className="text-[var(--secondary)] font-extrabold text-2xl mt-4 tracking-wider">{product.price}</p>
                
                <a href="#contact"
                  className="mt-6 inline-flex items-center gap-2 
                  btn-primary px-6 py-2.5 rounded-full 
                  font-bold text-sm transition-all duration-300">
                  Cop Yours <ArrowRight size={16} />
                </a>
            </div>
        );
    };

    return (
        <section id="products" className="py-20 sm:py-28 bg-glow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref}>
                    <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-3">
                        {BRAND_DATA.sections.find(s => s.id === 'products')?.title || "Shop Our Bestsellers"}
                    </h2>
                    <p className="text-lg text-white/60 max-w-xl mx-auto">
                        {BRAND_DATA.sections.find(s => s.id === 'products')?.subtitle || "Styles that set the tone for your entire look."}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {BRAND_DATA.products.map((product, i) => (
                        <ProductCard key={i} product={product} index={i} />
                    ))}
                </div>

                <div className="text-center mt-16">
                     <a href="#contact" className="text-[var(--secondary)] font-bold text-lg hover:text-white transition-colors flex items-center justify-center gap-2 group">
                        View Full Catalogue <ExternalLink size={18} className='group-hover:scale-110 transition-transform'/>
                    </a>
                </div>
            </div>
        </section>
    );
};


// About Section (HR2 Pattern equivalent, using stats)
const AboutSection = () => {
    const { ref, isVisible } = useScrollReveal();

    const features = BRAND_DATA.features.map(f => ({
        ...f,
        key: f.title.replace(/\s/g, '')
    }));

    const StatCard = ({ stat, index }: { stat: (typeof BRAND_DATA.features)[0] & { number: string }, index: number }) => {
        const { ref: statRef, isVisible: statVisible } = useScrollReveal(0.2);
        return (
            <div 
                ref={statRef}
                style={{ transitionDelay: `${index * 0.15}s` }}
                className={`p-8 rounded-xl text-center border border-white/10 bg-white/5 transition-all duration-700 shadow-xl 
                    ${statVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--accent)]/20 flex items-center justify-center transition-all duration-500 group-hover:rotate-6">
                    <LucideIcon name={stat.icon} size={30} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-5xl font-heading font-extrabold text-[var(--secondary)] mb-1">{stat.number}</h3>
                <p className="text-sm uppercase tracking-widest text-white/70">{stat.label}</p>
            </div>
        );
    };

    return (
        <section id="about" className="py-20 sm:py-28 relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Abstract shapes for depth */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-[var(--accent)]/5 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-[var(--secondary)]/5 rounded-full filter blur-3xl animate-float" style={{animationDelay: '-3s'}}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref}>
                    <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-3">
                        {BRAND_DATA.sections.find(s => s.id === 'about')?.title || "About Us"}
                    </h2>
                    <p className="text-lg text-white/60 max-w-3xl mx-auto">
                        {BRAND_DATA.description}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                    {BRAND_DATA.testimonials[0] && <StatCard stat={{...BRAND_DATA.features[0], number: "2023", label: "Year Established"}} index={0} />}
                    {BRAND_DATA.testimonials[1] && <StatCard stat={{...BRAND_DATA.features[1], number: "50+", label: "Styles Added Monthly"}} index={1} />}
                    <StatCard stat={{number: "100+", label: "5-Star Reviews", icon: "Star"}} index={2} />
                </div>

                {/* Features Grid (Style Pillars) */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref}>
                    <h3 className="text-3xl font-heading font-bold text-center mb-10 border-b border-white/20 pb-4 max-w-4xl mx-auto">
                        Why The 21st?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={feature.key} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:shadow-xl">
                                <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                                    <LucideIcon size={30} name={feature.icon} className="text-[var(--accent)] group-hover:rotate-12" />
                                </div>
                                <h3 className="font-heading text-xl font-bold">{feature.title}</h3>
                                <p className="text-white/60 mt-2 text-sm line-clamp-3">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// Testimonials Section (Slide-up from bottom)
const TestimonialsSection = () => {
    const { ref, isVisible } = useScrollReveal(0.1);

    const TestimonialCard = ({ item, index }: { item: (typeof BRAND_DATA.testimonials)[0], index: number }) => {
        const { ref: cardRef, isVisible: cardVisible } = useScrollReveal(0.1);
        return (
            <div 
                ref={cardRef}
                style={{ transitionDelay: `${index * 0.15}s` }}
                className={`p-8 rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 ${
                    cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
            >
                <div className='flex mb-3'>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className={`text-[var(--secondary)] ${i < 4 ? 'fill-current' : ''}`} />
                    ))}
                </div>
                <Quote size={32} className="text-[var(--accent)] mb-4 opacity-70" />
                <p className="text-white/90 italic line-clamp-3 mb-4">"{item.text}"</p>
                <div className="border-t border-white/10 pt-3">
                    <p className="font-heading font-bold text-lg text-[var(--secondary)]">{item.name}</p>
                    <p className="text-xs text-white/50 mt-0.5">{item.role}</p>
                </div>
            </div>
        );
    };

    return (
        <section id="testimonials" className="py-20 sm:py-28 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref}>
                    <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-3">
                        {BRAND_DATA.sections.find(s => s.id === 'testimonials')?.title || "Hear From The Style Set"}
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {BRAND_DATA.testimonials.map((item, i) => (
                        <TestimonialCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Contact Section (C2 Pattern)
const ContactSection = () => {
    const { ref, isVisible } = useScrollReveal();
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStatus('success');
        // Reset form state after a delay
        setTimeout(() => setStatus('idle'), 4000);
    };

    const ContactInfo = ({ icon, label, value, href }: { icon: string, label: string, value: string, href: string }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-300 group">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors duration-300">
                <LucideIcon name={icon} size={20} className="text-[var(--accent)] group-hover:text-black" />
            </div>
            <div>
                <p className="text-sm uppercase tracking-wider text-white/60">{label}</p>
                <p className="font-heading font-bold text-lg group-hover:text-[var(--accent)] transition-colors">{value}</p>
            </div>
        </a>
    );

    return (
        <section id="contact" className="py-20 sm:py-28 bg-black relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref}>
                    <h2 className="text-4xl sm:text-5xl font-heading font-extrabold mb-3 text-[var(--secondary)]">
                        {BRAND_DATA.sections.find(s => s.id === 'contact')?.title || "Ready to Elevate Your Look?"}
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        DM us for styling advice or send us an enquiry. We ensure swift responses!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                    
                    {/* Contact Info Panel */}
                    <div className='space-y-4'>
                        <h3 className="text-3xl font-heading font-bold mb-6 text-white">Get Connected</h3>
                        <ContactInfo 
                            icon="Mail" 
                            label="Email Address" 
                            value={BRAND_DATA.contact.email} 
                            href={`mailto:${BRAND_DATA.contact.email}`}
                        />
                        <ContactInfo 
                            icon="Phone" 
                            label="WhatsApp Line" 
                            value={BRAND_DATA.contact.whatsapp} 
                            href={`https://wa.me/${BRAND_DATA.contact.whatsapp.replace(/\+/g, '')}`}
                        />
                         <ContactInfo 
                            icon="Instagram" 
                            label="Instagram" 
                            value={BRAND_DATA.contact.instagram} 
                            href={`https://instagram.com/${BRAND_DATA.contact.instagram}`}
                        />
                        <ContactInfo 
                            icon="MapPin" 
                            label="Base Location" 
                            value={BRAND_DATA.contact.address} 
                            href="#" // Placeholder for map link
                        />
                    </div>

                    {/* Contact Form */}
                    <div className="bg-black p-6 sm:p-8 rounded-xl border border-white/10 shadow-inner">
                        <h3 className="text-2xl font-heading font-bold mb-6 text-[var(--accent)]">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1 text-white/80">Your Name</label>
                                <input type="text" id="name" name="name" required 
                                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-colors duration-300 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1 text-white/80">Your Email / IG Handle</label>
                                <input type="text" id="email" name="email" required 
                                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-colors duration-300 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1 text-white/80">What are you looking for?</label>
                                <textarea id="message" name="message" rows={4} required 
                                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-colors duration-300 text-white"
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full btn-primary py-3 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' && <TrendingUp size={20} className='animate-spin' />}
                                {status === 'sending' ? 'Sending Specs...' : status === 'success' ? 'Sent Successfully! ✓' : 'Slide Into DMs'}
                                {status === 'idle' && <Send size={20} />}
                            </button>

                            {status === 'success' && (
                                <div className="mt-4 p-3 bg-green-600/20 border border-green-500 text-green-300 rounded-lg text-center font-bold animate-fadeIn">
                                    Message Received! We'll holla back shortly.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer (F2 Pattern)
const Footer = () => {
    return (
        <footer id="footer" className="bg-primary border-t border-white/10 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
                    
                    {/* Col 1: Brand Info */}
                    <div className="col-span-2 md:col-span-1">
                        <a href="#home" className="text-3xl font-heading font-extrabold tracking-widest text-[var(--secondary)]">
                            21st<span className="text-[var(--accent)]">.NG</span>
                        </a>
                        <p className="text-sm text-white/60 mt-3 max-w-xs">
                            {BRAND_DATA.tagline} | Serving Lagos with pure style.
                        </p>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-4 text-white">Navigation</h4>
                        <ul className="space-y-2">
                            {BRAND_DATA.navLinks.map(link => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1">
                                        <ChevronRight size={16} className='text-[var(--accent)]/50 group-hover:text-[var(--accent)]'/> {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Support */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-4 text-white">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1"><ChevronRight size={16} className='text-[var(--accent)]/50'/> FAQs</a></li>
                            <li><a href="#" className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1"><ChevronRight size={16} className='text-[var(--accent)]/50'/> Delivery Info</a></li>
                            <li><a href="#" className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1"><ChevronRight size={16} className='text-[var(--accent)]/50'/> Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Connect */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-4 text-white">Connect</h4>
                        <div className="flex space-x-4">
                            <a href={`https://instagram.com/${BRAND_DATA.contact.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="p-2 rounded-full border border-white/20 text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black transition-all duration-300 group"
                            >
                                <Instagram size={24} className='text-white group-hover:text-black transition-colors' />
                            </a>
                            <a href={`https://wa.me/${BRAND_DATA.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                                className="p-2 rounded-full border border-white/20 text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black transition-all duration-300 group"
                            >
                                <Phone size={24} className='text-white group-hover:text-black transition-colors' />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-white/50">
                    &copy; {new Date().getFullYear()} The 21st Accessories. All Rights Reserved. Built for Lagos Style.
                </div>
            </div>
        </footer>
    );
};


// --- Main Page Component ---

export default function StreetLuxePage() {
  const { ref: mainRef, isVisible: mainVisible } = useScrollReveal(0.05);

  return (
    <main className='min-h-screen bg-primary text-white antialiased'>
      <Header />
      
      <div ref={mainRef} className={`pt-0 ${mainVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
        
        {/* Section 1: Hero (HR1) */}
        <HeroSection />

        {/* Section 2: Marquee (S3) */}
        <div className='py-0'>
             <MarqueeSection />
        </div>
       
        {/* Section 3: Products (Grid-3) */}
        <ProductsSection />

        {/* Section 4: About/Features (Custom with Stats) */}
        <AboutSection />

        {/* Section 5: Testimonials */}
        <TestimonialsSection />
        
        {/* Section 6: Contact (C2) */}
        <ContactSection />

        {/* Section 7: Footer (F2) */}
        <Footer />

      </div>
    </main>
  );
}