import React, { useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Nav from './Nav'
import { useLocalStorage } from 'lib/useLocalStorage'
import DarkToggle from './DarkToggle'
// import { Transition } from '@headlessui/react'

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
    <div
      className={`
        ${darkMode ? 'dark' : ''}
        min-h-screen
        bg-gray-100
        bg-gradient-to-br
        from-coolGray-800
        to-emerald-600
      `}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav links={NavLinks}>
          <DarkToggle darkMode={darkMode} changeDarkMode={changeDarkMode} />
        </Nav>
      </header>
      <main className="h-full">{children}</main>
    </div>
  )
}

export default Layout
