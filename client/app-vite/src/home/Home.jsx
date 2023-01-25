import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
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

    //se desplaza a la parte superior de la pagina
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    goToTop();
  }, []);

    const resultStorage = localStorage.getItem("data");
    const dataStorage = JSON.parse(resultStorage);
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