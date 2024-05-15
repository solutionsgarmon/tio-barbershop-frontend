import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import "./styleFooter.css";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <MDBFooter>
      <footer class="pie-pagina">
        <div class="grupo-1">
          <div className="box" style={{ textAlign: "center" }}>
            <img
              src="images/icon-tio2.png"
              alt="Logo"
              height="100px"
              style={{ margin: "auto", marginBottom: -20, marginTop: -25 }}
            />
          </div>
          <div class="box" style={{ margin: "auto" }}>
            <a href="mailto:contacto@garmon.com.mx" style={{ color: "#fff" }}>
              <WhatsAppIcon sx={{ width: 35, height: 35, mr: 1 }} />
              <FacebookIcon sx={{ width: 35, height: 35, mr: 1 }} />
              <InstagramIcon sx={{ width: 35, height: 35 }} />
            </a>
          </div>
          <div class="box" style={{ margin: "auto", textAlign: "center" }}>
            <a
              href="https://wa.me/525513386822"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.1rem",
              }}
            >
              <EmailIcon sx={{ width: 20, mr: 1 }} />
              eltiobarbershop1@gmail.com
            </a>
            <br />
            <a
              href="https://wa.me/525513386822"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.1rem",
              }}
            >
              <CallIcon sx={{ width: 20, mr: 1 }} />
              +52 55 1338 6822
            </a>
          </div>
        </div>
        <div class="grupo-2">
          <small>
            &copy; {new Date().getFullYear()}{" "}
            <b>
              Garmon Solutions <KeyboardArrowDownIcon />
            </b>
          </small>
        </div>
      </footer>
    </MDBFooter>
  );
};

export default Footer;
