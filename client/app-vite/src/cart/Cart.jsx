import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.scss";

const Cart = () => {
  const { cart, total, clearItem } = useContext(CartContext);
 

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
 const data = localStorage.getItem('dataCart');
 const prod = JSON.parse(data);
console.log(prod)
 const isMercadoPago = async() => {
 
     fetch('http://localhost:3000/create-payment', prod)
     .then(res =>  res.json())
     .then(data => console.log(data))
     .catch(error => console.log(error))
 }
//window.location.href = data.init_point
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
            // console.log("find", findImage);
            console.log("item", item);
            return (
              <div key={index} className="cart-product">
                <div className="cart-detail">
                  <img src={findImage.url} alt="image-not-found" />
                  <div className="cart-description">
                    <div className="cart-div">
                      <h2>{item.title}</h2>
                      <span>USD {item.price}</span>
                    </div>
                    <div style={{ padding: 6 }}>
                      <span style={{ color: 'gray'}}>Quantity: {item.quantity}</span>
                      <hr />
                    </div>

                    <div className="icon-div">
                      <DeleteIcon
                        className="delete-icon"
                        onClick={() => clearItem(item.id)}
                      />
                    </div>
                    <button onClick={()=> isMercadoPago()}>Confirm</button>
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
