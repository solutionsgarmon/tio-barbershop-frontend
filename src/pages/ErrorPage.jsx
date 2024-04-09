import React from "react";
import { Box } from "@mui/material";

const ErrorPage = () => {
  const TEXTO =
    "El tío Barbershop es es establecimiento #1 en corte de cabello y estilizado de barba que hay en CDMX. Vísitanos y compurébalo tú mismo. ";
  return (
    <Box sx={{ mt: 0 }}>
      <main className="page-content" id="perspective">
        <div className="content-wrapper">
          <div id="wrapper">
            <section className="section-sm bg-periglacial-blue one-screen-page-content text-center">
              <div className="shell">
                <h2>¡UPS!</h2>
                <div className="p text-width-small">
                  <p className="big">
                    Parece que algo no está funcionando correctamente en nuestra
                    página, por favor inténtalo de nuevo.
                  </p>
                  <br />
                  <p className="big">
                    Si el problema persiste, no dudes en contactarnos.
                  </p>
                </div>
                <Box sx={{ mt: 5 }}>
                  <a
                    className="btn btn-sm btn-style-1 btn-primary"
                    href="index.html"
                  >
                    Continuar Navegando
                  </a>
                </Box>
              </div>
            </section>

            {/* Page Footer */}
            <Box sx={{ mt: -6 }}>
              <footer className="page-footer page-footer-default">
                <div className="shell">
                  <div className="range range-xs-center">
                    <div className="cell-lg-10">
                      <a className="brand" href="index.html">
                        <img src="images/icon-tio.png" alt="" width="80" />
                      </a>
                      <div className="text-highlighted-wrap">
                        <p className="text-highlighted">{TEXTO}</p>
                      </div>

                      <div className="divider divider-small divider-light block-centered"></div>
                      <Box sx={{ mt: 0 }}>
                        <ul className="inline-list inline-list-md">
                          <li>
                            <a
                              className="icon icon-xs link-gray-light fa-facebook"
                              href="#"
                            ></a>
                          </li>
                          <li>
                            <a
                              className="icon icon-xs link-gray-light fa-twitter"
                              href="#"
                            ></a>
                          </li>
                          <li>
                            <a
                              className="icon icon-xs link-gray-light fa-youtube"
                              href="#"
                            ></a>
                          </li>
                          <li>
                            <a
                              className="icon icon-xs link-gray-light fa-linkedin"
                              href="#"
                            ></a>
                          </li>
                        </ul>
                      </Box>
                    </div>
                  </div>
                </div>
              </footer>
            </Box>
          </div>
          <div id="perspective-content-overlay"></div>
        </div>
      </main>
    </Box>
  );
};

export default ErrorPage;
