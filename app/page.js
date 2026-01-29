'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Star, Check, MessageCircle, Send, Menu, X,
  Smartphone, Monitor, Tablet, Crown, Sparkles, Users, ArrowRight,
  PlayCircle, Wifi, Award, Headphones
} from 'lucide-react'

// Hero Images
const HERO_BG = 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80'
const STREAMING_BG = 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1920&q=80'

const DEVICES = [
  { name: 'Fire Stick', icon: Tv },
  { name: 'Android TV', icon: Monitor },
  { name: 'Smart TV', icon: Tv },
  { name: 'iPhone/iPad', icon: Smartphone },
  { name: 'Android', icon: Smartphone },
  { name: 'PC/Mac', icon: Monitor },
]

const COUNTRIES = [
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Australia', flag: '🇦🇺' },
]

const PRICING = [
  {
    duration: '1 Month',
    price: '14.99',
    original: '30',
    perMonth: '14.99',
    popular: false,
    link: 'https://iptvusca.sell.app/product/1-month-trial-nero-gold?quantity=1&info=faq'
  },
  {
    duration: '3 Months',
    price: '39.99',
    original: '60',
    perMonth: '13.33',
    popular: false,
    link: 'https://iptvusca.sell.app/product/3-months-claudius-Gold?store=iptvusca&quantity=1&info=faq'
  },
  {
    duration: '6 Months',
    price: '69.99',
    original: '90',
    perMonth: '11.67',
    popular: true,
    link: 'https://iptvusca.sell.app/product/6-months-julius-caesar-gold?store=iptvusca&quantity=1&info=faq'
  },
  {
    duration: '1 Year',
    price: '99.99',
    original: '140',
    perMonth: '8.33',
    popular: false,
    bestValue: true,
    link: 'https://iptvusca.sell.app/product/12-months-augustus-gold?store=iptvusca&quantity=1&info=faq'
  }
]

const FAQS = [
  {
    question: 'Can I use two devices at the same time?',
    answer: 'Each subscription supports one device at a time. Multiple connections can cause IP blocking. However, you can request additional connections for an extra fee.'
  },
  {
    question: 'What devices do you support?',
    answer: 'We support all major devices including Fire Stick, Android TV, Smart TV (Samsung, LG), iOS devices, Android phones/tablets, PC, Mac, and streaming boxes.'
  },
  {
    question: 'Can I get a refund?',
    answer: "We offer a FREE 24-hour trial for all new customers. If you're not satisfied within 7 days of purchase, we can process a refund with proof of the issue."
  },
  {
    question: 'How fast is the activation?',
    answer: 'Your account is activated automatically and immediately after payment confirmation. Our team works 24/7 to ensure fast activation.'
  },
  {
    question: 'Do you update the content regularly?',
    answer: 'Yes! Our team updates the library regularly with new movies, series, and channels. All updates are automatic and free during your subscription.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept PayPal, cryptocurrency (Bitcoin), and credit cards. All payments are secure and encrypted.'
  }
]

