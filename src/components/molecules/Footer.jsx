import React from "react";
import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#333", mt: 2 }}>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <div className="col-sm-5 col-xs-12 text-center">
          <img src="images/icon-tio2.png" height="80px" alt="Garmon Logo" />
        </div> */}
        <div
          className="col-xs-12 col-sm-7 text-center footer-icons"
          style={{
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="https://www.facebook.com/eltiobarbershop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <FacebookIcon style={{ fontSize: "36px", color: "white" }} />
                </IconButton>
              </a>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="https://www.facebook.com/eltiobarbershop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <WhatsAppIcon style={{ fontSize: "36px", color: "white" }} />
                </IconButton>
              </a>
            </li>
            {/* <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="https://www.instagram.com/GarmonSolutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <InstagramIcon style={{ fontSize: "36px" }} />
                </IconButton>
              </a>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="https://www.linkedin.com/company/garmon-solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <LinkedInIcon style={{ fontSize: "36px" }} />
                </IconButton>
              </a>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="https://twitter.com/GarmonSolutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <TwitterIcon style={{ fontSize: "36px" }} />
                </IconButton>
              </a>
            </li> */}
            {/* <li style={{ display: "inline-block", marginRight: "10px" }}>
              <a
                href="mailto:contacto@garmon.com.mx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton style={{ fontSize: "36px" }}>
                  <EmailIcon style={{ fontSize: "36px" }} />
                </IconButton>
              </a>
            </li> */}
          </ul>
        </div>
        {/* <div className="col-sm-5 col-xs-12 text-center">
          <img src="images/icon-tio2.png" height="80px" alt="Garmon Logo" />
        </div> */}
      </div>
    </Box>
  );
};

export default Footer;
