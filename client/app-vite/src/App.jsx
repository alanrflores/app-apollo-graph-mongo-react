import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import AllProduct from './product/AllProduct'

const ALL_PRODUCT = gql`
  query{
  getAllProduct {
  title
  price
  description
}
}
`

function App() {
  const {data, error, loading} = useQuery(ALL_PRODUCT);
  if(error) return (
    <div>
      <span style='color: red'>{error}</span>
    </div>
  )
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {
        loading ? (
          <h1>Loading...</h1>
        ) : (
            <>
            <h1>GraphQL + React</h1>
             <AllProduct product={data?.getAllProduct} />
            </>
          
        )
      }
    </div>
  )
}

export default App
