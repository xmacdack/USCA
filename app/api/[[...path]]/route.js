import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'iptvusca')
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Default settings
const DEFAULT_SETTINGS = {
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
  accentColor: '#E50914'
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'IPTVUSCA API', version: '2.0' }))
    }

    // Get site settings
    if (route === '/settings' && method === 'GET') {
      let settings = await db.collection('settings').findOne({ id: 'site_settings' })
      
      if (!settings) {
        settings = { ...DEFAULT_SETTINGS, createdAt: new Date(), updatedAt: new Date() }
        await db.collection('settings').insertOne(settings)
      }
      
      // Merge with defaults for any missing fields
      const mergedSettings = { ...DEFAULT_SETTINGS, ...settings }
      const { _id, ...cleanSettings } = mergedSettings
      return handleCORS(NextResponse.json(cleanSettings))
    }

    // Update site settings (Admin)
    if (route === '/settings' && method === 'PUT') {
      const body = await request.json()
      
      const updateData = {
        ...body,
        id: 'site_settings',
        updatedAt: new Date()
      }
      
      await db.collection('settings').updateOne(
        { id: 'site_settings' },
        { $set: updateData },
        { upsert: true }
      )
      
      return handleCORS(NextResponse.json({ success: true, settings: updateData }))
    }

    // Admin login
    if (route === '/admin/login' && method === 'POST') {
      const body = await request.json()
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin2026'
      
      if (body.password === adminPassword) {
        return handleCORS(NextResponse.json({ success: true, token: 'admin_' + Date.now() }))
      }
      return handleCORS(NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 }))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
