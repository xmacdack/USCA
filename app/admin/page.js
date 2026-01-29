'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tv, Save, Eye, EyeOff, LogIn, Settings, ArrowLeft } from 'lucide-react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState({
    showUpdateBanner: true,
    bannerText: '🎉 NEW 2026 Updates: 4K HDR, Dolby Atmos & 50+ New Channels!',
    bannerLink: '#pricing'
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in
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
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error('Failed to save settings')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E50914] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 mt-2">Enter password to access settings</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#E50914] focus:border-transparent outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-[#E50914] hover:bg-[#c7080f] text-white py-6 rounded-xl font-semibold"
              disabled={loading}
            >
              <LogIn className="w-5 h-5 mr-2" />
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <p className="text-center text-gray-400 text-sm mt-6">
            Default password: admin2026
          </p>
          
          <div className="text-center mt-4">
            <a href="/" className="text-[#E50914] text-sm hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to website
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E50914] rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Settings</h1>
                <p className="text-gray-500 text-sm">Manage website configuration</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-gray-500">
              Logout
            </Button>
          </div>

          {/* Banner Settings */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🚨 Alert Banner Settings
              </h2>
              
              <div className="space-y-4">
                {/* Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Show Update Banner</label>
                    <p className="text-gray-500 text-sm">Display the announcement banner on the website</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, showUpdateBanner: !settings.showUpdateBanner })}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      settings.showUpdateBanner ? 'bg-[#E50914]' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                      settings.showUpdateBanner ? 'left-8' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Banner Text */}
                <div>
                  <label className="block text-sm font-medium mb-2">Banner Text</label>
                  <input
                    type="text"
                    value={settings.bannerText || ''}
                    onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#E50914] focus:border-transparent outline-none transition-all"
                    placeholder="Enter banner message"
                  />
                </div>

                {/* Banner Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">Banner Link</label>
                  <input
                    type="text"
                    value={settings.bannerLink || ''}
                    onChange={(e) => setSettings({ ...settings, bannerLink: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#E50914] focus:border-transparent outline-none transition-all"
                    placeholder="#pricing or https://..."
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            {settings.showUpdateBanner && (
              <div className="p-4 bg-gradient-to-r from-[#E50914] to-[#ff4444] text-white rounded-xl">
                <p className="text-sm font-medium text-center">
                  👁️ Preview: {settings.bannerText}
                </p>
              </div>
            )}

            {/* Save Button */}
            <Button 
              onClick={handleSave}
              className="w-full bg-[#E50914] hover:bg-[#c7080f] text-white py-6 rounded-xl font-semibold"
              disabled={loading}
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </Button>

            {saved && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center text-sm"
              >
                ✓ Settings saved successfully!
              </motion.p>
            )}
          </div>

          <div className="text-center mt-8">
            <a href="/" className="text-[#E50914] text-sm hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to website
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
