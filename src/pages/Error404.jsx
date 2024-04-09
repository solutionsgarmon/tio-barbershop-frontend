import React from "react";
import "./css/style.css";

const Error404 = () => {
  return (
    <main className="page-content" id="perspective">
      <div className="content-wrapper">
        <div className="page-header page-header-perspective">
          <div className="page-header-left">
            <a className="brand" href="index.html">
              <img
                src="images/logo-default-dark-200x36.png"
                alt=""
                width="200"
                height="36"
              />
            </a>
          </div>
          <div className="page-header-right">
            <div
              id="perspective-open-menu"
              data-custom-toggle=".perspective-menu-toggle"
              data-custom-toggle-hide-on-blur="true"
            >
              <span className="perspective-menu-text">Menu</span>
              <button className="perspective-menu-toggle">
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div id="wrapper">
          <section className="section-sm bg-periglacial-blue one-screen-page-content text-center">
            <div className="shell">
              <h2>404</h2>
              <div className="p text-width-small">
                <p className="big">
                  The requested page couldn't be found - this could be due to a
                  spelling error in the URL or a removed page.
                </p>
              </div>
              <a
                className="btn btn-sm btn-style-1 btn-primary"
                href="index.html"
              >
                Back to homepage
              </a>
            </div>
          </section>

          {/* Page Footer */}
          <footer className="page-footer page-footer-default">
            <div className="shell">
              <div className="range range-xs-center">
                <div className="cell-lg-10">
                  <a className="brand" href="index.html">
                    <img
                      src="images/logo-default-dark-200x36.png"
                      alt=""
                      width="200"
                      height="36"
                    />
                  </a>
                  <div className="text-highlighted-wrap">
                    <p className="text-highlighted">
                      Barbershop is a No.1 place to have a men’s haircut in San
                      Francisco. Here you can get luxury barber experience at a
                      reasonable price.
                    </p>
                  </div>
                  <ul className="footer-navigation footer-navigation-horizontal">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="services.html">Services</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="shop.html">Shop</a>
                    </li>
                    <li>
                      <a href="contacts-1.html">Contacts</a>
                    </li>
                  </ul>
                  <div className="divider divider-small divider-light block-centered"></div>
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
                </div>
              </div>
            </div>
          </footer>
        </div>
        <div id="perspective-content-overlay"></div>
      </div>
      {/* RD Navbar */}
      <div className="rd-navbar-wrap" style={{ height: "0px" }}>
        <nav
          className="rd-navbar rd-navbar-default rd-navbar-original rd-navbar-fixed"
          data-layout="rd-navbar-fixed"
          data-sm-layout="rd-navbar-fixed"
          data-sm-device-layout="rd-navbar-fixed"
          data-md-layout="rd-navbar-sidebar"
          data-md-device-layout="rd-navbar-fixed"
          data-lg-device-layout="rd-navbar-fixed"
          data-lg-layout="rd-navbar-sidebar"
          data-stick-up-clone="false"
        >
          <div className="rd-navbar-inner">
            <div className="rd-navbar-panel">
              <button
                className="rd-navbar-toggle toggle-original"
                data-rd-navbar-toggle=".rd-navbar-nav-wrap"
              >
                <span></span>
              </button>
              <div className="rd-navbar-brand">
                <a className="brand-name" href="index.html">
                  <img
                    src="images/logo-default-dark-200x36.png"
                    alt=""
                    width="200"
                    height="36"
                  />
                </a>
              </div>
            </div>
            <div className="rd-navbar-nav-wrap toggle-original-elements">
              <div className="rd-navbar-nav-inner">
                <ul className="rd-navbar-nav">
                  <li className="active rd-navbar--has-megamenu rd-navbar-submenu">
                    <a href="index.html">Home</a>
                    <ul className="rd-navbar-megamenu rd-navbar-open-right">
                      <li>
                        <p className="rd-megamenu-header">
                          <a href="index.html">Home</a>
                        </p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="home-variant-2.html">Home variant 2</a>
                          </li>
                          <li>
                            <a href="home-variant-3.html">Home variant 3</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">
                          <a href="about.html">About</a>
                        </p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="barbers.html">barbers</a>
                          </li>
                          <li>
                            <a href="testimonials.html">Testimonials</a>
                          </li>
                          <li>
                            <a href="faq.html">FAQ</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">Contact Us</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="contacts-1.html">Contacts 1</a>
                          </li>
                          <li>
                            <a href="contacts-2.html">Contacts 2</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">
                          <a href="services.html">Services</a>
                        </p>
                      </li>
                      <li>
                        <p className="rd-megamenu-header">Book</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="step-1.html">Step 1</a>
                          </li>
                          <li>
                            <a href="step-2.html">Step 2</a>
                          </li>
                          <li>
                            <a href="step-3.html">Step 3</a>
                          </li>
                          <li>
                            <a href="step-4.html">Step 4</a>
                          </li>
                          <li>
                            <a href="finish.html">Finish</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">Blog</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                          <li>
                            <a href="single-post.html">Single post</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">
                          <a href="shop.html">Shop</a>
                        </p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="single-product.html">Single product</a>
                          </li>
                          <li>
                            <a href="cart.html">Cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p className="rd-megamenu-header">Pages</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="404-page.html">404 page</a>
                          </li>
                          <li>
                            <a href="503-page.html">503 page</a>
                          </li>
                          <li>
                            <a href="maintenance.html">Maintenance</a>
                          </li>
                          <li>
                            <a href="coming-soon.html">Coming soon</a>
                          </li>
                          <li>
                            <a href="privacy-policy.html">Privacy policy</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">Layouts</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="header-perspective.html">
                              Header perspective
                            </a>
                          </li>
                          <li>
                            <a href="header-transparent.html">
                              Header transparent
                            </a>
                          </li>
                          <li>
                            <a href="header-fullwidth.html">Header fullwidth</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p className="rd-megamenu-header">Layouts</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="footer-default.html">Footer default</a>
                          </li>
                          <li>
                            <a href="footer-variant-2.html">Footer variant 2</a>
                          </li>
                          <li>
                            <a href="footer-variant-3.html">Footer variant 3</a>
                          </li>
                        </ul>
                        <p className="rd-megamenu-header">Additional</p>
                        <ul className="rd-megamenu-list">
                          <li>
                            <a href="buttons.html">Buttons</a>
                          </li>
                          <li>
                            <a href="forms.html">Forms</a>
                          </li>
                          <li>
                            <a href="grid.html">Grid</a>
                          </li>
                          <li>
                            <a href="progress-bars.html">Progress Bars</a>
                          </li>
                          <li>
                            <a href="tables.html">Tables</a>
                          </li>
                          <li>
                            <a href="tabs-and-accordions.html">
                              Tabs and Accordions
                            </a>
                          </li>
                          <li>
                            <a href="typography.html">Typography</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <span className="rd-navbar-submenu-toggle"></span>
                  </li>
                  <li className="rd-navbar--has-dropdown rd-navbar-submenu">
                    <a href="about.html">About</a>
                    <ul className="rd-navbar-dropdown rd-navbar-open-right">
                      <li>
                        <a href="barbers.html">barbers</a>
                      </li>
                      <li>
                        <a href="testimonials.html">Testimonials</a>
                      </li>
                      <li>
                        <a href="faq.html">FAQ</a>
                      </li>
                    </ul>
                    <span className="rd-navbar-submenu-toggle"></span>
                  </li>
                  <li>
                    <a href="services.html">Services</a>
                  </li>
                  <li className="rd-navbar--has-dropdown rd-navbar-submenu">
                    <a href="blog.html">Blog</a>
                    <ul className="rd-navbar-dropdown rd-navbar-open-right">
                      <li>
                        <a href="single-post.html">Single post</a>
                      </li>
                    </ul>
                    <span className="rd-navbar-submenu-toggle"></span>
                  </li>
                  <li className="rd-navbar--has-dropdown rd-navbar-submenu">
                    <a href="shop.html">Shop</a>
                    <ul className="rd-navbar-dropdown rd-navbar-open-right">
                      <li>
                        <a href="single-product.html">Single product</a>
                      </li>
                      <li>
                        <a href="cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                    </ul>
                    <span className="rd-navbar-submenu-toggle"></span>
                  </li>
                  <li className="rd-navbar--has-dropdown rd-navbar-submenu">
                    <a href="#">Contacts</a>
                    <ul className="rd-navbar-dropdown rd-navbar-open-right">
                      <li>
                        <a href="contacts-1.html">Contacts 1</a>
                      </li>
                      <li>
                        <a href="contacts-2.html">Contacts 2</a>
                      </li>
                    </ul>
                    <span className="rd-navbar-submenu-toggle"></span>
                  </li>
                </ul>
                <div className="rd-navbar-nav-footer">
                  <ul className="inline-list inline-list-md">
                    <li>
                      <a
                        className="icon icon-xs link-gray-base fa-facebook"
                        href="#"
                      ></a>
                    </li>
                    <li>
                      <a
                        className="icon icon-xs link-gray-base fa-twitter"
                        href="#"
                      ></a>
                    </li>
                    <li>
                      <a
                        className="icon icon-xs link-gray-base fa-youtube"
                        href="#"
                      ></a>
                    </li>
                    <li>
                      <a
                        className="icon icon-xs link-gray-base fa-linkedin"
                        href="#"
                      ></a>
                    </li>
                  </ul>
                </div>
                <div className="rd-navbar-secondary">
                  <a
                    className="btn btn-xs btn-circle btn-primary"
                    href="step-1.html"
                  >
                    BOOK NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Error404;
