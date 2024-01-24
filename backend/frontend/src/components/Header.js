import React, { useContext, useEffect, useState } from 'react';
import logo from './images/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles.css';
import { UserContext } from '../App';
const Header = () => {
  const contextValue = useContext(UserContext);
  const [state, payload, dispatch] = contextValue;
  const [isLogin, setIsLogin] = useState(false);

  const verifyPage = async () => {
    try {
      const res = await fetch('/displaydata', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.status === 200) {
        const err = new Error(res.error);
        throw err;
      }
      setIsLogin(true);
    } catch (err) {
      console.log(err);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    verifyPage();
  }, [state]); // Add state as a dependency to useEffect

  const RenderMenu = () => {
    if (isLogin) {
      return (
        <>
        <div>
        <nav className="navbar navbar-expand-lg" style={{ background: '', position: 'sticky', top: '0', zIndex: '1000' }}>
    <div className="container-fluid">
      <img src={logo} className="me-5 ms-5" alt="" />
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto menu-item mb-2 mb-lg-0 ms-5 justify-content-center">
          <li className="nav-item">
            <Link className="nav-link text-muted  active me-3 fw-bold" to="/">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted  me-3 fw-bold" to="/shop">
              SHOP
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted  me-3 fw-bold" to="/blog">
              BLOG
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-muted  me-3 fw-bold" to="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 mb-lg-0 menu-item">
          <li className="nav-item ms-5 fw-bolder">
            <Link className="nav-link text-muted  me-3 fw-bold" to="/cart">
              <FaShoppingCart/>
            </Link>
          </li>
          <li className="nav-item ms-5 fw-bolder">
            <Link
              onClick={verifyPage}
              className="nav-link text-muted  me-3 fw-bold"
              to="/logout"
            >
              LOGOUT
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
       </div> 
      </>
      );
    } else {
      return (
        <>
          <div>
          <nav className="navbar navbar-expand-lg" style={{ background: '', position: 'sticky', top: '0', zIndex: '1000' }}>
      <div className="container-fluid">
        <img src={logo} className="me-5 ms-5" alt="" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto menu-item mb-2 mb-lg-0 ms-5 justify-content-center">
            <li className="nav-item">
              <Link className="nav-link text-muted  active me-3 fw-bold" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted  me-3 fw-bold" to="/shop">
                SHOP
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted  me-3 fw-bold" to="/blog">
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted  me-3 fw-bold" to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 menu-item">
            <li className="nav-item ms-5 fw-bolder">
              <Link className="nav-link text-muted  me-3 fw-bold" to="/cart">
               <FaShoppingCart/>
              </Link>
            </li>
            <li className="nav-item ms-5 fw-bolder">
              <Link
                onClick={verifyPage}
                className="nav-link text-muted  me-3 fw-bold"
                to="/loginpage"
              >
                LOGIN
              </Link>
            </li>
            <li className="nav-item ms-5 fw-bolder">
              <Link
                onClick={verifyPage}
                className="nav-link text-muted  me-3 fw-bold"
                to="/signup"
              >
                SIGNUP
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
         </div> 
        </>
      );
    }
  };

  return (
    <>
      <RenderMenu />
    </>
  );
};

export default Header;
