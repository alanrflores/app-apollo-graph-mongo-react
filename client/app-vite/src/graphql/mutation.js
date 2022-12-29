import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
mutation($product: ProductInput){
    createProduct(product: $product) {
     title
     price
     description
     imgUrl
    }
  }
`

export const UPDATE_PRODUCT = gql`
mutation($updateProductId: ID!, $product: ProductInput){
    updateProduct(id: $updateProductId, product: $product) {
      title
      price
      description
      imgUrl
    }
  }
  `