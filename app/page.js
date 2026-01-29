'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Star, Check, MessageCircle, Send, Menu, X,
  Smartphone, Monitor, Tablet, Crown, Sparkles, Users
} from 'lucide-react'

// Constants
const HERO_IMAGE = 'https://images.unsplash.com/photo-1593280359364-5242f1958068?w=1920&q=80'
const LIVING_ROOM_IMAGE = 'https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?w=1200&q=80'
const STREAMING_IMAGE = 'https://images.pexels.com/photos/29942709/pexels-photo-29942709.jpeg?w=1200&q=80'
const CINEMATIC_BG = 'https://images.unsplash.com/photo-1611419010196-a360856fc42f?w=1920&q=80'
const ABSTRACT_BG = 'https://images.unsplash.com/photo-1647505384832-9a8abd5dd56f?w=1920&q=80'

const DEVICES = [
  { name: 'Fire Stick', icon: Tv },
  { name: 'Android TV', icon: Monitor },
  { name: 'Smart TV', icon: Tv },
  { name: 'iOS', icon: Smartphone },
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
]

const PRICING = [
  {
    duration: '1 Month',
    price: '$14.99',
    original: '$30',
    popular: false,
    link: 'https://iptvusca.sell.app/product/1-month-trial-nero-gold?quantity=1&info=faq'
  },
  {
    duration: '3 Months',
    price: '$39.99',
    original: '$60',
    popular: false,
    link: 'https://iptvusca.sell.app/product/3-months-claudius-Gold?store=iptvusca&quantity=1&info=faq'
  },
  {
    duration: '6 Months',
    price: '$69.99',
    original: '$90',
    popular: true,
    link: 'https://iptvusca.sell.app/product/6-months-julius-caesar-gold?store=iptvusca&quantity=1&info=faq'
  },
  {
    duration: '1 Year',
    price: '$99.99',
    original: '$140',
    popular: false,
    link: 'https://iptvusca.sell.app/product/12-months-augustus-gold?store=iptvusca&quantity=1&info=faq'
  }
]

