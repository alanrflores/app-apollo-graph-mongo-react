import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
mutation($product: ProductInput){
    createProduct(product: $product) {
     title
     price
     description
     quantity
     stock
     images {
      url
      title
    }
    }
  }
`

export const UPDATE_PRODUCT = gql`
mutation($updateProductId: ID!, $product: ProductInput){
    updateProduct(id: $updateProductId, product: $product) {
      title
      price
      description
      quantity
      stock
      images {
      url
      title
    }
    }
  }
  `

export const REGISTER_USER = gql`
mutation($registerInput: RegisterInput){
  registerUser(registerInput: $registerInput) {
    username
    email
    password
    token
  }
}
`

export const LOGIN_USER = gql`
mutation($loginInput: LoginInput){
  loginUser(loginInput: $loginInput) {
    username
    email
    password
    token
    role
  }
}
`