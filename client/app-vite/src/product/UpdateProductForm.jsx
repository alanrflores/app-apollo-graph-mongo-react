import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { UPDATE_PRODUCT } from '../graphql/mutation';
import { ALL_PRODUCT, FIND_PRODUCT } from '../graphql/queries';


const UpdateProductForm = ({ productId }) => {
    
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
  
const [ updateProduct, { data, loading} ] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [ { query: ALL_PRODUCT } ],
});

const handleSubmit = (e) => {
   e.preventDefault()

   updateProduct({ variables:{ updateProductId: productId,  product:{ title, price, description, imgUrl }}})
   
   setTitle('')
   setPrice('')
   setDescription('')
   setImgUrl('')
}    
  if (loading) return <p>Loading...</p>
  
  if(data) return <p style={{ color: 'green'}}>Update Succesfully!</p>

  return (
    <div>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
            <input type="title" placeholder='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
            <input type="price" placeholder='price' value={price} onChange={(e)=> setPrice(e.target.value)} />
            <input type="description" placeholder='description' value={description} onChange={(e)=> setDescription(e.target.value)} />
            <input type="imgUrl" placeholder='imgUrl' value={imgUrl} onChange={(e)=> setImgUrl(e.target.value)} />
            <button>Change product</button>
        </form>
    </div>
  )
}

export default UpdateProductForm