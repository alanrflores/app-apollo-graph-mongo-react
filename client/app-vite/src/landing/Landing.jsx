import React, { useEffect, useState } from "react";
import "./landing.css";
import ProductImageSlider from "../product/ProductImageSlider";
import { productImages } from "../assets";
import { useMutation, useApolloClient } from "@apollo/client";
import { REGISTER_USER, LOGIN_USER } from "../graphql/mutation.js";
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../useAuth/useAuth.js'

const Landing = () => {
  // const { login, loading, authToken, isAuthenticated, error} = useAuth();
  const client = useApolloClient();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return;

    try {
      // await login(email, password)
      const { data } = await loginUser({
        variables: { loginInput: { email, password } },
      });
      const { token } = data.loginUser;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(data));
      navigate("/home");
      client.resetStore();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const resultStorage = localStorage.getItem("data");
  const result = JSON.parse(resultStorage);
 
  // console.log(result && result)
  return (
    <div>
      <div>
        {productImages?.length > 0 && (
          <ProductImageSlider images={productImages} />
        )}
      </div>
      <div>
        <h1 style={{ marginTop: 50, color: "gray" }}>
          All our sneakers available.
        </h1>
        <img
          src="https://i.pinimg.com/originals/53/4b/3d/534b3d306b597e6c19291686b5e04033.png"
          width="50px"
          heigth="50px"
          alt=""
        />
      </div>
      <div className="containerImg">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/957a33a3-83b5-4c7d-a482-c2e41005f3f1/marca-jordan.png"
          alt="nike-jordan"
          width="100%"
          heigth="100%"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className="containerImg">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/22953560-c7db-4617-ae29-cebb6a59a799/marca-jordan.jpg"
          alt="nike-jordan"
          width="100%"
          heigth="100%"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className="titleReleases">
        <h2 style={{ fontFamily: "Futura", color: "gray", fontSize: "24px" }}>
          Latest releases.
        </h2>
      </div>
      <div className="containerImgPar">
        <div className="divImgPar">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/9121b388-0658-4c84-a451-09a373d599d7/nike-sportswear.png"
            alt="nike-zero"
            width="100%"
            heigth="100%"
            style={{ marginRigth: "10px", borderRadius: "10px", zIndex: 1 }}
          />
          <div className="divCraterbtn">
            <button className="buttonCrater">See more</button>
          </div>
        </div>
        <h4 className="textImPar">CRATER IMPACT</h4>
        <div className="divImgParTwo">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1184,c_limit/85b1cd26-23ff-44a1-80b6-360ce24cf5ed/nike-sportswear.jpg"
            alt="nike-jordan"
            width="100%"
            heigth="100%"
            style={{ marginLeft: "10px", borderRadius: "10px" }}
          />
        </div>
      </div>
      <div className="containerTitle">
        <h2 style={{ fontFamily: "Futura", color: "gray", fontSize: "24px" }}>
          The ideal place for your Sneakers.
        </h2>
      </div>
      <div className="divButton">
        <button className="buttonSeeMore">See more</button>
      </div>
      {result 
        ?
          (
           <h1 style={{ color: 'gray' , padding: 10 }}>Enjoy our products.</h1>
          ) : (
            <>
            <h1 style={{ marginTop: 70, color: "gray" }}>
              Login to see our products.
            </h1>
            <div className="container-form">
              <form onSubmit={onSubmit} className="form-div">
                {/* <input 
            type="username" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} /> */}
                <label style={{ color: "gray" }}>Email </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    margin: 4,
                    padding: 8,
                    borderRadius: 6,
                    border: 0,
                  }}
                />
                <label style={{ color: "gray" }}>Password </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    margin: 4,
                    padding: 8,
                    borderRadius: 6,
                    border: 0,
                  }}
                />
                <button className="buttonLogin" type="submit">
                  Login
                </button>
                <div className="divError">
                  {error && <p>{error.message}</p>}
                </div>
              </form>
            </div>
          </>
          )
        }
    </div>
  );
};

export default Landing;
