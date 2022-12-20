//esto apenas arranque la aplicación va a leer el archivo .env
require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs/typeDefs.js');
const { resolvers } = require('./resolvers/resolvers.js');
const { graphql } = require('graphql');
const { connectDb } = require('./db.js');
const auth = require('./utils/auth.js');

const app = express();
connectDb();

app.get('/', (req, res) => res.send('Welcome to my api'))

async function start() {
    
    const server = new ApolloServer({
        playground: true,
        introspection: true,
        typeDefs,
        resolvers,
        auth
    });
    
    await server.start();
    server.applyMiddleware({app})
   
    app.use('*', (req, res) => res .status(404).send('Not found'))

    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
      });
};

start();


