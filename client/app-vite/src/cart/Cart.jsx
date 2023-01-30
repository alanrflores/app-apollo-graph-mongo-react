import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.scss";
import { CREATE_PAYMENT } from "../graphql/mutation";
import { useMutation } from "@apollo/client";


const Cart = () => {
  const { cart, total, clearItem } = useContext(CartContext);
  const [createPayment, { data }] = useMutation(CREATE_PAYMENT);


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

 const result = localStorage.getItem('dataCart');
 const prod = JSON.parse(result);



 const handleSubmit = async(productId, quantity) => {
   try {

     const { data } = await createPayment({ variables: { productId , quantity }});
     const { payment } = data;
    //  const payment = await create.payment.get(id);
    //  console.log('id', payment.id)
     console.log('data', data.createPayment)
     window.location.href = data.createPayment.init_point;
  
   } catch (error) {
     console.log(error.message)
   }
 };
 



  return (
    <div>
      <div className="container-cart">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <h2>Empty</h2>
            <p>There are no items in your cart.</p>
            <div className="button-empty">
              <Link to={"/home"}>
                <button>Search now</button>
              </Link>
            </div>
          </div>
        ) : (
          cart?.map((item, index) => {
            const findImage = item?.images?.find((firstImg) => firstImg);

            let itemQuantity = item.quantity
            let quantityInt = parseInt(itemQuantity, 10);
            let newItem = {
              ...item,
              quantity: quantityInt
            };
            
            console.log("item", item);
            return (
              <div key={index} className="cart-product">
                <div className="cart-detail">
                  <img src={findImage.url} alt="image-not-found" />
                  <div className="cart-description">
                    <div className="cart-div">
                      <h2>{newItem.title}</h2>
                      <span>USD {newItem.price}</span>
                    </div>
                    <div style={{ padding: 6 }}>
                      <span style={{ color: 'gray'}}>Quantity: {newItem.quantity}</span>
                      <hr />
                    </div>

                    <div className="icon-div">
                      <DeleteIcon
                        className="delete-icon"
                        onClick={() => clearItem(newItem.id)}
                      />
                    </div>
                    <button onClick={()=> handleSubmit(newItem.id, newItem.quantity)}>Confirm</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
