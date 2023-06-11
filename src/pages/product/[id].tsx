import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '~/styles/pages/product'

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>Lorem Ipsum</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
