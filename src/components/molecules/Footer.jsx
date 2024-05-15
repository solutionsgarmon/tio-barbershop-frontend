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
import { useAppContext } from "../../context/AppProvider";
const Footer = () => {
  const { isLoadingApp, windowWidth } = useAppContext();
  return (
    <MDBFooter>
      <footer class="pie-pagina">
        <div
          className="box"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <img
            src="images/icon-tio2.png"
            alt="Logo"
            height="100px"
            style={{ margin: "10px" }}
          />
          <div class="box" style={{ marginBottom: "15px" }}>
            <a href="mailto:contacto@garmon.com.mx" style={{ color: "#fff" }}>
              <WhatsAppIcon sx={{ width: 35, height: 35, mr: 1 }} />
            </a>
            <a href="mailto:contacto@garmon.com.mx" style={{ color: "#fff" }}>
              <FacebookIcon sx={{ width: 35, height: 35, mr: 1 }} />
            </a>
            <a href="mailto:contacto@garmon.com.mx" style={{ color: "#fff" }}>
              <InstagramIcon sx={{ width: 35, height: 35 }} />
            </a>
          </div>
          <div
            class="box"
            style={{
              margin: "auto",
              textAlign: "center",
              marginRight: "auto",
              marginLeft: windowWidth < 800 ? "0px" : "-80px",
            }}
          >
            <a
              href="https://wa.me/525513386822"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.1rem",
                marginRight: "30px",
                fontFamily: "Century Gothic",
              }}
            >
              <EmailIcon sx={{ width: 20, mr: 1 }} />
              eltiobarbershop1@gmail.com
            </a>
            {windowWidth < 800 && <br />}

            <a
              href="https://wa.me/525513386822"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontFamily: "Century Gothic",
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
