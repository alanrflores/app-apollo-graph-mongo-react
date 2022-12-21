import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
//punto de entrada para que se conecte
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
     <App />
    </ApolloProvider>
  </React.StrictMode>,
)
