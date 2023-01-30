import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { FIND_PRODUCT } from '../graphql/queries';
import UpdateProductForm from './UpdateProductForm';
import './all-product.scss'
import ProductDetail from './ProductDetail';
import ProductForm from './ProductForm';



const AllProduct = ({ products }) => {
    
    const [getProduct, result] = useLazyQuery(FIND_PRODUCT);
    const [product, setProduct] = useState(null);
   
    const showProduct = (id) => {
        getProduct({ variables: { findProductId: id } })
    };
    
    useEffect(() => {
        if(result?.data){
            setProduct(result?.data?.findProduct)
        }
    },[result])

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

    if(product) {
        console.log('id', product.id);
        return (
        <div>
            <ProductDetail product={product} />
            <button style={{  marginBottom: 10,  padding: 8, backgroundColor: 'Gainsboro', border: 0, borderRadius: 6, fontFamily: 'monospace'}} 
            onClick={()=> showProduct(null)}>Close</button>
            <hr />
            {
               dataStorage?.loginUser?.role === "ADMIN" ? (
                   <UpdateProductForm productId={product.id} />

               ) : ("")
            }
        </div>
    )
 }
    
    if(products === null) return null
  return (
    <> 
    <div className='container-product'>
        <h1>SNEAKERS EXCLUSIVE</h1>
        {
                  dataStorage.loginUser.role === "ADMIN" ? (
                    <ProductForm /> 
                  ) : ("")
                  }
        <section className='div-product'>
        {
            products?.map(p => 
                <div key={p.id} onClick={() => showProduct(p.id)} style={{color: 'violet'}}>
                  <img src={p?.images[0]?.url} alt="product-image" width='260px' height='180px' />
                  <h3 style={{ color: 'black', fontWeight: 'bolder', fontSize: 12, fontFamily: 'monospace' }}>{p.title}</h3>
                </div>  
            )
        }
        </section>
        <section className='section-img'>
            <div className='div-title-img'>
            <h1 className='title-img'>AJ XXXIII Vault</h1>
            <div className='img-design'>
                <img src="https://static.nike.com/a/images/wd2uvykayfkh0gxthn3g/ejection.jpg" alt="" />
            </div>
            </div>
            <hr />
            <div className='div-title-img-two'>
            <h1 className='title-img'>JORDAN 2019</h1>
            <div className='img-design-two'>
                <img src="https://static.nike.com/a/images/b4192f12-cfc5-401c-94d8-0c3c5c3672ba/air-jordan-xxxiv.jpg" alt="" />
            </div>
            </div>
        </section>
        <section className='section-img-two'>
             <h1>I CAN ACCEPT FAILURE. EVERYONE FAILS AT SOMETHING. BUT I CAN’T ACCEPT NOT TRYING.</h1>
             <div className='div-img-jordan'>
                 <img src="https://static.nike.com/a/images/n4twiihk5ezusuwk5vqc/air-jordan-33.png" alt="" />
             </div>
        </section>
    </div>
    </>
  )
}

export default AllProduct;