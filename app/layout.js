import './globals.css'

export const metadata = {
  title: 'IPTVUSCA - Premium IPTV Streaming',
  description: 'Stream 22,000+ channels and 80,000+ movies in stunning 4K quality. The future of television is here.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
