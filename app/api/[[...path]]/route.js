import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
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
      
      // Default settings if not found
      if (!settings) {
        settings = {
          id: 'site_settings',
          showUpdateBanner: true,
          bannerText: '🎉 NEW 2026 Updates: 4K HDR, Dolby Atmos & 50+ New Channels!',
          bannerLink: '#pricing',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        await db.collection('settings').insertOne(settings)
      }
      
      const { _id, ...cleanSettings } = settings
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

    // Admin login (simple password check)
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
