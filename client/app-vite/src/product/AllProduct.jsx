import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { FIND_PRODUCT } from '../graphql/queries';
import UpdateProductForm from './UpdateProductForm';



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

    if(product) {
        console.log('id', product.id);
        return (
        <div>
            <h1>Product Detail</h1>
            <h3>{product.title}</h3>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <img src={product.imgUrl} alt="product-image" width='260px' height='260px'/>
            <hr />
            <UpdateProductForm productId={product.id} />
            <button onClick={()=> showProduct(null)}>close</button>
        </div>
    )
 }
    
    if(products === null) return null
  return (
    <>
       <h1>Products</h1>
        {
            products?.map(p => 
               
                <div key={p.id} onClick={() => showProduct(p.id)} style={{color: 'violet'}}>
                  <h3>{p.title}</h3>
                  <hr />
                  <img src={p.imgUrl} alt="product-image" width='260px' height='260px' />
                </div>  
            )
        }
    </>
  )
}

export default AllProduct;