// Animated Counter
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const numValue = parseInt(value.replace(/[^0-9]/g, ''))
      const duration = 2000
      const steps = 60
      const increment = numValue / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= numValue) {
          setCount(numValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Navbar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E50914] rounded flex items-center justify-center">
            <Tv className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">IPTV<span className="text-[#E50914]">USCA</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'FAQ', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium animated-underline"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="text-white hover:text-[#E50914] hover:bg-transparent"
            onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
          >
            Free Trial
          </Button>
          <Button 
            className="bg-[#E50914] hover:bg-[#F40612] text-white font-semibold px-6"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {['Features', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white py-2 text-lg"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button 
                className="bg-[#E50914] hover:bg-[#F40612] text-white w-full mt-4"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
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
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${HERO_BG})`,
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      {/* Red Accent Lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E50914] via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-transparent to-[#E50914]" />

      <motion.div 
        className="container mx-auto px-4 relative z-10 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#E50914]/20 border border-[#E50914]/50 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
          <span className="text-sm text-white font-medium">PREMIUM IPTV SERVICE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none tracking-tight"
        >
          <span className="text-white">UNLIMITED</span>
          <br />
          <span className="text-[#E50914]">ENTERTAINMENT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Stream 22,000+ live channels and 80,000+ movies & series in stunning 4K quality.
          Watch anytime, anywhere, on any device.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button 
            size="lg"
            className="bg-[#E50914] hover:bg-[#F40612] text-white text-lg px-10 py-7 rounded font-bold group"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            START WATCHING
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white text-lg px-10 py-7 rounded font-bold"
            onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
          >
            FREE 24H TRIAL
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '22000', label: 'Live Channels', suffix: '+' },
            { value: '80000', label: 'Movies & Series', suffix: '+' },
            { value: '99', label: 'Uptime', suffix: '%' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-500"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Devices Marquee Section
const DevicesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-16 bg-black border-y border-white/5">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Watch on <span className="text-[#E50914]">Any Device</span>
          </h2>
          <p className="text-gray-500">Stream your favorite content anywhere, anytime</p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="flex animate-marquee">
          {[...DEVICES, ...DEVICES, ...DEVICES, ...DEVICES].map((device, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 bg-[#1a1a1a] rounded-xl p-6 w-40 text-center border border-white/5 hover:border-[#E50914]/30 transition-colors"
            >
              <device.icon className="w-10 h-10 mx-auto mb-3 text-[#E50914]" />
              <p className="text-white text-sm font-medium">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Tv,
      title: 'Live TV Channels',
      description: '22,000+ premium channels from every corner of the globe. Sports, news, entertainment, and more.',
    },
    {
      icon: Film,
      title: 'Movies On Demand',
      description: 'Latest blockbusters, classics, and hidden gems. New releases added daily.',
    },
    {
      icon: Clapperboard,
      title: 'TV Series',
      description: 'Binge-worthy series from day one. Never miss an episode of your favorites.',
    },
    {
      icon: Zap,
      title: '4K Ultra HD',
      description: 'Crystal clear picture quality. Experience entertainment like never before.',
    },
    {
      icon: Shield,
      title: 'VPN Compatible',
      description: 'Full VPN support for secure, private streaming anywhere in the world.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert help whenever you need it. Our team is always here for you.',
    },
  ]

  return (
    <section id="features" ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            WHY CHOOSE <span className="text-[#E50914]">US</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need for the ultimate streaming experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="feature-card rounded-xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#E50914]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#E50914]/20 transition-colors">
                <feature.icon className="w-7 h-7 text-[#E50914]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${STREAMING_BG})`,
            filter: 'brightness(0.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            TRY IT <span className="text-[#E50914]">FREE</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Get a FREE 24-hour trial. No credit card required. 
            Perfect for PPV events and game nights!
          </p>
          <Button
            size="lg"
            className="bg-[#E50914] hover:bg-[#F40612] text-white text-lg px-12 py-7 rounded font-bold animate-pulse-red"
            onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
          >
            <Play className="w-5 h-5 mr-2" />
            START FREE TRIAL
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Countries Section
const CountriesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            POPULAR <span className="text-[#E50914]">WORLDWIDE</span>
          </h2>
          <p className="text-gray-500">Trusted by viewers across the globe</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {COUNTRIES.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-5 py-3 flex items-center gap-3 cursor-pointer hover:border-[#E50914]/50 transition-colors"
            >
              <span className="text-2xl">{country.flag}</span>
              <span className="text-white font-medium text-sm">{country.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const benefits = [
    '22,000+ Live Channels',
    '80,000+ Movies & Series',
    '4K Ultra HD Quality',
    'VPN Compatible',
    '24/7 Support',
    'Instant Activation',
    'All Devices Supported',
    'Free Updates'
  ]

  return (
    <section id="pricing" ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-[#E50914]" />
            <span className="text-sm text-[#E50914] font-bold">GOLD SERVER</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            CHOOSE YOUR <span className="text-[#E50914]">PLAN</span>
          </h2>
          <p className="text-gray-500 text-lg">All prices in USD • Cancel anytime</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`pricing-card ${plan.popular ? 'popular' : ''} rounded-xl p-6 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#E50914] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-black text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6 pt-2">
                <h3 className="text-lg font-bold text-white mb-4">{plan.duration}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                </div>
                <div className="text-gray-500 text-sm">
                  <span className="line-through">${plan.original}</span>
                  <span className="mx-2">•</span>
                  <span className="text-[#E50914]">${plan.perMonth}/mo</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {benefits.slice(0, 6).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Check className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 rounded font-bold text-sm ${
                  plan.popular
                    ? 'bg-[#E50914] hover:bg-[#F40612] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                onClick={() => window.open(plan.link, '_blank')}
              >
                GET STARTED
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { icon: Users, value: '50000', suffix: '+', label: 'Active Subscribers' },
    { icon: Globe, value: '190', suffix: '+', label: 'Countries Covered' },
    { icon: Award, value: '99', suffix: '%', label: 'Uptime Guaranteed' }
  ]

  return (
    <section ref={ref} className="py-16 bg-black border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-[#E50914]" />
              <div className="text-4xl font-black text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
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
    <section id="faq" ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            FREQUENTLY <span className="text-[#E50914]">ASKED</span>
          </h2>
          <p className="text-gray-500 text-lg">Got questions? We've got answers.</p>
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
                className="bg-[#141414] border border-white/5 rounded-lg px-6 overflow-hidden data-[state=open]:border-[#E50914]/30"
              >
                <AccordionTrigger className="text-white hover:text-[#E50914] hover:no-underline text-left py-5 font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5">
                  {faq.answer}
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
    <section id="contact" ref={ref} className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            GET IN <span className="text-[#E50914]">TOUCH</span>
          </h2>
          <p className="text-gray-500 text-lg mb-12">We're available 24/7 to help you</p>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.a
              href="https://wa.me/14509127880"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#141414] border border-white/10 rounded-xl p-8 flex flex-col items-center gap-4 hover:border-green-500/50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">WhatsApp</h3>
              <p className="text-gray-500">+1 (450) 912-7880</p>
            </motion.a>

            <motion.a
              href="https://t.me/iptvusca"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#141414] border border-white/10 rounded-xl p-8 flex flex-col items-center gap-4 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Send className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Telegram</h3>
              <p className="text-gray-500">@iptvusca</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E50914] rounded flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">IPTV<span className="text-[#E50914]">USCA</span></span>
          </div>
          
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} IPTVUSCA. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/14509127880" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="https://t.me/iptvusca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <DevicesSection />
      <FeaturesSection />
      <CTASection />
      <CountriesSection />
      <PricingSection />
      <StatsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
