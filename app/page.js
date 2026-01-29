'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Check, MessageCircle, Send, Menu, X,
  Smartphone, Monitor, Crown, ArrowRight, Sparkles,
  PlayCircle, Headphones, Star, ArrowUpRight, Wifi
} from 'lucide-react'

// SVG Components
const GridSVG = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E50914" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
)

const CirclesSVG = () => (
  <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <circle cx="500" cy="500" r="400" fill="none" stroke="#E50914" strokeWidth="0.5" className="animate-spin-slow" style={{ transformOrigin: '500px 500px' }} />
    <circle cx="500" cy="500" r="300" fill="none" stroke="#E50914" strokeWidth="0.5" className="animate-spin-reverse" style={{ transformOrigin: '500px 500px' }} />
    <circle cx="500" cy="500" r="200" fill="none" stroke="#E50914" strokeWidth="0.5" className="animate-spin-slow" style={{ transformOrigin: '500px 500px' }} />
  </svg>
)

const WaveSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path fill="#fafafa" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
)

const AbstractShapeSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E50914" fillOpacity="0.1" d="M47.5,-57.2C59.9,-45.8,67.5,-29.5,71.1,-12C74.7,5.5,74.3,24.2,65.8,38.1C57.3,52,40.7,61.1,23.2,66.5C5.7,71.9,-12.7,73.6,-29.5,68.5C-46.3,63.4,-61.5,51.5,-70.1,35.6C-78.7,19.7,-80.7,-0.2,-75.2,-17.6C-69.7,-35,-56.7,-49.9,-41.8,-60.7C-26.9,-71.5,-10.1,-78.2,4.1,-83.1C18.3,-88,35.1,-68.6,47.5,-57.2Z" transform="translate(100 100)" />
  </svg>
)

