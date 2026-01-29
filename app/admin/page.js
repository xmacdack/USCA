'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Tv, Save, LogIn, Settings, ArrowLeft, Bell, DollarSign, 
  MessageCircle, HelpCircle, Palette, AlertTriangle, LayoutDashboard,
  Eye, EyeOff, Plus, Trash2, Edit2, ChevronDown, ChevronRight,
  Type, BarChart3, Globe, Zap
} from 'lucide-react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('banner')
  const [expandedSection, setExpandedSection] = useState('banner')

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken')
    if (token) {
      setIsLoggedIn(true)
      fetchSettings()
    }
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(data)
    } catch (err) {
      console.error('Failed to fetch settings')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
        fetchSettings()
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Login failed')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      const data = await res.json()
      if (data.success) {
        setSaved(true)
        // Re-fetch settings to confirm save
        await fetchSettings()
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert('Failed to save settings')
      }
    } catch (err) {
      console.error('Failed to save settings:', err)
      alert('Error saving settings')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setPassword('')
  }

  const updatePricing = (index, field, value) => {
    const newPricing = [...settings.pricing]
    newPricing[index] = { ...newPricing[index], [field]: value }
    setSettings({ ...settings, pricing: newPricing })
  }

  const updateFaq = (index, field, value) => {
    const newFaqs = [...settings.faqs]
    newFaqs[index] = { ...newFaqs[index], [field]: value }
    setSettings({ ...settings, faqs: newFaqs })
  }

  const addFaq = () => {
    setSettings({ ...settings, faqs: [...settings.faqs, { q: 'New Question?', a: 'Answer here...' }] })
  }

  const removeFaq = (index) => {
    const newFaqs = settings.faqs.filter((_, i) => i !== index)
    setSettings({ ...settings, faqs: newFaqs })
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E50914] to-[#ff4444] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 mt-2">Enter password to access settings</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#E50914] outline-none"
                placeholder="Enter admin password" />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button type="submit" className="w-full bg-[#E50914] hover:bg-[#c7080f] text-white py-6 rounded-xl font-semibold" disabled={loading}>
              <LogIn className="w-5 h-5 mr-2" />{loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">Default password: admin2026</p>
          <div className="text-center mt-4">
            <a href="/" className="text-[#E50914] text-sm hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to website
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!settings) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  const tabs = [
    { id: 'banner', label: 'Alert Banner', icon: Bell },
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'popup', label: 'Popup', icon: Globe },
    { id: 'maintenance', label: 'Maintenance', icon: AlertTriangle },
    { id: 'theme', label: 'Theme', icon: Palette },
  ]

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E50914]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#E50914]" />
          </div>
          <span className="font-semibold">{title}</span>
        </div>
        {expandedSection === id ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-4 space-y-4 bg-white dark:bg-gray-900">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const Toggle = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <button onClick={() => onChange(!checked)} className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-[#E50914]' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  )

  const Input = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">{label}</label>
      <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#E50914] outline-none"
        placeholder={placeholder} />
    </div>
  )

  const TextArea = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">{label}</label>
      <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#E50914] outline-none resize-none"
        placeholder={placeholder} />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E50914] to-[#ff4444] rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">IPTVUSCA Settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E50914] flex items-center gap-1">
              <Eye className="w-4 h-4" /> Preview
            </a>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sticky top-20">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Settings</p>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setExpandedSection(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${expandedSection === tab.id ? 'bg-[#E50914]/10 text-[#E50914]' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Banner Section */}
            <Section id="banner" title="Alert Banner" icon={Bell}>
              <Toggle checked={settings.showUpdateBanner} onChange={(v) => setSettings({...settings, showUpdateBanner: v})} label="Show Banner" />
              <Input label="Banner Text" value={settings.bannerText} onChange={(v) => setSettings({...settings, bannerText: v})} placeholder="Enter banner message" />
              <Input label="Button Link" value={settings.bannerLink} onChange={(v) => setSettings({...settings, bannerLink: v})} placeholder="#pricing" />
              {settings.showUpdateBanner && (
                <div className="p-3 bg-gradient-to-r from-[#E50914] to-[#ff4444] text-white rounded-lg text-sm text-center">
                  Preview: {settings.bannerText}
                </div>
              )}
            </Section>

            {/* Hero Section */}
            <Section id="hero" title="Hero Section" icon={Type}>
              <Input label="Title Line 1" value={settings.heroTitle1} onChange={(v) => setSettings({...settings, heroTitle1: v})} placeholder="Stream everything." />
              <Input label="Title Line 2" value={settings.heroTitle2} onChange={(v) => setSettings({...settings, heroTitle2: v})} placeholder="Pay almost nothing." />
              <TextArea label="Subtitle" value={settings.heroSubtitle} onChange={(v) => setSettings({...settings, heroSubtitle: v})} placeholder="Hero subtitle text" />
            </Section>

            {/* Stats Section */}
            <Section id="stats" title="Statistics" icon={BarChart3}>
              <div className="grid grid-cols-3 gap-3">
                <Input label="Channels" value={settings.statChannels} onChange={(v) => setSettings({...settings, statChannels: v})} placeholder="22000" />
                <Input label="Movies" value={settings.statMovies} onChange={(v) => setSettings({...settings, statMovies: v})} placeholder="80000" />
                <Input label="Uptime %" value={settings.statUptime} onChange={(v) => setSettings({...settings, statUptime: v})} placeholder="99" />
              </div>
            </Section>

            {/* Pricing Section */}
            <Section id="pricing" title="Pricing Plans" icon={DollarSign}>
              {settings.pricing?.map((plan, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{plan.duration}</span>
                    <div className="flex gap-2">
                      {plan.featured && <span className="text-xs bg-[#E50914] text-white px-2 py-0.5 rounded">Popular</span>}
                      {plan.bestValue && <span className="text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded">Best Value</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input label="Price" value={plan.price} onChange={(v) => updatePricing(index, 'price', v)} placeholder="14.99" />
                    <Input label="Original" value={plan.original} onChange={(v) => updatePricing(index, 'original', v)} placeholder="30" />
                    <Input label="Monthly" value={plan.monthly} onChange={(v) => updatePricing(index, 'monthly', v)} placeholder="14.99" />
                  </div>
                  <Input label="Buy Link" value={plan.link} onChange={(v) => updatePricing(index, 'link', v)} placeholder="https://..." />
                </div>
              ))}
            </Section>

            {/* Contact Section */}
            <Section id="contact" title="Contact Info" icon={MessageCircle}>
              <Input label="WhatsApp Number" value={settings.whatsappNumber} onChange={(v) => setSettings({...settings, whatsappNumber: v})} placeholder="+14509127880" />
              <Input label="Telegram Handle" value={settings.telegramHandle} onChange={(v) => setSettings({...settings, telegramHandle: v})} placeholder="@iptvusca" />
            </Section>

            {/* FAQs Section */}
            <Section id="faqs" title="FAQ Manager" icon={HelpCircle}>
              {settings.faqs?.map((faq, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">FAQ #{index + 1}</span>
                    <button onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <Input label="Question" value={faq.q} onChange={(v) => updateFaq(index, 'q', v)} placeholder="Question?" />
                  <TextArea label="Answer" value={faq.a} onChange={(v) => updateFaq(index, 'a', v)} placeholder="Answer..." rows={2} />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addFaq} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
            </Section>

            {/* Popup Section */}
            <Section id="popup" title="Promotional Popup" icon={Globe}>
              <Toggle checked={settings.showPopup} onChange={(v) => setSettings({...settings, showPopup: v})} label="Show Popup" />
              <Input label="Popup Title" value={settings.popupTitle} onChange={(v) => setSettings({...settings, popupTitle: v})} placeholder="Special Offer!" />
              <TextArea label="Popup Text" value={settings.popupText} onChange={(v) => setSettings({...settings, popupText: v})} placeholder="Get 50% off!" rows={2} />
              <Input label="Button Text" value={settings.popupButtonText} onChange={(v) => setSettings({...settings, popupButtonText: v})} placeholder="Claim Now" />
              <Input label="Button Link" value={settings.popupButtonLink} onChange={(v) => setSettings({...settings, popupButtonLink: v})} placeholder="#pricing" />
            </Section>

            {/* Maintenance Section */}
            <Section id="maintenance" title="Maintenance Mode" icon={AlertTriangle}>
              <Toggle checked={settings.maintenanceMode} onChange={(v) => setSettings({...settings, maintenanceMode: v})} label="Enable Maintenance Mode" />
              <TextArea label="Maintenance Message" value={settings.maintenanceMessage} onChange={(v) => setSettings({...settings, maintenanceMessage: v})} placeholder="We are under maintenance..." />
              {settings.maintenanceMode && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 rounded-lg text-sm">
                  ⚠️ Warning: Site will be inaccessible to visitors
                </div>
              )}
            </Section>

            {/* Theme Section */}
            <Section id="theme" title="Theme Settings" icon={Palette}>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Default Theme</label>
                <div className="flex gap-2">
                  {['light', 'dark', 'system'].map(theme => (
                    <button key={theme} onClick={() => setSettings({...settings, defaultTheme: theme})}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${settings.defaultTheme === theme ? 'bg-[#E50914] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Accent Color" value={settings.accentColor} onChange={(v) => setSettings({...settings, accentColor: v})} placeholder="#E50914" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: settings.accentColor }} />
                <span className="text-sm text-gray-500">Preview</span>
              </div>
            </Section>

            {/* Save Button */}
            <motion.div className="sticky bottom-4 mt-6" initial={{ y: 100 }} animate={{ y: 0 }}>
              <Button onClick={handleSave} className="w-full bg-[#E50914] hover:bg-[#c7080f] text-white py-6 rounded-xl font-semibold shadow-lg shadow-red-500/30" disabled={loading}>
                <Save className="w-5 h-5 mr-2" />{loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
