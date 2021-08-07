import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useLocalStorage } from 'lib/useLocalStorage'
import { Nav } from './Nav'
import DarkToggle from './DarkToggle'

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'dfg.rocks'

interface LayoutProps {
  title?: string
  children: ReactNode
}

const NavLinks = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
]

const Layout: NextPage<LayoutProps> = ({ title, children }) => {
  const [darkMode, changeDarkMode] = useLocalStorage<boolean>('darkMode', false)
  useEffect(() => {
    console.log({ darkMode })
  }, [darkMode])

  return (
    <>
      <div
        className={`
        ${darkMode ? 'dark' : ''}
        min-h-screen
        bg-gray-800
        bg-gradient-to-br
        from-coolGray-800
        to-green-600
        pb-1
        `}
      >
        <Head>
          <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Nav links={NavLinks} />
        <article className="h-full">{children}</article>
      </div>
      <DarkToggle darkMode={darkMode} changeDarkMode={changeDarkMode} />
    </>
  )
}

export default Layout
