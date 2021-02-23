import { AppProps } from 'next/app'
import React from 'react'
// import { GlobalStyles } from 'twin.macro'
import "./main.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
