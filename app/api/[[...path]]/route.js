import { NextResponse } from 'next/server'
import { getSettings, updateSettings } from '@/lib/data'

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
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    // Root endpoint
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'IPTVUSCA API', version: '2.0' }))
    }

    // Get site settings
    if (route === '/settings' && method === 'GET') {
      const settings = getSettings()
      return handleCORS(NextResponse.json(settings))
    }

    // Update site settings (Admin) - PUT method
    if (route === '/settings' && method === 'PUT') {
      const body = await request.json()
      const updatedSettings = updateSettings(body)
      return handleCORS(NextResponse.json({ success: true, settings: updatedSettings }))
    }

    // Update site settings (Admin) - POST method (alternative)
    if (route === '/settings' && method === 'POST') {
      const body = await request.json()
      const updatedSettings = updateSettings(body)
      return handleCORS(NextResponse.json({ success: true, settings: updatedSettings }))
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