const FEATURES = [
  { icon: Tv, title: '22K+ Channels', description: 'Premium live TV channels from around the world' },
  { icon: Film, title: '80K+ VOD', description: 'Movies, series, and documentaries on demand' },
  { icon: Zap, title: '4K Ultra HD', description: 'Crystal clear streaming quality' },
  { icon: Shield, title: 'VPN Support', description: 'Protected streaming with VPN compatibility' },
  { icon: Clock, title: '24/7 Support', description: 'Round the clock customer assistance' },
  { icon: Globe, title: 'Worldwide', description: 'Coverage across all continents' },
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
    answer: 'We offer a FREE 24-hour trial for all new customers. If you\'re not satisfied within 7 days of purchase, we can process a refund with proof of the issue.'
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

// Animated Counter Component
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

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-dark py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">IPTVUSCA</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white"
            onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
          >
            Free Trial
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0"
            onClick={() => window.open('https://wa.me/14509127880', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
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
            className="md:hidden glass-dark mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white w-full"
                onClick={() => window.open('https://wa.me/14509127880', '_blank')}
              >
                Contact Us
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
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/90 via-[#0a0a12]/70 to-[#0a0a12]" />
      </motion.div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] -top-40 -left-40"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-[100px] -bottom-20 -right-20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern z-0" />

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Premium IPTV Service</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Stream</span>{' '}
            <span className="gradient-text">Premium TV</span>
            <br />
            <span className="text-white">Worldwide</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            22,000+ Live Channels • 80,000+ Movies & Series • 4K Ultra HD Quality
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-lg px-8 py-6 rounded-xl glow-purple"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
              onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
            >
              Try Free for 24h
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: '22000', label: 'Channels', suffix: '+' },
              { value: '80000', label: 'VOD Content', suffix: '+' },
              { value: '99', label: 'Uptime', suffix: '%' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Devices Section with Marquee
const DevicesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Works on <span className="gradient-text">All Devices</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-xl mx-auto"
        >
          Stream your favorite content on any device, anywhere, anytime
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a12] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a12] to-transparent z-10" />
        
        <div className="flex animate-marquee">
          {[...DEVICES, ...DEVICES, ...DEVICES].map((device, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 glass rounded-2xl p-8 w-48 text-center hover:scale-105 transition-transform duration-300"
            >
              <device.icon className="w-12 h-12 mx-auto mb-4 text-violet-400" />
              <p className="text-white font-medium">{device.name}</p>
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
      description: 'Access 22,000+ premium channels from around the world. Never miss your favorite live matches or programs.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Film,
      title: 'Movies On Demand',
      description: 'Watch all new movies in theaters now, recent releases, trending titles, and IMDB Top 500+.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Clapperboard,
      title: 'TV Series',
      description: 'All the latest trending series currently airing. Be first to watch new episodes from your favorites.',
      color: 'from-emerald-500 to-green-600'
    }
  ]

  return (
    <section id="features" ref={ref} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${CINEMATIC_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Premium <span className="gradient-text">Entertainment</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for the ultimate streaming experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-transparent border-0 glass-dark rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-500 h-full">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trial CTA Section
const TrialSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        className="container mx-auto px-4"
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${LIVING_ROOM_IMAGE})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 to-cyan-900/90" />
          
          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Try It Risk Free
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Get a FREE 24-hour trial account. Perfect for PPV events and game nights!
              </p>
              <Button
                size="lg"
                className="bg-white text-violet-900 hover:bg-gray-100 text-lg px-10 py-6 rounded-xl font-semibold"
                onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}
              >
                <Play className="w-5 h-5 mr-2" />
                Request Free Trial
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Countries Section
const CountriesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Popular <span className="gradient-text">Worldwide</span>
          </h2>
          <p className="text-gray-400 text-lg">Trusted by viewers across the globe</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {COUNTRIES.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass rounded-2xl px-6 py-4 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl">{country.flag}</span>
              <span className="text-white font-medium">{country.name}</span>
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
    'Premium Plan+',
    'Fast activation',
    '+22k Channels',
    '+80k VODs',
    'Worldwide Coverage',
    'True 4K Quality',
    'VPN Protection',
    '24/7 Free Support'
  ]

  return (
    <section id="pricing" ref={ref} className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm gradient-text-gold font-semibold">GOLD SERVER</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text-gold">Plan</span>
          </h2>
          <p className="text-gray-400 text-lg">All prices in USD • Cancel anytime</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <Card className={`h-full rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'gradient-border glow-gold' 
                  : 'glass-dark border-gray-800 hover:border-violet-500/50'
              }`}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.duration}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text-gold">{plan.price}</span>
                    <span className="text-gray-500 line-through ml-2">{plan.original}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-6 rounded-xl font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white'
                        : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white'
                    }`}
                    onClick={() => window.open(plan.link, '_blank')}
                  >
                    Get Started
                  </Button>
                  
                  <p className="text-center text-gray-500 text-xs mt-4">
                    TV / Android / iOS / PC
                  </p>
                </CardContent>
              </Card>
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
    { icon: Users, value: '50000', suffix: '+', label: 'Happy Customers' },
    { icon: Clock, value: '2', suffix: 'h', label: 'Avg Delivery Time' },
    { icon: Globe, value: '190', suffix: '+', label: 'Countries Covered' }
  ]

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl p-8 text-center hover:bg-white/5 transition-colors"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-violet-400" />
              <div className="text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Section
const WhyChooseSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src={STREAMING_IMAGE} 
                alt="Streaming" 
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/50 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 glass rounded-2xl p-6 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">99.9% Uptime</p>
                  <p className="text-gray-400 text-sm">Guaranteed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ultimate Playlist <span className="gradient-text">All-in-One</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Live TV + Video On Demand. Everything you need in one subscription.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Global Content',
                  description: 'News, Sport, Documentary, Entertainment, Kids, Movies & Series from USA, UK, Canada, France, Spain, Germany and more.'
                },
                {
                  title: 'Premium Quality',
                  description: 'High Quality (4K UHD, FHD, HD) compatible with Smart TV, Smartphone, Tablet, Computer, and more.'
                },
                {
                  title: 'Custom Playlists',
                  description: 'Customize your playlist for free. Keep only what you need for better performance.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Features Grid
const FeaturesGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              <feature.icon className="w-10 h-10 text-violet-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
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
    <section id="faq" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-dark rounded-2xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-white hover:text-violet-400 hover:no-underline text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">
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
    <section id="contact" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">We're here to help 24/7</p>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.a
              href="https://wa.me/14509127880"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-3xl p-8 flex flex-col items-center gap-4 hover:bg-green-500/10 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">WhatsApp</h3>
              <p className="text-gray-400">+1 (450) 912-7880</p>
            </motion.a>

            <motion.a
              href="https://t.me/iptvusca"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-3xl p-8 flex flex-col items-center gap-4 hover:bg-blue-500/10 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Telegram</h3>
              <p className="text-gray-400">@iptvusca</p>
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
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">IPTVUSCA</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} IPTVUSCA. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/14509127880" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="https://t.me/iptvusca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a12]">
      <Navbar />
      <HeroSection />
      <DevicesSection />
      <FeaturesSection />
      <TrialSection />
      <CountriesSection />
      <PricingSection />
      <StatsSection />
      <WhyChooseSection />
      <FeaturesGrid />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
