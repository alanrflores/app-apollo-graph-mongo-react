import React from "react";
import "./footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Footer = () => {
  return (
    <div className="footerPadre">
      <div className="footerContainer">
        <div className="footerRegister">
          <h4>Nearest premises</h4>
          <h4>Sign up to receive news</h4>
        </div>
        <div className="footerAbout">
          <h4>About sneakers</h4>
          <span>News</span>
        </div>
        <div className="footerSocialRed">
          <div className="divSocialRed">
            <TwitterIcon sx={{ fontSize: 26, color: "white", margin: "4px" }} />
            <InstagramIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
            <FacebookIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
            <LinkedInIcon
              sx={{ fontSize: 26, color: "white", margin: "4px" }}
            />
          </div>
        </div>
      </div>
      <div className="divTerms">
        <div className="divTitle">
          <span style={{ marginLeft: 10 , padding: 2, color: 'white' }}> <FmdGoodIcon /> Argentina</span>  
          <span style={{ marginLeft: 10 , padding: 10 }}>
            © 2022 Sneakers, Inc. All rights reserved.
          </span>
          </div>
          <div className="divSubTitle">
            <span style={{ marginRight: 20 ,padding: 10 }}>Terms of use</span>
            <span style={{ marginRight: 20 , padding: 10 }}>Privacy Policy</span>
          </div>
        </div>
      </div>
  );
};

export default Footer;
