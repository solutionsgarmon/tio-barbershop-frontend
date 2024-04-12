import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  autenticarUsuarioConGoogle,
  autenticarUsuarioFB,
} from "../api/FirebaseService";

import { createUserSession } from "../helpers/localStorageHelper";
import GoogleIcon from "../../public/images/icons/icon-google.png";
import { useAppContext } from "../context/AppProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <b>El Tío - Barbershop </b>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  //   const USUARIOS = useSelector((state) => state.usuariosSliceReducer);
  //   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Correo: "emmanuel@gmail.com",
    Password: "123123123",
  });
  const { Correo, Password } = formData;
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensajeMayus, setMensajeMayus] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { verifySession } = useAppContext();

  const navigate = useNavigate();
  //   const { token } = useParams();
  const timer = useRef();

  useEffect(() => {
    setShowMenu(false);

    return () => {
      setShowMenu(true);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    timer.current = window.setTimeout(() => {
      handleLogin();
    }, 500);
  };

  //Autenticación correo/contraseña
  const handleLogin = async () => {
    try {
      const userFB = await autenticarUsuarioFB(
        formData.Correo,
        formData.Password
      );
      console.log("userFBuserFB", userFB);
      // await createUserSession(userFB);
      // verifySession();
      setShowMenu(true);
      navigate("/");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const userFB = await autenticarUsuarioConGoogle();

      await createUserSession(userFB);
      verifySession();
      setShowMenu(true);

      navigate("/");
    } catch (e) {
      // showMensajeError("Hubo un problema con su autententicación : " + e);
    }
  };

  function isCapsLockOn(event) {
    const caps = event.getModifierState && event.getModifierState("CapsLock");
    if (caps) {
      setMensajeMayus("Las Mayúsculas están Activadas");
    } else {
      setMensajeMayus("");
    }
  }

  document.addEventListener("mouseenter", isCapsLockOn);
  document.addEventListener("keydown", isCapsLockOn);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(https://img.freepik.com/vector-premium/plantilla-logotipo-barberia-vintage_441059-26.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 10,
            mx: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de Sesión
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <TextField
              error={errorLogin}
              onChange={(e) =>
                setFormData({ ...formData, Correo: e.target.value })
              }
              margin="normal"
              required
              fullWidth
              label="E-mail"
              autoFocus
              value={Correo}
            />

            <TextField
              disabled={loading}
              helperText={mensajeMayus}
              error={errorLogin}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={Password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ m: "auto" }}
                  disabled={loading}
                  color="primary"
                  checked={formData.Recordar}
                  // onChange={handleOnChange}
                  name="Recordar"
                />
              }
              label="Recordar datos"
            />

            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2, minHeight: 50 }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <img
                      src={GoogleIcon}
                      alt="Icono"
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  onClick={handleGoogle}
                  color="inherit"
                  sx={{ border: "1px solid black" }}
                >
                  Iniciar sesión con Google
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs>
                <br />
                {!loading && (
                  <Link
                    href="#"
                    onClick={() => {
                      // dispatch(CHANGE_STATE("showModalRecuperarPassword"));
                    }}
                  >
                    ¿Olvidó su contraseña?
                  </Link>
                )}
                <br />
                {!loading && (
                  <Typography sx={{ mt: 1 }}>
                    ¿Aun no tienes cuenta?{" "}
                    <Link
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        navigate("/registro");
                      }}
                    >
                      Registrarse
                    </Link>
                  </Typography>
                )}
              </Grid>
              <Grid item></Grid>
            </Grid>

            {errorLogin && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>¡ERROR!</AlertTitle>
                <b>
                  Por favor revisa el <strong>Usuario</strong> y la{" "}
                  <strong>Contraseña</strong>
                </b>
              </Alert>
            )}

            <Copyright sx={{ mt: 5 }} />
            <Box sx={{ display: "flex" }}>
              {loading && (
                <CircularProgress
                  variant="indeterminate"
                  size={100}
                  sx={{ m: "auto", mt: 5 }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
