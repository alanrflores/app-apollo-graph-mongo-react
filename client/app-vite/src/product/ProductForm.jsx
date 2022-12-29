import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT } from '../graphql/mutation';
import { ALL_PRODUCT } from '../graphql/queries';


const ProductForm = ({ setError }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
  
const [ createProduct ] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [ { query: ALL_PRODUCT } ],
    onError: (error) => {
    setError(error.graphQLErrors[0].message)
    }
});

const handleSubmit = (e) => {
   e.preventDefault()
   createProduct({ variables: {  product: { title, price, description, imgUrl }}})

   setTitle('')
   setPrice('')
   setDescription('')
   setImgUrl('')
}    
  return (
    <div>
        <h2>New Product</h2>
        <form onSubmit={handleSubmit}>
            <input type="title" placeholder='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
            <input type="price" placeholder='price' value={price} onChange={(e)=> setPrice(e.target.value)} />
            <input type="description" placeholder='description' value={description} onChange={(e)=> setDescription(e.target.value)} />
            <input type="imgUrl" placeholder='imgUrl' value={imgUrl} onChange={(e)=> setImgUrl(e.target.value)} />
            <button>Add product</button>
        </form>
    </div>
  )
}

export default ProductForm