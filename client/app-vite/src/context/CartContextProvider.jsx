import React, { createContext, useState , useEffect} from 'react'
import { checkExistInTheCart } from '../check/check';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState([]);

  useEffect(() => {
  const product = products;
  if(product){
    setProducts(product);
  } else {
    setProducts([]);
  }
  },[products]);

//Revisamos si se encuentra algo dentro de 'datacart'
  useEffect(() => {
  const dataCart = JSON.parse(localStorage.getItem('dataCart'));
  if(dataCart){
    setCart(dataCart);
  }
  },[]);


//agregamos producto al carrito  
  const addItem = (item) => {
   if(checkExistInTheCart(cart, item)){
    setCart([...cart]);
    alert('This product already exists in the cart')
    return;
   }
   setCart([...cart, item]);
   localStorage.setItem('dataCart', JSON.stringify([...cart, item]));
   alert('Good job!, Added to cart!')
   return;
  };

//eliminamos el producto  
  const clearItem = (id) => {
      let newCart = cart.filter((item) => item.id !== id)
      setCart(newCart);
      localStorage.removeItem('dataCart');
  };
  

//sacamos el total  
  useEffect(() => {
    const getTotal = () => {
      const data = cart.reduce((acc, current) => {
        return acc + current.price * current.quantity;
      }, 0);
      setTotal(data);
    };
    getTotal();
  }, [cart]);

//validamos los campos  
  const validateAll = (fields) => {
    return fields.some((field) => field === "");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        products,
        setProducts,
        addItem,
        clearItem,
        validateAll,
        total,
      }}
    >
       {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;