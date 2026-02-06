// Default application settings (stored locally)
export const DEFAULT_SETTINGS = {
  id: 'site_settings',
  // Banner
  showUpdateBanner: true,
  bannerText: '🎉 NEW 2026 Updates: 4K HDR, Dolby Atmos & 50+ New Channels!',
  bannerLink: '#pricing',
  // Hero
  heroTitle1: 'Stream everything.',
  heroTitle2: 'Pay almost nothing.',
  heroSubtitle: '22,000+ live channels. 80,000+ movies & series. Crystal clear 4K.',
  // Stats
  statChannels: '22000',
  statMovies: '80000',
  statUptime: '99',
  // Pricing
  pricing: [
    { duration: '1 Month', price: '14.99', original: '30', monthly: '14.99', link: 'https://iptvusca.sell.app/product/1-month-trial-nero-gold?quantity=1&info=faq' },
    { duration: '3 Months', price: '39.99', original: '60', monthly: '13.33', link: 'https://iptvusca.sell.app/product/3-months-claudius-Gold?store=iptvusca&quantity=1&info=faq' },
    { duration: '6 Months', price: '69.99', original: '90', monthly: '11.67', featured: true, link: 'https://iptvusca.sell.app/product/6-months-julius-caesar-gold?store=iptvusca&quantity=1&info=faq' },
    { duration: '1 Year', price: '99.99', original: '140', monthly: '8.33', bestValue: true, link: 'https://iptvusca.sell.app/product/12-months-augustus-gold?store=iptvusca&quantity=1&info=faq' }
  ],
  // Contact
  whatsappNumber: '+14509127880',
  telegramHandle: '@iptvusca',
  // FAQs
  faqs: [
    { q: 'Can I use multiple devices?', a: 'Each subscription supports one device at a time. Additional connections available for extra fee.' },
    { q: 'What devices are supported?', a: 'Fire Stick, Android TV, Smart TV (Samsung, LG), iOS, Android, PC, Mac, and all streaming boxes.' },
    { q: 'Is there a refund policy?', a: 'Free 24-hour trial for all customers. Full refund within 7 days if not satisfied.' },
    { q: 'How fast is activation?', a: 'Instant activation after payment. Our team works 24/7.' },
    { q: 'Do you update content?', a: 'Yes! Regular updates with new movies, series, and channels. All updates are free.' },
    { q: 'What payment methods?', a: 'PayPal, cryptocurrency (Bitcoin), and all major credit cards.' }
  ],
  // Popup
  showPopup: false,
  popupTitle: 'Special Offer!',
  popupText: 'Get 50% off your first month!',
  popupButtonText: 'Claim Now',
  popupButtonLink: '#pricing',
  // Maintenance
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon!',
  // Theme
  defaultTheme: 'light',
  accentColor: '#E50914',
  // Timestamps
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

// In-memory store for settings (will be replaced with actual database later)
let settingsCache = { ...DEFAULT_SETTINGS }

/**
 * Get current settings
 */
export function getSettings() {
  return { ...settingsCache }
}

/**
 * Update settings (replaces entire settings object)
 */
export function updateSettings(newSettings) {
  settingsCache = {
    ...DEFAULT_SETTINGS,
    ...newSettings,
    id: 'site_settings',
    updatedAt: new Date().toISOString()
  }
  return { ...settingsCache }
}

/**
 * Reset settings to defaults
 */
export function resetSettings() {
  settingsCache = { ...DEFAULT_SETTINGS }
  return { ...settingsCache }
}
