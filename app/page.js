'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Check, MessageCircle, Send, Menu, X,
  Crown, ArrowRight, Sparkles, PlayCircle, Headphones, 
  Sun, Moon, Wifi, Volume2, VolumeX, Star, Rocket, Gift, X as XIcon
} from 'lucide-react'

// ============== HERO ILLUSTRATION ==============
const HeroIllustration = () => (
  <div className="relative w-full max-w-lg mx-auto">
    {/* Main TV/Monitor */}
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[#E50914]/20 blur-3xl rounded-full scale-150" />
      
      {/* TV Frame */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl hero-image-glow">
        {/* Screen */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden aspect-video">
          {/* Screen Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/20 to-transparent" />
          
          {/* Streaming Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225">
            {[...Array(5)].map((_, i) => (
              <motion.rect
                key={i}
                x={50 + i * 70}
                y="80"
                width="40"
                height={40 + Math.random() * 60}
                rx="4"
                fill="#E50914"
                fillOpacity={0.3 + i * 0.1}
                initial={{ height: 20, y: 100 }}
                animate={{ height: [40, 80, 50, 70, 40], y: [100, 60, 80, 70, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </svg>
          
          {/* Play Button */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <motion.div 
              className="w-20 h-20 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
              whileHover={{ scale: 1.1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </motion.div>
          </motion.div>
          
          {/* Live Badge */}
          <motion.div 
            className="absolute top-4 left-4 bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="w-2 h-2 bg-white rounded-full" />
            LIVE
          </motion.div>
          
          {/* 4K Badge */}
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
            4K HDR
          </div>
        </div>
        
        {/* TV Stand */}
        <div className="flex justify-center mt-3">
          <div className="w-1/3 h-2 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-full" />
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute -top-8 -right-8 w-16 h-16 bg-[#E50914]/10 rounded-2xl flex items-center justify-center backdrop-blur border border-[#E50914]/20"
        animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Film className="w-8 h-8 text-[#E50914]" />
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-6 -left-6 w-14 h-14 bg-[#E50914]/10 rounded-xl flex items-center justify-center backdrop-blur border border-[#E50914]/20"
        animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Tv className="w-6 h-6 text-[#E50914]" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 -left-12 w-12 h-12 bg-[#E50914]/10 rounded-full flex items-center justify-center backdrop-blur border border-[#E50914]/20"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Globe className="w-5 h-5 text-[#E50914]" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/4 -right-10 w-10 h-10 bg-[#E50914]/10 rounded-lg flex items-center justify-center backdrop-blur border border-[#E50914]/20"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Star className="w-5 h-5 text-[#E50914]" />
      </motion.div>
    </motion.div>
  </div>
)

// ============== SVG ILLUSTRATIONS ==============
const WaveformSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 60" fill="none">
    {[...Array(20)].map((_, i) => (
      <motion.rect key={i} x={i * 10} y={20} width="4" height={20 + Math.random() * 30} rx="2" fill="#E50914" fillOpacity={0.3 + Math.random() * 0.4}
        animate={{ height: [20 + Math.random() * 20, 40 + Math.random() * 20, 20 + Math.random() * 20] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }} />
    ))}
  </svg>
)

const FloatingOrb = ({ className = '', color = '#E50914', size = 300, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ width: size, height: size, background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 30, 0], y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
)

// ============== PARTICLES ==============
const Particles = ({ count = 30 }) => {
  const [particles] = useState(() => [...Array(count)].map((_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 10, duration: 15 + Math.random() * 20, size: 2 + Math.random() * 4
  })))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-[#E50914]"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, bottom: -20 }}
          animate={{ y: [0, '-100vh'], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
      ))}
    </div>
  )
}

// ============== CONFETTI ==============
const Confetti = ({ active }) => {
  if (!active) return null
  const pieces = [...Array(80)].map((_, i) => ({ id: i, x: Math.random() * 100, color: ['#E50914', '#ff4444', '#ff6b6b', '#ffffff', '#ffd700'][Math.floor(Math.random() * 5)], delay: Math.random() * 0.5 }))
  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {pieces.map(p => (
        <motion.div key={p.id} className="absolute w-3 h-3" style={{ left: `${p.x}%`, top: -20, background: p.color, borderRadius: Math.random() > 0.5 ? '50%' : '0' }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '100vh', rotate: 720, opacity: [1, 1, 0] }}
          transition={{ duration: 3, delay: p.delay, ease: "easeIn" }} />
      ))}
    </div>
  )
}

// ============== ALERT BANNER ==============
const AlertBanner = ({ settings, onClose }) => {
  if (!settings?.showUpdateBanner) return null
  
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="alert-banner text-white py-3 px-4 flex items-center justify-center gap-4 relative z-[100]"
    >
      <motion.div 
        className="flex items-center gap-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Rocket className="w-5 h-5" />
        <span className="font-semibold text-sm md:text-base">{settings.bannerText || '🎉 NEW 2026 Updates Available!'}</span>
        <Gift className="w-5 h-5 hidden md:block" />
      </motion.div>
      <a href={settings.bannerLink || '#pricing'} className="bg-white text-[#E50914] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
        Learn More
      </a>
      <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 p-1 rounded-full transition-colors">
        <XIcon className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// ============== DATA ==============
const COUNTRIES = [
  { name: 'USA', flag: '🇺🇸' }, { name: 'Canada', flag: '🇨🇦' }, { name: 'UK', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' }, { name: 'France', flag: '🇫🇷' }, { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Norway', flag: '🇳🇴' }, { name: 'Finland', flag: '🇫🇮' }, { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Spain', flag: '🇪🇸' }, { name: 'Italy', flag: '🇮🇹' }, { name: 'Australia', flag: '🇦🇺' },
  { name: 'Netherlands', flag: '🇳🇱' }, { name: 'Belgium', flag: '🇧🇪' }, { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Portugal', flag: '🇵🇹' }, { name: 'Brazil', flag: '🇧🇷' }, { name: 'Mexico', flag: '🇲🇽' }
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

// ============== COUNTER ==============
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

// ============== THEME TOGGLE ==============
const ThemeToggle = ({ isDark, toggle }) => (
  <motion.button onClick={toggle} className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <motion.div className="absolute top-0.5 w-5 h-5 rounded-full bg-[#E50914] shadow-lg flex items-center justify-center" animate={{ left: isDark ? 'calc(100% - 24px)' : '2px' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
      {isDark ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-white" />}
    </motion.div>
  </motion.button>
)

// ============== NAVBAR ==============
const Navbar = ({ isDark, toggleTheme, hasAlert }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Features', icon: Sparkles },
    { name: 'Pricing', icon: Crown },
    { name: 'FAQ', icon: MessageCircle },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${hasAlert ? 'top-12' : 'top-0'} ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-white/5' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
            <motion.div 
              className="w-11 h-11 bg-gradient-to-br from-[#E50914] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Tv className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">IPTV<span className="text-[#E50914]">USCA</span></span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:block">Premium Streaming</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1.5">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeItem === item.name 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  {activeItem === item.name && (
                    <motion.div
                      layoutId="navBg"
                      className="absolute inset-0 bg-[#E50914] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            
            <motion.button 
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-[#E50914] transition-colors text-sm font-medium"
              onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
              whileHover={{ scale: 1.05 }}
            >
              <PlayCircle className="w-4 h-4" />
              Free Trial
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="btn-premium rounded-full px-6 py-2.5 flex items-center gap-2 shadow-lg shadow-red-500/25"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className="w-4 h-4" />
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <motion.button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800"
              whileTap={{ scale: 0.95 }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.a 
                    key={item.name}
                    href={`#${item.name.toLowerCase()}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 text-[#E50914]" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button 
                  className="btn-premium w-full rounded-full py-6 flex items-center justify-center gap-2"
                  onClick={() => { setMobileOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
                >
                  <Rocket className="w-5 h-5" />
                  Get Started Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ============== HERO SECTION ==============
const HeroSection = ({ setConfetti, hasAlert }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className={`min-h-screen flex items-center relative overflow-hidden ${hasAlert ? 'pt-32' : 'pt-24'}`}>
      <div className="absolute inset-0 animated-gradient-bg" />
      <div className="absolute inset-0 grid-pattern" />
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb className="-top-20 -left-20" size={600} delay={0} />
        <FloatingOrb className="top-1/3 -right-32" size={500} color="#ff4444" delay={2} />
        <FloatingOrb className="-bottom-40 left-1/4" size={400} delay={4} />
      </motion.div>
      <Particles count={25} />

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
              <motion.span className="section-label shadow-lg animate-glow-pulse" whileHover={{ scale: 1.05 }}>
                <motion.span className="w-2 h-2 bg-[#E50914] rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                Premium IPTV Service
              </motion.span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
              <span className="block">Stream everything.</span>
              <span className="block text-gradient">Pay almost nothing.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              22,000+ live channels. 80,000+ movies & series. Crystal clear 4K. Starting at just <span className="text-[#E50914] font-semibold">$8.33/month</span>.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-premium text-lg px-8 py-6 rounded-full font-semibold" onClick={() => { setConfetti(true); setTimeout(() => setConfetti(false), 3000); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Start Watching <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-outline-premium text-lg px-8 py-6 rounded-full font-semibold" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
                  <PlayCircle className="w-5 h-5 mr-2" /> Free Trial
                </Button>
              </motion.div>
            </motion.div>
            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10">
              {[{ value: '22000', label: 'Channels', suffix: '+', icon: Tv }, { value: '80000', label: 'Movies', suffix: '+', icon: Film }, { value: '99', label: 'Uptime', suffix: '%', icon: Wifi }].map((stat, i) => (
                <motion.div key={i} className="text-center" whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <stat.icon className="w-5 h-5 text-[#E50914]" />
                    <span className="text-3xl font-bold"><Counter value={stat.value} suffix={stat.suffix} /></span>
                  </div>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Right - Illustration */}
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>
      </motion.div>

      {/* Wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" className="fill-gray-50 dark:fill-gray-900" />
      </svg>
    </section>
  )
}

// ============== COUNTRIES CAROUSEL - FIXED ==============
const CountriesCarousel = () => (
  <section className="py-6 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 overflow-hidden">
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />
      
      <div className="animate-marquee">
        {[...COUNTRIES, ...COUNTRIES].map((country, i) => (
          <div key={i} className="country-flag-item mx-3 flex-shrink-0">
            <span className="text-2xl">{country.flag}</span>
            <span className="font-medium text-sm">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// ============== FEATURES ==============
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <FloatingOrb className="top-0 right-0" size={500} delay={0} />
      <FloatingOrb className="bottom-0 left-0" size={400} color="#ff4444" delay={3} />
      <Particles count={12} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-8">
          <motion.span className="section-label mb-4 inline-flex" whileHover={{ scale: 1.05 }}><Sparkles className="w-4 h-4" /> Features</motion.span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-4">Everything you need.</h2>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-300 dark:text-gray-700">Nothing you don't.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="md:col-span-2 bento-card rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            <motion.div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E50914]/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <motion.div className="w-14 h-14 bg-[#E50914]/10 rounded-xl flex items-center justify-center" whileHover={{ rotate: 10, scale: 1.1 }}><Tv className="w-7 h-7 text-[#E50914]" /></motion.div>
                <span className="text-5xl md:text-7xl font-bold text-gray-100 dark:text-gray-800 group-hover:text-[#E50914]/10 transition-colors">22K+</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Live TV Channels</h3>
              <p className="text-gray-500 dark:text-gray-400">Premium channels from every corner of the globe. Sports, news, entertainment, kids content, and more.</p>
            </div>
          </motion.div>
          {[{ icon: Zap, title: '4K Ultra HD', desc: 'Crystal clear picture quality.', delay: 0.2 }, { icon: Film, title: '80K+ VOD', desc: 'Movies, series, documentaries.', delay: 0.3 }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }} className="bento-card rounded-2xl p-5 group">
              <motion.div className="w-10 h-10 bg-[#E50914]/10 rounded-lg flex items-center justify-center mb-4" whileHover={{ rotate: 10, scale: 1.1 }}><item.icon className="w-5 h-5 text-[#E50914]" /></motion.div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="md:col-span-2 bento-card rounded-2xl p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {['Fire Stick', 'Android TV', 'Smart TV', 'iOS', 'Android', 'PC/Mac'].map((d, i) => (<motion.span key={i} className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#E50914] hover:text-white transition-all cursor-default" whileHover={{ scale: 1.05 }}>{d}</motion.span>))}
            </div>
            <h3 className="text-lg font-bold mb-1">Works Everywhere</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Stream on any device, anywhere in the world.</p>
          </motion.div>
          {[{ icon: Shield, title: 'VPN Compatible', desc: 'Private streaming.', delay: 0.5 }, { icon: Headphones, title: '24/7 Support', desc: 'Always here to help.', delay: 0.6 }, { icon: Clock, title: 'Instant Activation', desc: 'Start in minutes.', delay: 0.7 }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }} className="bento-card rounded-2xl p-5 group">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }}><item.icon className="w-8 h-8 text-[#E50914] mb-3" /></motion.div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============== VIDEO SECTION ==============
const VideoSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [muted, setMuted] = useState(true)

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted={muted} playsInline className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-in-a-sofa-at-home-50261-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <WaveformSVG className="absolute bottom-10 left-10 w-48" />
        <WaveformSVG className="absolute top-10 right-10 w-48" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-4xl mx-auto text-center text-white">
          <motion.button onClick={() => setMuted(!muted)} className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" whileHover={{ scale: 1.1 }}>
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
          <motion.span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}>
            <Play className="w-4 h-4 text-[#E50914]" fill="#E50914" /> Experience Premium Streaming
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Cinema Quality.<br /><span className="text-[#E50914]">Living Room Comfort.</span></h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">4K Ultra HD streaming with Dolby audio.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="btn-premium text-lg px-12 py-7 rounded-full font-semibold animate-glow-pulse" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
              <Play className="w-5 h-5 mr-2" fill="white" /> Start Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============== INTERACTIVE CTA ==============
const InteractiveCTA = ({ setConfetti }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(null)

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-gray-50 dark:via-gray-900 to-white dark:to-black" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <FloatingOrb className="top-10 left-10" size={300} delay={0} />
      <FloatingOrb className="bottom-10 right-10" size={350} color="#ff6b6b" delay={2} />
      <Particles count={10} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center">
          <motion.h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12" animate={hovered === 'yes' ? { scale: 1.02 } : { scale: 1 }}>
            Ready to <span className="text-gradient">stream</span>?
          </motion.h2>
          <div className="flex items-center justify-center gap-6">
            <motion.button onHoverStart={() => setHovered('yes')} onHoverEnd={() => setHovered(null)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="px-12 py-5 bg-[#E50914] text-white text-xl font-semibold rounded-full shadow-xl shadow-red-500/30" onClick={() => { setConfetti(true); setTimeout(() => setConfetti(false), 3000); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>Yes</motion.button>
            <motion.button onHoverStart={() => setHovered('no')} onHoverEnd={() => setHovered(null)} whileHover={{ scale: 1.1 }} className="px-12 py-5 bg-transparent text-gray-500 text-xl font-semibold rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#E50914] hover:text-[#E50914] transition-all" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>No</motion.button>
          </div>
          <AnimatePresence>
            {hovered === 'no' && (<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 text-gray-400">No worries, try our free 24h trial first →</motion.p>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ============== PRICING ==============
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const features = [
    '22,000+ Live Channels',
    '80,000+ Movies & Series',
    '4K Ultra HD Quality',
    'VPN Compatible',
    '24/7 Premium Support',
    'Instant Activation',
    'All Devices Supported',
    'Free Regular Updates'
  ]
  
  return (
    <section id="pricing" ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <FloatingOrb className="top-20 right-0" size={500} delay={0} />
      <FloatingOrb className="bottom-20 left-0" size={400} color="#ff4444" delay={2} />
      <Particles count={10} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-10"
        >
          <motion.span 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E50914]/10 to-[#ff4444]/10 border border-[#E50914]/20 text-[#E50914] px-5 py-2 rounded-full text-sm font-bold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-4 h-4" />
            GOLD SERVER
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Choose your <span className="text-gradient">plan</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-xl mx-auto">
            All plans include everything. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {PRICING.map((plan, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: index * 0.1 + 0.2 }}
              className="relative"
            >
              {/* Badge */}
              {(plan.featured || plan.bestValue) && (
                <motion.div 
                  className="absolute -top-4 left-0 right-0 flex justify-center z-10"
                  initial={{ scale: 0, y: 10 }}
                  animate={isInView ? { scale: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                >
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                    plan.featured 
                      ? 'bg-[#E50914] text-white shadow-red-500/30' 
                      : 'bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-black'
                  }`}>
                    {plan.featured ? '⭐ MOST POPULAR' : '💎 BEST VALUE'}
                  </span>
                </motion.div>
              )}
              
              {/* Card */}
              <motion.div
                className={`h-full rounded-3xl p-6 pt-8 transition-all duration-300 ${
                  plan.featured 
                    ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white border-2 border-[#E50914] shadow-2xl shadow-red-500/20' 
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#E50914]/50 hover:shadow-xl hover:shadow-red-500/5'
                }`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Plan Name */}
                <div className="mb-6">
                  <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                    plan.featured ? 'text-[#E50914]' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {plan.duration}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : ''}`}>
                      ${plan.price}
                    </span>
                  </div>
                  
                  {/* Savings */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm line-through ${plan.featured ? 'text-gray-500' : 'text-gray-400'}`}>
                      ${plan.original}
                    </span>
                    <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded-full">
                      ${plan.monthly}/mo
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full mb-6 ${plan.featured ? 'bg-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`} />

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {features.slice(0, 5).map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className={`flex items-center gap-3 text-sm ${
                        plan.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.featured ? 'bg-[#E50914]' : 'bg-[#E50914]/10'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.featured ? 'text-white' : 'text-[#E50914]'}`} />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className={`w-full py-6 rounded-2xl font-bold text-base transition-all ${
                      plan.featured 
                        ? 'bg-white text-black hover:bg-gray-100 shadow-lg' 
                        : 'bg-[#E50914] text-white hover:bg-[#c7080f] shadow-lg shadow-red-500/25'
                    }`}
                    onClick={() => window.open(plan.link, '_blank')}
                  >
                    {plan.featured ? 'Get Started Now' : 'Choose Plan'}
                  </Button>
                </motion.div>
                
                {/* Guarantee */}
                <p className={`text-xs text-center mt-4 ${plan.featured ? 'text-gray-500' : 'text-gray-400'}`}>
                  7-day money-back guarantee
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-gray-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Instant Activation</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-blue-500" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============== FAQ ==============
const FAQSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section id="faq" ref={ref} className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <span className="section-label mb-6 inline-flex">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6">Questions?</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-6 hover:border-[#E50914]/50 hover:shadow-lg transition-all">
                <AccordionTrigger className="hover:no-underline text-left py-5 font-semibold text-lg hover:text-[#E50914] transition-colors">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400 pb-5 text-base">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

// ============== CONTACT ==============
const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="py-12 relative overflow-hidden">
      <FloatingOrb className="bottom-0 right-0" size={400} delay={0} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-2xl mx-auto text-center">
          <span className="section-label mb-6 inline-flex"><MessageCircle className="w-4 h-4" /> Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-8">We're here to help.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[{ href: 'https://wa.me/14509127880', icon: MessageCircle, color: 'green', label: 'WhatsApp', info: '+1 (450) 912-7880' }, { href: 'https://t.me/iptvusca', icon: Send, color: 'blue', label: 'Telegram', info: '@iptvusca' }].map((item, i) => (
              <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -5 }} className="bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl">
                <motion.div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color === 'green' ? 'bg-green-500/10' : 'bg-blue-500/10'}`} whileHover={{ rotate: 10 }}>
                  <item.icon className={`w-7 h-7 ${item.color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                </motion.div>
                <span className="font-semibold text-lg">{item.label}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{item.info}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============== FOOTER ==============
const Footer = () => (
  <footer className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.a href="#" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center"><Tv className="w-4 h-4 text-white" /></div>
          <span className="font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </motion.a>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IPTVUSCA. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <motion.a href="https://wa.me/14509127880" target="_blank" className="text-gray-400 hover:text-green-600 transition-colors" whileHover={{ scale: 1.2 }}><MessageCircle className="w-5 h-5" /></motion.a>
          <motion.a href="https://t.me/iptvusca" target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors" whileHover={{ scale: 1.2 }}><Send className="w-5 h-5" /></motion.a>
        </div>
      </div>
    </div>
  </footer>
)

// ============== MAIN APP ==============
export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [settings, setSettings] = useState({ showUpdateBanner: true, bannerText: '🎉 NEW 2026 Updates: 4K HDR, Dolby Atmos & 50+ New Channels!' })
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(saved === 'dark' || (!saved && prefersDark))
    
    // Fetch settings from API
    fetch('/api/settings').then(r => r.json()).then(data => {
      setSettings(data)
      setShowBanner(data.showUpdateBanner)
    }).catch(() => {})
    
    // Check if banner was dismissed
    const dismissed = sessionStorage.getItem('bannerDismissed')
    if (dismissed) setShowBanner(false)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition')
    setIsDark(!isDark)
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500)
  }

  const closeBanner = () => {
    setShowBanner(false)
    sessionStorage.setItem('bannerDismissed', 'true')
  }

  const hasAlert = showBanner && settings?.showUpdateBanner

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="noise-overlay" />
      <Confetti active={confetti} />
      <AnimatePresence>
        {hasAlert && <AlertBanner settings={settings} onClose={closeBanner} />}
      </AnimatePresence>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} hasAlert={hasAlert} />
      <HeroSection setConfetti={setConfetti} hasAlert={hasAlert} />
      <CountriesCarousel />
      <FeaturesSection />
      <VideoSection />
      <InteractiveCTA setConfetti={setConfetti} />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
