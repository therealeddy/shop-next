import Image from 'next/image'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '~/services/stripe'

import { HomeContainer, Product } from '~/styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}}`}
          key={String(product.id)}
          className="keen-slider__slide"
        >
          <Product>
            <Image
              src={product.imageUrl}
              width={520}
              height={520}
              alt={product.name}
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
