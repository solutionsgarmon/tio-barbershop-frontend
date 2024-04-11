import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import { Navigate, useNavigate } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import { useState } from "react";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        sx={{ zIndex: 0, paddingTop: 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={0.5}>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              {props.isSmUp && (
                <Typography color="inherit" variant="h5" component="h1">
                  {props.tabs ? (
                    props.tabs[0]
                  ) : (
                    // <Stack direction={"row"}>
                    //   <Skeleton variant="rectangular" width={500} height={20} />{" "}
                    // </Stack>
                    <></>
                  )}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  navigate("/");
                }}
              >
                Regresar al Website
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                {/* <Avatar src="/images/icon-tio.png" alt="My Avatar" /> */}
                <SecurityIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {props.tabs && (
        <AppBar
          component="div"
          position="static"
          elevation={0}
          sx={{ zIndex: 0 }}
        >
          <Tabs value={props.indexTabSelected} textColor="inherit">
            {props.tabs.map((tab, index) => (
              <Tab
                label={tab}
                onClick={() => props.setIndexTabSelected(index)}
              />
            ))}
          </Tabs>
        </AppBar>
      )}
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