const FloatingOrb = ({ className = '', color = '#E50914', size = 300, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    style={{ 
      width: size, 
      height: size, 
      background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` 
    }}
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 30, 0],
      y: [0, -20, 0]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
  />
)

const FloatingShape = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, 0]
    }}
    transition={{ 
      duration: 6 + delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {children}
  </motion.div>
)

// Data
const COUNTRIES = [
  '🇺🇸 USA', '🇨🇦 Canada', '🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', 
  '🇸🇪 Sweden', '🇳🇴 Norway', '🇫🇮 Finland', '🇮🇪 Ireland', '🇪🇸 Spain',
  '🇮🇹 Italy', '🇦🇺 Australia', '🇳🇱 Netherlands', '🇧🇪 Belgium', '🇨🇭 Switzerland'
]

const PRICING = [
  { duration: '1 Month', price: '14.99', original: '30', monthly: '14.99', link: 'https://iptvusca.sell.app/product/1-month-trial-nero-gold?quantity=1&info=faq' },
  { duration: '3 Months', price: '39.99', original: '60', monthly: '13.33', link: 'https://iptvusca.sell.app/product/3-months-claudius-Gold?store=iptvusca&quantity=1&info=faq' },
  { duration: '6 Months', price: '69.99', original: '90', monthly: '11.67', featured: true, link: 'https://iptvusca.sell.app/product/6-months-julius-caesar-gold?store=iptvusca&quantity=1&info=faq' },
  { duration: '1 Year', price: '99.99', original: '140', monthly: '8.33', bestValue: true, link: 'https://iptvusca.sell.app/product/12-months-augustus-gold?store=iptvusca&quantity=1&info=faq' }
]

const FAQS = [
  { q: 'Can I use multiple devices?', a: 'Each subscription supports one device at a time. Additional connections available for extra fee.' },
  { q: 'What devices are supported?', a: 'Fire Stick, Android TV, Smart TV (Samsung, LG), iOS, Android, PC, Mac, and all streaming boxes.' },
  { q: 'Is there a refund policy?', a: "Free 24-hour trial for all customers. Full refund within 7 days if not satisfied." },
  { q: 'How fast is activation?', a: 'Instant activation after payment. Our team works 24/7.' },
  { q: 'Do you update content?', a: 'Yes! Regular updates with new movies, series, and channels. All updates are free.' },
  { q: 'What payment methods?', a: 'PayPal, cryptocurrency (Bitcoin), and all major credit cards.' }
]

// Animated Counter
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const num = parseInt(value)
      let current = 0
      const timer = setInterval(() => {
        current += num / 50
        if (current >= num) { setCount(num); clearInterval(timer) }
        else setCount(Math.floor(current))
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <motion.div 
            className="w-10 h-10 bg-[#E50914] rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Tv className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'FAQ'].map(item => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-gray-600 hover:text-black transition-colors text-sm font-medium relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E50914] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-gray-600 hover:text-[#E50914]" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
            Free Trial
          </Button>
          <Button className="bg-[#E50914] hover:bg-[#c7080f] text-white rounded-full px-6 shadow-lg shadow-red-500/25" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-xl border-t">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {['Features', 'Pricing', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 py-2" onClick={() => setMobileOpen(false)}>{item}</a>
              ))}
              <Button className="bg-[#E50914] text-white w-full rounded-full" onClick={() => { setMobileOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 animated-gradient-bg" />
      <GridSVG />
      
      {/* Floating Orbs */}
      <FloatingOrb className="-top-20 -left-20" size={500} delay={0} />
      <FloatingOrb className="top-1/4 -right-32" size={400} color="#ff6b6b" delay={2} />
      <FloatingOrb className="-bottom-20 left-1/4" size={350} delay={4} />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-[600px] h-[600px] opacity-20 pointer-events-none">
        <CirclesSVG />
      </div>

      {/* Floating Shapes */}
      <FloatingShape className="top-32 left-20 opacity-20" delay={0}>
        <div className="w-20 h-20 border-2 border-[#E50914] rounded-2xl rotate-12" />
      </FloatingShape>
      <FloatingShape className="top-40 right-32 opacity-20" delay={1}>
        <div className="w-16 h-16 bg-[#E50914]/10 rounded-full" />
      </FloatingShape>
      <FloatingShape className="bottom-40 left-32 opacity-20" delay={2}>
        <div className="w-12 h-12 border-2 border-[#E50914]/30 rounded-lg rotate-45" />
      </FloatingShape>
      <FloatingShape className="bottom-32 right-20 opacity-10" delay={1.5}>
        <AbstractShapeSVG className="w-32 h-32" />
      </FloatingShape>

      {/* Animated Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.line 
          x1="0" y1="50%" x2="100%" y2="50%" 
          stroke="#E50914" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line 
          x1="50%" y1="0" x2="50%" y2="100%" 
          stroke="#E50914" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity, scale }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ delay: 0.1, type: "spring" }} 
            className="mb-8"
          >
            <span className="section-label shadow-lg">
              <motion.span 
                className="w-2 h-2 bg-[#E50914] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Premium IPTV Service
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
          >
            <span className="block">Stream everything.</span>
            <span className="block text-gradient">Pay almost nothing.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }} 
            className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-light"
          >
            22,000+ live channels. 80,000+ movies & series. 
            Crystal clear 4K. Starting at just <span className="text-[#E50914] font-semibold">$8.33/month</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.8 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-[#E50914] hover:bg-[#c7080f] text-white text-lg px-10 py-7 rounded-full font-semibold shadow-xl shadow-red-500/30 group" 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Watching
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#E50914] text-lg px-10 py-7 rounded-full font-semibold" 
                onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Try Free for 24h
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.8 }} 
            className="flex flex-wrap justify-center gap-12 md:gap-20"
          >
            {[
              { value: '22000', label: 'Live Channels', suffix: '+', icon: Tv },
              { value: '80000', label: 'VOD Content', suffix: '+', icon: Film },
              { value: '99', label: 'Uptime', suffix: '%', icon: Wifi },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-12 h-12 bg-[#E50914]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-[#E50914]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-black">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5 }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      <WaveSVG className="absolute bottom-0 left-0 w-full" />
    </section>
  )
}

// Countries Marquee
const CountriesMarquee = () => (
  <section className="py-8 bg-gray-50 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute inset-0 dot-pattern opacity-50" />
    
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...COUNTRIES, ...COUNTRIES, ...COUNTRIES].map((country, i) => (
          <span key={i} className="mx-8 text-gray-500 font-medium text-lg">{country}</span>
        ))}
      </div>
    </div>
  </section>
)

// Bento Features Grid
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <FloatingOrb className="top-0 right-0" size={600} color="#E50914" delay={0} />
      <FloatingOrb className="bottom-0 left-0" size={500} color="#ff6b6b" delay={3} />
      
      {/* Decorative SVG */}
      <FloatingShape className="top-20 right-10 opacity-10" delay={2}>
        <AbstractShapeSVG className="w-64 h-64" />
      </FloatingShape>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-16"
        >
          <motion.span 
            className="section-label mb-6 inline-flex"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            Features
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">Everything you need.</h2>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-300">Nothing you don't.</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.1 }} 
            className="md:col-span-2 bento-card rounded-3xl p-8 md:p-12 hover-lift relative overflow-hidden group"
          >
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-[#E50914]/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <motion.div 
                  className="w-16 h-16 bg-[#E50914]/10 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Tv className="w-8 h-8 text-[#E50914]" />
                </motion.div>
                <span className="text-6xl md:text-8xl font-bold text-gray-100 group-hover:text-[#E50914]/10 transition-colors">22K+</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Live TV Channels</h3>
              <p className="text-gray-500 text-lg">Premium channels from every corner of the globe. Sports, news, entertainment, kids content, and more. Never miss a moment.</p>
            </div>
          </motion.div>

          {/* Small Cards */}
          {[
            { icon: Zap, title: '4K Ultra HD', desc: 'Crystal clear picture quality on every stream.', delay: 0.2 },
            { icon: Film, title: '80K+ Movies & Series', desc: 'Latest blockbusters, classics, and binge-worthy series.', delay: 0.3 },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: item.delay }} 
              className="bento-card rounded-3xl p-8 hover-lift group"
            >
              <motion.div 
                className="w-12 h-12 bg-[#E50914]/10 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <item.icon className="w-6 h-6 text-[#E50914]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}

          {/* Devices Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.4 }} 
            className="md:col-span-2 bento-card rounded-3xl p-8 hover-lift"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {['Fire Stick', 'Android TV', 'Smart TV', 'iOS', 'Android', 'PC/Mac'].map((device, i) => (
                <motion.span 
                  key={i} 
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-[#E50914] hover:text-[#E50914] transition-colors cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {device}
                </motion.span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">Works Everywhere</h3>
            <p className="text-gray-500">Stream on any device, anywhere in the world. Instant setup, no technical skills required.</p>
          </motion.div>

          {/* Bottom Row */}
          {[
            { icon: Shield, title: 'VPN Compatible', desc: 'Full support for secure, private streaming.', delay: 0.5 },
            { icon: Headphones, title: '24/7 Support', desc: 'Expert help whenever you need it.', delay: 0.6 },
            { icon: Clock, title: 'Instant Activation', desc: 'Start watching within minutes of signup.', delay: 0.7 },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: item.delay }} 
              className="bento-card rounded-3xl p-8 hover-lift group"
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                <item.icon className="w-10 h-10 text-[#E50914] mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Interactive CTA Section
const InteractiveCTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(null)

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Animated Background Elements */}
      <FloatingOrb className="top-10 left-10" size={300} delay={0} />
      <FloatingOrb className="bottom-10 right-10" size={350} color="#ff6b6b" delay={2} />
      
      {/* Decorative Shapes */}
      <FloatingShape className="top-20 right-1/4 opacity-20" delay={1}>
        <div className="w-24 h-24 border-4 border-[#E50914] rounded-full" />
      </FloatingShape>
      <FloatingShape className="bottom-20 left-1/4 opacity-20" delay={2}>
        <div className="w-16 h-16 bg-[#E50914]/20 rounded-2xl rotate-45" />
      </FloatingShape>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-12"
            animate={hovered === 'yes' ? { scale: 1.02 } : { scale: 1 }}
          >
            Ready to <span className="text-gradient">stream</span>?
          </motion.h2>
          
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onHoverStart={() => setHovered('yes')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cta-btn cta-btn-yes text-xl"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Yes
            </motion.button>
            <motion.button
              onHoverStart={() => setHovered('no')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.1 }}
              className="cta-btn cta-btn-no text-xl"
              onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
            >
              No
            </motion.button>
          </div>

          <AnimatePresence>
            {hovered === 'no' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 text-gray-400"
              >
                No worries, try our free 24h trial first →
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="pricing" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 grid-pattern" />
      <FloatingOrb className="top-20 right-0" size={500} delay={0} />
      <FloatingOrb className="bottom-20 left-0" size={400} color="#ff6b6b" delay={2} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-16"
        >
          <motion.span 
            className="section-label mb-6 inline-flex"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-4 h-4" />
            Gold Server
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">Simple pricing.</h2>
          <p className="text-gray-500 text-lg mt-4">All plans include everything. No hidden fees.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`pricing-modern ${plan.featured ? 'featured' : ''} relative`}
            >
              {plan.featured && (
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="bg-[#E50914] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">POPULAR</span>
                </motion.div>
              )}
              {plan.bestValue && (
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">BEST VALUE</span>
                </motion.div>
              )}
              
              <div className="mb-6">
                <p className={`text-sm font-medium mb-2 ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>{plan.duration}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-black'}`}>${plan.price}</span>
                </div>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-gray-400' : 'text-gray-400'}`}>
                  <span className="line-through">${plan.original}</span>
                  <span className="mx-1">•</span>
                  <span className="text-[#E50914] font-semibold">${plan.monthly}/mo</span>
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {['22K+ Channels', '80K+ Movies', '4K Quality', 'VPN Support', '24/7 Help'].map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Check className="w-4 h-4 text-[#E50914]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full rounded-full py-6 font-semibold ${
                    plan.featured 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  onClick={() => window.open(plan.link, '_blank')}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
const FAQSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="faq" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <FloatingOrb className="top-0 left-1/4" size={400} delay={1} />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6">Questions?</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-white rounded-2xl border border-gray-100 px-6 hover:border-[#E50914]/30 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-black hover:no-underline text-left py-5 font-semibold text-lg hover:text-[#E50914] transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-5 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <FloatingOrb className="bottom-0 right-0" size={400} delay={0} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="max-w-2xl mx-auto text-center"
        >
          <span className="section-label mb-6 inline-flex">
            <MessageCircle className="w-4 h-4" />
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-12">We're here to help.</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: 'https://wa.me/14509127880', icon: MessageCircle, color: 'green', label: 'WhatsApp', info: '+1 (450) 912-7880' },
              { href: 'https://t.me/iptvusca', icon: Send, color: 'blue', label: 'Telegram', info: '@iptvusca' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 hover:bg-white rounded-2xl p-8 flex flex-col items-center gap-3 transition-all border border-transparent hover:border-gray-200 hover:shadow-xl"
              >
                <motion.div 
                  className={`w-14 h-14 bg-${item.color}-500/10 rounded-full flex items-center justify-center`}
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                </motion.div>
                <span className="font-semibold text-lg">{item.label}</span>
                <span className="text-gray-500 text-sm">{item.info}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="py-8 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
    <div className="absolute inset-0 dot-pattern opacity-30" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.a 
          href="#" 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
            <Tv className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </motion.a>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IPTVUSCA. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <motion.a 
            href="https://wa.me/14509127880" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-green-600 transition-colors"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <MessageCircle className="w-5 h-5" />
          </motion.a>
          <motion.a 
            href="https://t.me/iptvusca" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.2, rotate: -10 }}
          >
            <Send className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </div>
  </footer>
)

// Main App
export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <CountriesMarquee />
      <FeaturesSection />
      <InteractiveCTA />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
