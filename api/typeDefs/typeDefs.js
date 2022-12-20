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

 type Task {
   id: ID,
   title: String,
   description: String
 }
 
 input TaskInput {
   title: String
   description: String
 }

 type Query {
   hello: String,
   getAllTask: [Task]
   getTask(id: ID): Task
   user(id: ID!) : User
 }

 type Mutation {
   createTask(task: TaskInput ): Task
   deleteTask(id: ID!): String
   updateTask(id: ID!, task: TaskInput) : Task
   registerUser(registerInput: RegisterInput) : User
   loginUser(loginInput: LoginInput) : User
  #  register(username: String!, email: String! , password: String!) : String!
  #  login(username: String!, email: String!,  password: String!) : String!
 }

`

module.exports = { typeDefs };