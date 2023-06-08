import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import Image from 'next/image'

import { globalStyles } from '~/styles/global'
import logoImg from '~/images/logo.svg'
import { Container, Header } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
      <Analytics />
    </Container>
  )
}
