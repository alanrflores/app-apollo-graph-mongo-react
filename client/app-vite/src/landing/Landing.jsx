import React from "react";
import "./landing.css";
import ProductImageSlider from "../product/ProductImageSlider";
import { productImages } from '../assets'

const Landing = () => {

  return (
    <div>
      <div>
        {
          productImages?.length > 0 && <ProductImageSlider images={productImages} />
        }
      
      </div>
      <div>
      <h1 style={{ marginTop: 50 , color: 'gray'}}>All our sneakers available.</h1>
      <img src="https://i.pinimg.com/originals/53/4b/3d/534b3d306b597e6c19291686b5e04033.png" width='50px' heigth='50px' alt="" />
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
      <div className='titleReleases'>
        <h2 style={{ fontFamily: "Futura", color: "gray", fontSize: "24px" }}>Latest releases.</h2>
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
          <div className='buttonCraterImpact'>
            <button
              style={{
                zIndex: 2,
                fontSize: 12,
                fontFamily: 'monospace',
                position: "absolute",
                borderRadius: 12,
                color: "white",
                backgroundColor: "black",
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 4,
                paddingBottom: 4,
             
              }}
            >
              See more
            </button>
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
    </div>
  );
};

export default Landing;
