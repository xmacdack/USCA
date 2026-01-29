'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Play, Tv, Film, Clapperboard, Globe, Zap, Shield, Clock, 
  ChevronDown, Check, MessageCircle, Send, Menu, X,
  Smartphone, Monitor, Crown, ArrowRight, Sparkles,
  PlayCircle, Headphones, Star, ArrowUpRight
} from 'lucide-react'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#E50914] rounded-xl flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-gray-600 hover:text-black" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
            Free Trial
          </Button>
          <Button className="bg-[#E50914] hover:bg-[#c7080f] text-white rounded-full px-6" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t">
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

// Hero Section - Inspired by Good Habit & Assemble
const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white pt-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <span className="section-label">
              <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
              Premium IPTV Service
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            <span className="block">Stream everything.</span>
            <span className="block text-[#E50914]">Pay almost nothing.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-light">
            22,000+ live channels. 80,000+ movies & series. Crystal clear 4K. Starting at just $8.33/month.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="bg-[#E50914] hover:bg-[#c7080f] text-white text-lg px-10 py-7 rounded-full font-semibold group" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Watching
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-10 py-7 rounded-full font-semibold" onClick={() => window.open('https://iptvusca.sell.app/product/24-hours-trial?info=reviews', '_blank')}>
              Try Free for 24h
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: '22000', label: 'Live Channels', suffix: '+' },
              { value: '80000', label: 'VOD Content', suffix: '+' },
              { value: '99', label: 'Uptime', suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-black">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Countries Marquee
const CountriesMarquee = () => (
  <section className="py-8 border-y border-gray-100 bg-gray-50/50">
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...COUNTRIES, ...COUNTRIES, ...COUNTRIES].map((country, i) => (
          <span key={i} className="mx-8 text-gray-500 font-medium">{country}</span>
        ))}
      </div>
    </div>
  </section>
)

// Bento Features Grid - Inspired by Assemble
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="section-label mb-6 inline-flex">Features</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">Everything you need.</h2>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-300">Nothing you don't.</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="md:col-span-2 bento-card rounded-3xl p-8 md:p-12 hover-lift">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-[#E50914]/10 rounded-2xl flex items-center justify-center">
                <Tv className="w-8 h-8 text-[#E50914]" />
              </div>
              <span className="text-6xl md:text-8xl font-bold text-gray-100">22K+</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Live TV Channels</h3>
            <p className="text-gray-500 text-lg">Premium channels from every corner of the globe. Sports, news, entertainment, kids content, and more. Never miss a moment.</p>
          </motion.div>

          {/* Small Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="bento-card rounded-3xl p-8 hover-lift">
            <div className="w-12 h-12 bg-[#E50914]/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-[#E50914]" />
            </div>
            <h3 className="text-xl font-bold mb-2">4K Ultra HD</h3>
            <p className="text-gray-500">Crystal clear picture quality on every stream.</p>
          </motion.div>

          {/* Small Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="bento-card rounded-3xl p-8 hover-lift">
            <div className="w-12 h-12 bg-[#E50914]/10 rounded-xl flex items-center justify-center mb-6">
              <Film className="w-6 h-6 text-[#E50914]" />
            </div>
            <h3 className="text-xl font-bold mb-2">80K+ Movies & Series</h3>
            <p className="text-gray-500">Latest blockbusters, classics, and binge-worthy series.</p>
          </motion.div>

          {/* Medium Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="md:col-span-2 bento-card rounded-3xl p-8 hover-lift">
            <div className="flex flex-wrap gap-4 mb-6">
              {['Fire Stick', 'Android TV', 'Smart TV', 'iOS', 'Android', 'PC/Mac'].map((device, i) => (
                <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200">{device}</span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">Works Everywhere</h3>
            <p className="text-gray-500">Stream on any device, anywhere in the world. Instant setup, no technical skills required.</p>
          </motion.div>

          {/* Feature Cards Row */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="bento-card rounded-3xl p-8 hover-lift">
            <Shield className="w-10 h-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-2">VPN Compatible</h3>
            <p className="text-gray-500">Full support for secure, private streaming.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="bento-card rounded-3xl p-8 hover-lift">
            <Headphones className="w-10 h-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-500">Expert help whenever you need it.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }} className="bento-card rounded-3xl p-8 hover-lift">
            <Clock className="w-10 h-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Activation</h3>
            <p className="text-gray-500">Start watching within minutes of signup.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Interactive CTA Section - Inspired by Assemble
const InteractiveCTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(null)

  return (
    <section ref={ref} className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">Ready to stream?</h2>
          
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onHoverStart={() => setHovered('yes')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-btn cta-btn-yes text-xl"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Yes
            </motion.button>
            <motion.button
              onHoverStart={() => setHovered('no')}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              className="cta-btn cta-btn-no text-xl"
            >
              No
            </motion.button>
          </div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: hovered === 'no' ? 1 : 0 }}
            className="mt-8 text-gray-400"
          >
            No worries, try our free 24h trial first →
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section - Modern Clean Design
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="pricing" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="section-label mb-6 inline-flex">
            <Crown className="w-4 h-4" />
            Gold Server
          </span>
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
              className={`pricing-modern ${plan.featured ? 'featured' : ''} relative`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#E50914] text-white text-xs font-bold px-4 py-1.5 rounded-full">POPULAR</span>
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full">BEST VALUE</span>
                </div>
              )}
              
              <div className="mb-6">
                <p className={`text-sm font-medium mb-2 ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>{plan.duration}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-black'}`}>${plan.price}</span>
                </div>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-gray-400' : 'text-gray-400'}`}>
                  <span className="line-through">${plan.original}</span>
                  <span className="mx-1">•</span>
                  <span className="text-[#E50914]">${plan.monthly}/mo</span>
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {['22K+ Channels', '80K+ Movies', '4K Quality', 'VPN Support', '24/7 Help'].map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Check className={`w-4 h-4 ${plan.featured ? 'text-[#E50914]' : 'text-[#E50914]'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

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
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section - Clean Minimal
const FAQSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="faq" ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="section-label mb-6 inline-flex">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6">Questions?</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border-0 px-6 faq-item">
                <AccordionTrigger className="text-black hover:no-underline text-left py-5 font-semibold text-lg">
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
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-2xl mx-auto text-center">
          <span className="section-label mb-6 inline-flex">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-12">We're here to help.</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.a
              href="https://wa.me/14509127880"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-8 flex flex-col items-center gap-3 transition-colors"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <span className="font-semibold text-lg">WhatsApp</span>
              <span className="text-gray-500 text-sm">+1 (450) 912-7880</span>
            </motion.a>

            <motion.a
              href="https://t.me/iptvusca"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-8 flex flex-col items-center gap-3 transition-colors"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Send className="w-7 h-7 text-blue-600" />
              </div>
              <span className="font-semibold text-lg">Telegram</span>
              <span className="text-gray-500 text-sm">@iptvusca</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="py-8 bg-gray-50 border-t border-gray-100">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
            <Tv className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">IPTV<span className="text-[#E50914]">USCA</span></span>
        </div>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IPTVUSCA. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/14509127880" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="https://t.me/iptvusca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
            <Send className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

// Main App
export default function App() {
  return (
    <main className="min-h-screen bg-white">
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
