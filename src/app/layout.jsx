import './globals.css'

/* ========================================================================
   SITE METADATA (shows in browser tab and search results)
   =========================================================================
   To EDIT: Change the title and description text below.
   ======================================================================== */
export const metadata = {
  metadataBase: new URL('https://akash-trivedi.com'),
  title: 'Akash Trivedi — Product Designer',
  description: 'Product Designer focused on B2B SaaS, IoT platforms, and AI-driven UX.',
  openGraph: { siteName: 'Akash Trivedi', locale: 'en' },
}

export default function RootLayout({ children }) { return <html lang="en"><body>{children}</body></html> }
