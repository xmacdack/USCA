'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Check, MessageCircle, Send, Menu, X,
  Smartphone, Monitor, Crown, ArrowRight, Sparkles,
  PlayCircle, Headphones, Star, Sun, Moon, Wifi, Volume2, VolumeX
} from 'lucide-react'

// ============== SVG ILLUSTRATIONS ==============
const StreamingSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TV Frame */}
    <motion.rect x="50" y="30" width="300" height="180" rx="10" stroke="#E50914" strokeWidth="3" fill="none"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
    {/* Screen */}
    <motion.rect x="65" y="45" width="270" height="150" rx="5" fill="#E50914" fillOpacity="0.1"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
    {/* Play Button */}
    <motion.path d="M185 100 L185 140 L215 120 Z" fill="#E50914"
      initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 1, duration: 0.5 }} />
    {/* Signal Waves */}
    {[0, 1, 2].map(i => (
      <motion.path key={i} d={`M${320 + i * 15} 80 Q${335 + i * 15} 120 ${320 + i * 15} 160`}
        stroke="#E50914" strokeWidth="2" fill="none" strokeOpacity={0.3 + i * 0.2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }} />
    ))}
    {/* Stand */}
    <motion.path d="M150 210 L200 250 L250 210" stroke="#E50914" strokeWidth="3" fill="none"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2, duration: 0.5 }} />
    {/* Floating Elements */}
    <motion.circle cx="80" cy="250" r="8" fill="#E50914" fillOpacity="0.3"
      animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.rect x="300" y="240" width="15" height="15" rx="3" fill="#E50914" fillOpacity="0.3"
      animate={{ rotate: [0, 180, 360], y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity }} />
  </svg>
)

const GlobalNetworkSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Globe Circle */}
    <motion.circle cx="200" cy="200" r="150" stroke="#E50914" strokeWidth="2" strokeOpacity="0.3"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
    <motion.circle cx="200" cy="200" r="120" stroke="#E50914" strokeWidth="1" strokeOpacity="0.2"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 1 }} />
    <motion.circle cx="200" cy="200" r="90" stroke="#E50914" strokeWidth="1" strokeOpacity="0.1"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, duration: 1 }} />
    {/* Orbit Paths */}
    <motion.ellipse cx="200" cy="200" rx="150" ry="60" stroke="#E50914" strokeWidth="1" strokeOpacity="0.2"
      style={{ transform: 'rotateX(70deg)' }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
    {/* Connection Dots */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <motion.circle key={i} cx={200 + 150 * Math.cos(angle * Math.PI / 180)} cy={200 + 150 * Math.sin(angle * Math.PI / 180)} r="6" fill="#E50914"
        initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
      />
    ))}
    {/* Center Pulse */}
    <motion.circle cx="200" cy="200" r="20" fill="#E50914"
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    {/* Connection Lines */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <motion.line key={i} x1="200" y1="200" x2={200 + 150 * Math.cos(angle * Math.PI / 180)} y2={200 + 150 * Math.sin(angle * Math.PI / 180)}
        stroke="#E50914" strokeWidth="1" strokeOpacity="0.3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }} />
    ))}
  </svg>
)

const WaveformSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(20)].map((_, i) => (
      <motion.rect key={i} x={i * 10} y={30 - Math.random() * 25} width="4" height={Math.random() * 50 + 10} rx="2" fill="#E50914" fillOpacity={0.3 + Math.random() * 0.5}
        animate={{ height: [Math.random() * 30 + 10, Math.random() * 50 + 10, Math.random() * 30 + 10] }}
        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }} />
    ))}
  </svg>
)

const AbstractShapeSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10"
      stroke="#E50914" strokeWidth="2" fill="none" strokeOpacity="0.3"
      animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '100px 100px' }} />
    <motion.path d="M100,30 L130,80 L100,130 L70,80 Z" stroke="#E50914" strokeWidth="2" fill="#E50914" fillOpacity="0.1"
      animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '100px 80px' }} />
  </svg>
)

const CircuitSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circuit Lines */}
    <motion.path d="M0 150 H100 V50 H200 V150 H300" stroke="#E50914" strokeWidth="1" strokeOpacity="0.2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
    <motion.path d="M150 0 V100 H250 V200 H150 V300" stroke="#E50914" strokeWidth="1" strokeOpacity="0.2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
    {/* Nodes */}
    {[[100, 50], [200, 50], [200, 150], [150, 100], [150, 200], [250, 200]].map(([x, y], i) => (
      <motion.circle key={i} cx={x} cy={y} r="4" fill="#E50914"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 + i * 0.1 }} />
    ))}
  </svg>
)

// ============== PARTICLE SYSTEM ==============
const Particles = ({ count = 50 }) => {
  const particles = [...Array(count)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 4
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E50914]"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, bottom: -20 }}
          animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  )
}

// ============== FLOATING ORB ==============
const FloatingOrb = ({ className = '', color = '#E50914', size = 300, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ width: size, height: size, background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 30, 0], y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
)

// ============== CURSOR TRAIL ==============
const CursorTrail = () => {
  const [trail, setTrail] = useState([])
  
  useEffect(() => {
    const handleMove = (e) => {
      setTrail(prev => [...prev.slice(-20), { x: e.clientX, y: e.clientY, id: Date.now() }])
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 bg-[#E50914] rounded-full"
          style={{ left: point.x - 4, top: point.y - 4 }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  )
}

// ============== CONFETTI ==============
const Confetti = ({ active }) => {
  if (!active) return null
  
  const pieces = [...Array(100)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#E50914', '#ff4444', '#ff6b6b', '#ffffff'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-3 h-3"
          style={{ left: `${p.x}%`, top: -20, background: p.color }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: window.innerHeight + 100, rotate: p.rotation + 720, opacity: [1, 1, 0] }}
          transition={{ duration: 3, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  )
}

// ============== DATA ==============
const COUNTRIES = ['🇺🇸 USA', '🇨🇦 Canada', '🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', '🇸🇪 Sweden', '🇳🇴 Norway', '🇫🇮 Finland', '🇮🇪 Ireland', '🇪🇸 Spain', '🇮🇹 Italy', '🇦🇺 Australia', '🇳🇱 Netherlands', '🇧🇪 Belgium', '🇨🇭 Switzerland']

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

// ============== ANIMATED COUNTER ==============
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
  <motion.button
    onClick={toggle}
    className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="absolute top-0.5 w-5 h-5 rounded-full bg-[#E50914] shadow-lg flex items-center justify-center"
      animate={{ left: isDark ? 'calc(100% - 24px)' : '2px' }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {isDark ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-white" />}
    </motion.div>
  </motion.button>
)

// ============== NAVBAR ==============
const Navbar = ({ isDark, toggleTheme }) => {
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
        scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a href="#" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <motion.div className="w-10 h-10 bg-[#E50914] rounded-xl flex items-center justify-center" whileHover={{ rotate: 10 }}>
            <Tv className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'FAQ'].map(item => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 dark:text-gray-300 hover:text-[#E50914] transition-colors text-sm font-medium" whileHover={{ y: -2 }}>
              {item}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-[#E50914]" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
            Free Trial
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="btn-premium rounded-full px-6" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </Button>
          </motion.div>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {['Features', 'Pricing', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="py-2" onClick={() => setMobileOpen(false)}>{item}</a>
              ))}
              <Button className="btn-premium w-full rounded-full" onClick={() => { setMobileOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ============== HERO SECTION ==============
const HeroSection = ({ setConfetti }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, 100])
  const y3 = useTransform(scrollY, [0, 500], [0, 50])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Layers with Parallax */}
      <div className="absolute inset-0 animated-gradient-bg" />
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Parallax Orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb className="-top-20 -left-20" size={600} delay={0} />
        <FloatingOrb className="top-1/3 -right-32" size={500} color="#ff4444" delay={2} />
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb className="-bottom-40 left-1/4" size={400} delay={4} />
      </motion.div>

      {/* Particles */}
      <Particles count={30} />

      {/* SVG Illustrations with Parallax */}
      <motion.div style={{ y: y3 }} className="absolute top-20 right-10 w-48 h-48 opacity-20 pointer-events-none">
        <AbstractShapeSVG className="w-full h-full" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-40 left-10 w-32 h-32 opacity-20 pointer-events-none">
        <CircuitSVG className="w-full h-full" />
      </motion.div>

      {/* Floating Shapes with Parallax */}
      <motion.div style={{ y: y3 }} className="absolute top-32 left-20 opacity-30 pointer-events-none">
        <motion.div className="w-20 h-20 border-2 border-[#E50914] rounded-2xl" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-40 right-32 opacity-20 pointer-events-none">
        <motion.div className="w-16 h-16 bg-[#E50914]/20 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      </motion.div>
      <motion.div style={{ y }} className="absolute bottom-32 right-20 opacity-20 pointer-events-none">
        <motion.div className="w-24 h-24 border-2 border-[#E50914]/30 rounded-lg" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
      </motion.div>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity, scale }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with Glow */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <motion.span className="section-label shadow-lg animate-glow-pulse" whileHover={{ scale: 1.05 }}>
              <motion.span className="w-2 h-2 bg-[#E50914] rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Premium IPTV Service
            </motion.span>
          </motion.div>

          {/* Main Heading with Staggered Animation */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            <motion.span className="block" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>Stream everything.</motion.span>
            <motion.span className="block text-gradient" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Pay almost nothing.</motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            22,000+ live channels. 80,000+ movies & series. Crystal clear 4K. Starting at just <span className="text-[#E50914] font-semibold">$8.33/month</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="btn-premium text-lg px-10 py-7 rounded-full font-semibold group" onClick={() => { setConfetti(true); setTimeout(() => setConfetti(false), 3000); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Start Watching
                <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="btn-outline-premium text-lg px-10 py-7 rounded-full font-semibold" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
                <PlayCircle className="w-5 h-5 mr-2" />
                Try Free for 24h
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with Icons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: '22000', label: 'Live Channels', suffix: '+', icon: Tv },
              { value: '80000', label: 'VOD Content', suffix: '+', icon: Film },
              { value: '99', label: 'Uptime', suffix: '%', icon: Wifi },
            ].map((stat, i) => (
              <motion.div key={i} className="text-center" whileHover={{ scale: 1.1, y: -5 }}>
                <motion.div className="w-12 h-12 bg-[#E50914]/10 dark:bg-[#E50914]/20 rounded-2xl flex items-center justify-center mx-auto mb-3" whileHover={{ rotate: 10 }}>
                  <stat.icon className="w-6 h-6 text-[#E50914]" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold"><Counter value={stat.value} suffix={stat.suffix} /></div>
                <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Wave Divider */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" className="fill-gray-50 dark:fill-gray-900" />
      </svg>
    </section>
  )
}

// ============== VIDEO SECTION ==============
const VideoSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [muted, setMuted] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay loop muted={muted} playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-in-a-sofa-at-home-50261-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 video-overlay" />
      </motion.div>

      {/* SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <WaveformSVG className="absolute bottom-10 left-10 w-48" />
        <WaveformSVG className="absolute top-10 right-10 w-48" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-4xl mx-auto text-center text-white">
          {/* Mute Toggle */}
          <motion.button
            onClick={() => setMuted(!muted)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>

          <motion.span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}>
            <Play className="w-4 h-4 text-[#E50914]" fill="#E50914" />
            Experience Premium Streaming
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">Cinema Quality.<br /><span className="text-[#E50914]">Living Room Comfort.</span></h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">4K Ultra HD streaming with Dolby audio. Transform any screen into your personal theater.</p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="btn-premium text-lg px-12 py-7 rounded-full font-semibold animate-glow-pulse" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
              <Play className="w-5 h-5 mr-2" fill="white" />
              Start Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating SVG Decorations */}
      <motion.div className="absolute bottom-20 left-10 w-64 h-64 opacity-30 pointer-events-none" style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}>
        <GlobalNetworkSVG />
      </motion.div>
    </section>
  )
}

// ============== COUNTRIES MARQUEE ==============
const CountriesMarquee = () => (
  <section className="py-8 bg-gray-50 dark:bg-gray-900 relative overflow-hidden border-y border-gray-200 dark:border-gray-800">
    <div className="absolute inset-0 dot-pattern opacity-50" />
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...COUNTRIES, ...COUNTRIES, ...COUNTRIES].map((country, i) => (
          <span key={i} className="mx-8 text-gray-500 dark:text-gray-400 font-medium text-lg">{country}</span>
        ))}
      </div>
    </div>
  </section>
)

// ============== FEATURES SECTION ==============
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <FloatingOrb className="top-0 right-0" size={600} delay={0} />
      <FloatingOrb className="bottom-0 left-0" size={500} color="#ff4444" delay={3} />
      <Particles count={20} />

      {/* Parallax SVG */}
      <motion.div style={{ y }} className="absolute top-20 right-20 w-96 h-96 opacity-10 pointer-events-none">
        <StreamingSVG />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <motion.span className="section-label mb-6 inline-flex" whileHover={{ scale: 1.05 }}>
            <Sparkles className="w-4 h-4" /> Features
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">Everything you need.</h2>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-300 dark:text-gray-700">Nothing you don't.</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="md:col-span-2 bento-card rounded-3xl p-8 md:p-12 spotlight relative overflow-hidden group">
            <motion.div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E50914]/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <motion.div className="w-16 h-16 bg-[#E50914]/10 rounded-2xl flex items-center justify-center" whileHover={{ rotate: 10, scale: 1.1 }}>
                  <Tv className="w-8 h-8 text-[#E50914]" />
                </motion.div>
                <span className="text-6xl md:text-8xl font-bold text-gray-100 dark:text-gray-800 group-hover:text-[#E50914]/10 transition-colors">22K+</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Live TV Channels</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg">Premium channels from every corner of the globe. Sports, news, entertainment, kids content, and more.</p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {[
            { icon: Zap, title: '4K Ultra HD', desc: 'Crystal clear picture quality on every stream.', delay: 0.2 },
            { icon: Film, title: '80K+ Movies & Series', desc: 'Latest blockbusters, classics, and binge-worthy series.', delay: 0.3 },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }} className="bento-card rounded-3xl p-8 spotlight group">
              <motion.div className="w-12 h-12 bg-[#E50914]/10 rounded-xl flex items-center justify-center mb-6" whileHover={{ rotate: 10, scale: 1.1 }}>
                <item.icon className="w-6 h-6 text-[#E50914]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}

          {/* Devices Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="md:col-span-2 bento-card rounded-3xl p-8 spotlight">
            <div className="flex flex-wrap gap-3 mb-6">
              {['Fire Stick', 'Android TV', 'Smart TV', 'iOS', 'Android', 'PC/Mac'].map((device, i) => (
                <motion.span key={i} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-[#E50914] hover:text-white transition-all cursor-default" whileHover={{ scale: 1.1, y: -2 }}>
                  {device}
                </motion.span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">Works Everywhere</h3>
            <p className="text-gray-500 dark:text-gray-400">Stream on any device, anywhere in the world. Instant setup, no technical skills required.</p>
          </motion.div>

          {/* Bottom Row */}
          {[
            { icon: Shield, title: 'VPN Compatible', desc: 'Full support for secure, private streaming.', delay: 0.5 },
            { icon: Headphones, title: '24/7 Support', desc: 'Expert help whenever you need it.', delay: 0.6 },
            { icon: Clock, title: 'Instant Activation', desc: 'Start watching within minutes of signup.', delay: 0.7 },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }} className="bento-card rounded-3xl p-8 spotlight group">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                <item.icon className="w-10 h-10 text-[#E50914] mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
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
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-gray-50 dark:via-gray-900 to-white dark:to-black" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <FloatingOrb className="top-10 left-10" size={300} delay={0} />
      <FloatingOrb className="bottom-10 right-10" size={350} color="#ff6b6b" delay={2} />
      <Particles count={15} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center">
          <motion.h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12" animate={hovered === 'yes' ? { scale: 1.02 } : { scale: 1 }}>
            Ready to <span className="text-gradient">stream</span>?
          </motion.h2>

          <div className="flex items-center justify-center gap-6">
            <motion.button
              onHoverStart={() => setHovered('yes')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#E50914] text-white text-xl font-semibold rounded-full shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-shadow"
              onClick={() => { setConfetti(true); setTimeout(() => setConfetti(false), 3000); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Yes
            </motion.button>
            <motion.button
              onHoverStart={() => setHovered('no')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.1 }}
              className="px-12 py-5 bg-transparent text-gray-500 text-xl font-semibold rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#E50914] hover:text-[#E50914] transition-all"
              onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
            >
              No
            </motion.button>
          </div>

          <AnimatePresence>
            {hovered === 'no' && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 text-gray-400">
                No worries, try our free 24h trial first →
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ============== PRICING SECTION ==============
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="pricing" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <FloatingOrb className="top-20 right-0" size={500} delay={0} />
      <FloatingOrb className="bottom-20 left-0" size={400} color="#ff4444" delay={2} />
      <Particles count={15} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <motion.span className="section-label mb-6 inline-flex" whileHover={{ scale: 1.05 }}>
            <Crown className="w-4 h-4" /> Gold Server
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">Simple pricing.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-4">All plans include everything. No hidden fees.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`pricing-card ${plan.featured ? 'featured' : ''} spotlight`}
            >
              {plan.featured && (
                <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2" animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <span className="bg-[#E50914] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">POPULAR</span>
                </motion.div>
              )}
              {plan.bestValue && (
                <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2" animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <span className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">BEST VALUE</span>
                </motion.div>
              )}

              <div className="mb-6">
                <p className={`text-sm font-medium mb-2 ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>{plan.duration}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : ''}`}>${plan.price}</span>
                </div>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-gray-400' : 'text-gray-400'}`}>
                  <span className="line-through">${plan.original}</span> • <span className="text-[#E50914] font-semibold">${plan.monthly}/mo</span>
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {['22K+ Channels', '80K+ Movies', '4K Quality', 'VPN Support', '24/7 Help'].map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                    <Check className="w-4 h-4 text-[#E50914]" />{feature}
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className={`w-full rounded-full py-6 font-semibold ${plan.featured ? 'bg-white text-black hover:bg-gray-100' : 'btn-premium'}`} onClick={() => window.open(plan.link, '_blank')}>
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

// ============== FAQ SECTION ==============
const FAQSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="faq" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <FloatingOrb className="top-0 left-1/4" size={400} delay={1} />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="section-label mb-6 inline-flex">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6">Questions?</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-6 hover:border-[#E50914]/50 hover:shadow-lg transition-all duration-300">
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

// ============== CONTACT SECTION ==============
const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <FloatingOrb className="bottom-0 right-0" size={400} delay={0} />
      <Particles count={10} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-2xl mx-auto text-center">
          <span className="section-label mb-6 inline-flex"><MessageCircle className="w-4 h-4" /> Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-12">We're here to help.</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: 'https://wa.me/14509127880', icon: MessageCircle, color: 'green', label: 'WhatsApp', info: '+1 (450) 912-7880' },
              { href: 'https://t.me/iptvusca', icon: Send, color: 'blue', label: 'Telegram', info: '@iptvusca' }
            ].map((item, i) => (
              <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.98 }} className="bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl spotlight">
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
  <footer className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
    <div className="absolute inset-0 dot-pattern opacity-30" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.a href="#" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center"><Tv className="w-4 h-4 text-white" /></div>
          <span className="font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </motion.a>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IPTVUSCA. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <motion.a href="https://wa.me/14509127880" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors" whileHover={{ scale: 1.2, rotate: 10 }}><MessageCircle className="w-5 h-5" /></motion.a>
          <motion.a href="https://t.me/iptvusca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" whileHover={{ scale: 1.2, rotate: -10 }}><Send className="w-5 h-5" /></motion.a>
        </div>
      </div>
    </div>
  </footer>
)

// ============== MAIN APP ==============
export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(saved === 'dark' || (!saved && prefersDark))
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

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="noise-overlay" />
      <CursorTrail />
      <Confetti active={confetti} />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection setConfetti={setConfetti} />
      <CountriesMarquee />
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
