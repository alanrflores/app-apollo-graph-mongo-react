import React from 'react'

const AllProduct = ({product}) => {
 if(product === null) return null
  return (
    <>
        {
            product?.map(p => (
                <div key={p.id}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span>{p.price}</span>
                </div>
            ))
        }
    </>
  )
}

export default AllProduct;