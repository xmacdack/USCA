import './globals.css'

export const metadata = {
  title: 'IPTVUSCA - Premium IPTV Streaming Service',
  description: 'Stream high-quality Television Channels with IPTVUSCA. Reliable and affordable IPTV streaming services with 22K+ channels and 80K+ VOD content.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
