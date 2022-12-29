import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//punto de entrada para que se conecte
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';


const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
    <ApolloProvider client={client}>
     <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
