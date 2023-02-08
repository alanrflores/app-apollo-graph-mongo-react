const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @auth(requires: Role) on OBJECT | FIELD_DEFINITION

  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    avatar: String
    role: Role!
    token: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    avatar: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Image {
    id: ID!
    url: String!
    title: String!
  }

  type Product {
    id: ID
    title: String!
    price: String!
    description: String!
    quantity: Int!
    stock: String!
    images: [Image]
    paymentId: ID
  }

  type Payer {
    email: String
  }

  type Item {
    title: String
    description: String
    quantity: Int
    unit_price: String
  }

  type Payment {
    id: ID
    productIds: [ID]
    quantities: [Int]
    init_point: String
    operation_type: String
    items: [Item]
    payer: Payer
  }

  input ImageInput {
    url: String!
    title: String!
  }

  input PaymentInput {
    productId: ID!
    quantity: Int!
  }
  # input CardInput {
  #     card_number: String!
  #     expiration_month: String!
  #     expiration_year: String!
  #     security_code: String!
  #     cardholder_name: String!
  # }

  input ProductInput {
    title: String!
    price: String!
    description: String!
    quantity: Int!
    stock: String!
    images: [ImageInput]
  }

  type Data {
    id: ID!
    value: String
  }

  type Query {
    hello: String
    getAllProduct: [Product]
    findProduct(id: ID): Product
    user(id: ID!): User
    getAllUser: [User]
    userData: [Data] @auth(requires: USER)
    adminData: [Data] @auth(requires: ADMIN)
    data(id: ID!): Data
  }

  type Mutation {
    createProduct(product: ProductInput): Product
    deleteProduct(id: ID!): String
    updateProduct(id: ID!, product: ProductInput): Product
    updateProductStock(id: ID!, stock: String): Product
    updateRole(id: ID!, role: Role = USER): User
    createPayment(productIds: [ID], quantities: [Int]): Payment
    registerUser(registerInput: RegisterInput, role: Role): User
    loginUser(loginInput: LoginInput): User
  }
`;

module.exports = { typeDefs };
