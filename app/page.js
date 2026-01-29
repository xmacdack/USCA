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

// ============== MOUSE FOLLOWER ==============
const MouseFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }
    const handleMouseLeave = () => setIsVisible(false)
    
    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{ x: mousePos.x - 6, y: mousePos.y - 6 }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
        style={{
          width: 12,
          height: 12,
          background: '#E50914',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(229, 9, 20, 0.5)',
        }}
      />
    </>
  )
}

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

// ============== FLOATING SPORTS ICONS ==============
const FloatingSportsIcons = () => {
  const sportsIcons = [
    // Soccer Ball
    { id: 'soccer', x: 5, y: 20, delay: 0, duration: 25, size: 45, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
        <path d="M50 2 L50 20 M50 80 L50 98 M2 50 L20 50 M80 50 L98 50" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
        <polygon points="50,15 35,35 20,30 25,50 15,65 35,65 50,85 65,65 85,65 75,50 80,30 65,35" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.4"/>
      </svg>
    )},
    // Basketball
    { id: 'basketball', x: 92, y: 35, delay: 3, duration: 22, size: 40, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E50914" strokeWidth="3" opacity="0.4"/>
        <path d="M5 50 Q 50 20 95 50" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
        <path d="M5 50 Q 50 80 95 50" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
        <line x1="50" y1="5" x2="50" y2="95" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
      </svg>
    )},
    // Football
    { id: 'football', x: 85, y: 70, delay: 6, duration: 28, size: 38, icon: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <ellipse cx="50" cy="35" rx="45" ry="30" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.35"/>
        <path d="M30 35 L70 35 M35 25 L35 45 M45 20 L45 50 M55 20 L55 50 M65 25 L65 45" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
      </svg>
    )},
    // Hockey Stick
    { id: 'hockey', x: 10, y: 75, delay: 9, duration: 30, size: 50, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M20 10 L20 70 Q20 85 35 85 L60 85" fill="none" stroke="#E50914" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
        <circle cx="75" cy="60" r="8" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.4"/>
      </svg>
    )},
    // Tennis Racket
    { id: 'tennis', x: 88, y: 15, delay: 4, duration: 26, size: 42, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="35" rx="30" ry="32" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.35"/>
        <line x1="50" y1="67" x2="50" y2="95" stroke="#E50914" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
        <path d="M25 35 L75 35 M35 15 L35 55 M50 10 L50 60 M65 15 L65 55" stroke="#E50914" strokeWidth="1" opacity="0.25"/>
      </svg>
    )},
    // Baseball
    { id: 'baseball', x: 15, y: 45, delay: 7, duration: 24, size: 35, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.35"/>
        <path d="M20 30 Q35 50 20 70" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.4"/>
        <path d="M80 30 Q65 50 80 70" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.4"/>
      </svg>
    )},
    // Golf Ball
    { id: 'golf', x: 75, y: 85, delay: 2, duration: 20, size: 30, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.3"/>
        <circle cx="35" cy="40" r="3" fill="#E50914" opacity="0.3"/>
        <circle cx="50" cy="35" r="3" fill="#E50914" opacity="0.3"/>
        <circle cx="65" cy="40" r="3" fill="#E50914" opacity="0.3"/>
        <circle cx="40" cy="55" r="3" fill="#E50914" opacity="0.3"/>
        <circle cx="60" cy="55" r="3" fill="#E50914" opacity="0.3"/>
        <circle cx="50" cy="65" r="3" fill="#E50914" opacity="0.3"/>
      </svg>
    )},
    // Boxing Glove
    { id: 'boxing', x: 3, y: 60, delay: 11, duration: 27, size: 40, icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M25 60 Q15 40 30 25 Q50 15 70 25 Q85 40 75 60 Q70 75 50 80 Q30 75 25 60" fill="none" stroke="#E50914" strokeWidth="2" opacity="0.35"/>
        <path d="M40 80 L40 95 M60 80 L60 95" stroke="#E50914" strokeWidth="3" opacity="0.3"/>
      </svg>
    )},
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {sportsIcons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.size, height: item.size }}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.icon}
        </motion.div>
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
      className="alert-banner text-white py-3 px-4 flex items-center justify-center gap-4 fixed top-0 left-0 right-0 z-[60]"
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
  { name: 'USA', code: 'us' }, { name: 'Canada', code: 'ca' }, { name: 'UK', code: 'gb' },
  { name: 'Germany', code: 'de' }, { name: 'France', code: 'fr' }, { name: 'Sweden', code: 'se' },
  { name: 'Norway', code: 'no' }, { name: 'Finland', code: 'fi' }, { name: 'Ireland', code: 'ie' },
  { name: 'Spain', code: 'es' }, { name: 'Italy', code: 'it' }, { name: 'Australia', code: 'au' },
  { name: 'Netherlands', code: 'nl' }, { name: 'Belgium', code: 'be' }, { name: 'Switzerland', code: 'ch' },
  { name: 'Portugal', code: 'pt' }, { name: 'Brazil', code: 'br' }, { name: 'Mexico', code: 'mx' }
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
  const num = parseInt(value) || 0
  const [count, setCount] = useState(num) // Start with real value!
  
  useEffect(() => {
    if (isInView) {
      // Quick count up from 80% of the value
      let current = num * 0.8
      setCount(Math.floor(current))
      const timer = setInterval(() => {
        current += num / 30
        if (current >= num) { setCount(num); clearInterval(timer) }
        else setCount(Math.floor(current))
      }, 40)
      return () => clearInterval(timer)
    }
  }, [isInView, num])
  
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
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${hasAlert ? 'top-12' : 'top-0'} ${scrolled ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-[#E50914] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Tv className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">IPTV<span className="text-[#E50914]">USCA</span></span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest hidden sm:block">Premium Streaming</span>
            </div>
          </motion.a>

          {/* Desktop Nav - Center */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center rounded-full p-1 transition-all ${scrolled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg'}`}>
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

          {/* Right Side - Single Primary CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                className="bg-[#E50914] hover:bg-[#c7080f] text-white rounded-full px-6 py-2.5 font-medium shadow-md"
                onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
              >
                Start Free Trial
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
              <span className="block">Premium IPTV</span>
              <span className="block text-gradient">streaming made simple.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Access 22,000+ live channels and 80,000+ movies in crystal clear 4K. 
              Instant activation, cancel anytime.
            </motion.p>
            
            {/* CTAs - Clear Hierarchy */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#E50914] hover:bg-[#c7080f] text-white px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" 
                onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:border-[#E50914] hover:text-[#E50914] px-8 py-6 rounded-full font-medium transition-all" 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Plans
              </Button>
            </motion.div>
            
            {/* 3 Proof Points - Cleaner */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
              {[
                { value: '22000', label: 'Live Channels', suffix: '+' }, 
                { value: '80000', label: 'Movies & Shows', suffix: '+' }, 
                { value: '24', label: 'Hour Activation', suffix: 'h' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
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

// ============== TRUST STRIP (Replaces noisy country carousel) ==============
const TrustStrip = () => (
  <section className="py-8 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">Secure Payments</p>
            <p className="text-xs text-gray-500">PayPal, Crypto, Cards</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">Instant Activation</p>
            <p className="text-xs text-gray-500">Start watching in minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">24/7 Support</p>
            <p className="text-xs text-gray-500">WhatsApp & Telegram</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">150+ Countries</p>
            <p className="text-xs text-gray-500">Worldwide coverage</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ============== FEATURES ==============
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featureGroups = [
    {
      title: 'Content',
      features: [
        { icon: Tv, title: '22,000+ Live Channels', desc: 'Sports, news, entertainment from 150+ countries' },
        { icon: Film, title: '80,000+ VOD Library', desc: 'Movies, series, documentaries on demand' },
      ]
    },
    {
      title: 'Quality',
      features: [
        { icon: Zap, title: '4K Ultra HD', desc: 'Crystal clear picture quality with HDR support' },
        { icon: Volume2, title: 'Premium Audio', desc: 'Dolby Digital and surround sound support' },
      ]
    },
    {
      title: 'Access',
      features: [
        { icon: Globe, title: 'Works Everywhere', desc: 'Fire Stick, Smart TV, iOS, Android, PC/Mac' },
        { icon: Shield, title: 'VPN Compatible', desc: 'Stream privately from anywhere' },
      ]
    },
    {
      title: 'Service',
      features: [
        { icon: Headphones, title: '24/7 Support', desc: 'WhatsApp & Telegram assistance anytime' },
        { icon: Clock, title: 'Instant Activation', desc: 'Start watching within minutes of signup' },
      ]
    },
  ]

  return (
    <section id="features" ref={ref} className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">Everything you need to stream</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Premium IPTV service with the features that matter most</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featureGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: groupIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xs font-semibold text-[#E50914] uppercase tracking-wider mb-4">{group.title}</h3>
              <div className="space-y-4">
                {group.features.map((feature, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#E50914]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#E50914]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
const PricingSection = ({ pricingData }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const pricing = pricingData || PRICING
  
  return (
    <section id="pricing" ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            All plans include every feature. Choose your subscription length.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {pricing.map((plan, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 transition-all ${
                plan.featured 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl scale-105' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Badge - Minimal */}
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-[#E50914] text-white px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              {plan.bestValue && !plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}
              
              {/* Duration */}
              <p className={`text-sm font-medium ${plan.featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500'}`}>
                {plan.duration}
              </p>
              
              {/* Price */}
              <div className="mt-3 mb-4">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500'}`}>
                  total
                </span>
              </div>
              
              {/* Effective Monthly */}
              <p className={`text-sm mb-6 ${plan.featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500'}`}>
                ${plan.monthly}/month effective
              </p>
              
              {/* CTA - Same label everywhere */}
              <Button 
                className={`w-full py-5 rounded-xl font-medium transition-all ${
                  plan.featured 
                    ? 'bg-[#E50914] hover:bg-[#c7080f] text-white' 
                    : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                }`}
                onClick={() => window.open(plan.link, '_blank')}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee - Once below grid */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          <Shield className="w-4 h-4 inline mr-1" />
          7-day money-back guarantee on all plans
        </motion.p>
      </div>
    </section>
  )
}

// ============== FAQ ==============
const FAQSection = ({ faqsData }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Extended FAQs with operational ones
  const defaultFaqs = [
    ...FAQS,
    { q: 'Do I need a VPN?', a: 'A VPN is not required but recommended for privacy. Our service works with all major VPN providers.' },
    { q: 'How does setup work?', a: 'We support both Xtream Codes and M3U playlist formats. After purchase, you\'ll receive login credentials and step-by-step setup guides for your device.' }
  ]
  
  const faqs = faqsData || defaultFaqs
  
  return (
    <section id="faq" ref={ref} className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">Frequently asked questions</h2>
          <p className="text-gray-500 mt-3">Everything you need to know about our IPTV service</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 px-5">
                <AccordionTrigger className="hover:no-underline text-left py-4 font-medium hover:text-[#E50914] transition-colors">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400 pb-4 text-sm leading-relaxed">{faq.a}</AccordionContent>
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
      <FloatingSportsIcons />
      <MouseFollower />
      <Confetti active={confetti} />
      <AnimatePresence>
        {hasAlert && <AlertBanner settings={settings} onClose={closeBanner} />}
      </AnimatePresence>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} hasAlert={hasAlert} />
      <HeroSection setConfetti={setConfetti} hasAlert={hasAlert} />
      <TrustStrip />
      <FeaturesSection />
      <PricingSection pricingData={settings?.pricing} />
      <FAQSection faqsData={settings?.faqs} />
      <ContactSection />
      <Footer />
    </main>
  )
}
