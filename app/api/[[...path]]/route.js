import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

const DEFAULT_SETTINGS = {
  id: 'site_settings',
  showUpdateBanner: true,
  bannerText: 'NEW 2026 Updates: 4K HDR, Dolby Atmos & 50+ New Channels!',
  bannerLink: '#pricing',
  heroTitle1: 'Stream everything.',
  heroTitle2: 'Pay almost nothing.',
  heroSubtitle: '22,000+ live channels. 80,000+ movies & series. Crystal clear 4K.',
  statChannels: '22000',
  statMovies: '80000',
  statUptime: '99',
  pricing: [
    { duration: '1 Month', price: '14.99', original: '30', monthly: '14.99', link: 'https://iptvusca.sell.app/product/1-month-trial-nero-gold?quantity=1&info=faq' },
    { duration: '3 Months', price: '39.99', original: '60', monthly: '13.33', link: 'https://iptvusca.sell.app/product/3-months-claudius-Gold?store=iptvusca&quantity=1&info=faq' },
    { duration: '6 Months', price: '69.99', original: '90', monthly: '11.67', featured: true, link: 'https://iptvusca.sell.app/product/6-months-julius-caesar-gold?store=iptvusca&quantity=1&info=faq' },
    { duration: '1 Year', price: '99.99', original: '140', monthly: '8.33', bestValue: true, link: 'https://iptvusca.sell.app/product/12-months-augustus-gold?store=iptvusca&quantity=1&info=faq' }
  ],
  whatsappNumber: '+14509127880',
  telegramHandle: '@iptvusca',
  faqs: [
    { q: 'Can I use multiple devices?', a: 'Each subscription supports one device at a time. Additional connections available for extra fee.' },
    { q: 'What devices are supported?', a: 'Fire Stick, Android TV, Smart TV (Samsung, LG), iOS, Android, PC, Mac, and all streaming boxes.' },
    { q: 'Is there a refund policy?', a: 'Free 24-hour trial for all customers. Full refund within 7 days if not satisfied.' },
    { q: 'How fast is activation?', a: 'Instant activation after payment. Our team works 24/7.' },
    { q: 'Do you update content?', a: 'Yes! Regular updates with new movies, series, and channels. All updates are free.' },
    { q: 'What payment methods?', a: 'PayPal, cryptocurrency (Bitcoin), and all major credit cards.' }
  ],
  showPopup: false,
  popupTitle: 'Special Offer!',
  popupText: 'Get 50% off your first month!',
  popupButtonText: 'Claim Now',
  popupButtonLink: '#pricing',
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon!',
  defaultTheme: 'light',
  accentColor: '#E50914'
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'IPTVUSCA API', version: '2.0' }))
    }

    if (route === '/settings' && method === 'GET') {
      const { data, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 'site_settings')
        .maybeSingle()

      if (error || !data) {
        return handleCORS(NextResponse.json(DEFAULT_SETTINGS))
      }

      const mergedSettings = { ...DEFAULT_SETTINGS, ...data.data }
      return handleCORS(NextResponse.json(mergedSettings))
    }

    if (route === '/settings' && (method === 'PUT' || method === 'POST')) {
      const body = await request.json()

      const { error } = await supabase
        .from('settings')
        .upsert({
          id: 'site_settings',
          data: { ...body, id: 'site_settings' },
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (error) {
        return handleCORS(NextResponse.json({ success: false, error: error.message }, { status: 500 }))
      }

      return handleCORS(NextResponse.json({ success: true, settings: body }))
    }

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
