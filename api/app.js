//esto apenas arranque la aplicación va a leer el archivo .env
require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs/typeDefs.js");
const { resolvers } = require("./resolvers/resolvers.js");
const { connectDb } = require("./db.js");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const getUserFromRequest = require("./getRequestUser/getUserFromRequest.js");
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");

connectDb();
const app = express();

//configure the SDK
mercadopago.configure({ access_token: process.env.MP_ACCESS_KEY });
app.use(bodyParser.urlencoded({ extended: true })); //extended por deprecación
app.use(bodyParser.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});
app.get("/", (req, res) => res.send("Welcome to my api"));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function start() {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ user: getUserFromRequest(req) }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });
}

start();
