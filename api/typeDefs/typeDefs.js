const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  id: ID!
  username:String!
  email: String!
  password: String!
  avatar: String
  token: String
}

input RegisterInput {
  username: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

 type Product {
   id: ID,
   title: String
   price: String
   imgUrl: String
   description: String
 }
 
 input ProductInput {
   title: String
   price: String
   imgUrl: String
   description: String
   
 }

 type Query {
   hello: String,
   getAllProduct: [Product]
   findProduct(id: ID): Product
   user(id: ID!) : User
 }

 type Mutation {
   createProduct(product: ProductInput ): Product
   deleteProduct(id: ID!): String
   updateProduct(id: ID!, product: ProductInput) : Product
   registerUser(registerInput: RegisterInput) : User
   loginUser(loginInput: LoginInput) : User

 }

`

module.exports = { typeDefs };