import Image from 'next/image'
import Stripe from 'stripe'
import { GetServerSideProps } from 'next'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '~/services/stripe'

import { HomeContainer, Product } from '~/styles/pages/home'

import 'keen-slider/keen-slider.min.css'

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
        <Product className="keen-slider__slide" key={String(product.id)}>
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
      ))}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data
    .map((product) => {
      const price = product.default_price as Stripe.Price

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: price.unit_amount ? price.unit_amount / 100 : 0,
      }
    })
    .filter((product) => product.price > 0)

  return {
    props: {
      products,
    },
  }
}
