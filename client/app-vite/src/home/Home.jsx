import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { ALL_PRODUCT } from '../graphql/queries';
import AllProduct from '../product/AllProduct';
import ProductForm from '../product/ProductForm';

const Home = () => {
    const {data, error, loading} = useQuery(ALL_PRODUCT);
    const [errorMessage, setErrorMessage] = useState(null);
  
  
    const notify = (message) => {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    };
  return (
    <div>
      <Notify error={errorMessage}/>
      <header>
      {
        loading ? (
          <h1>Loading...</h1>
        ) : (
            <>
            <AllProduct products={data?.getAllProduct} />
            <ProductForm setError={notify}/> 
            </>
            )
      } 
      </header>
    </div>
  )
};

const Notify = ({error}) => {
    if(!error) return null
    return (
        <div style={{ color: 'red' , position: 'fixed', top: 0, width: '100%' }}>
            {error}
        </div>
    )
  };

export default Home