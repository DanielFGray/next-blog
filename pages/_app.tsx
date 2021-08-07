import type { AppProps } from 'next/app'
import React from 'react'
import "styles/main.css"

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Component {...pageProps} />
  )
}
