import type { AppProps } from 'next/app'
import Meta from '$components/Meta'
import '$styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
