import React, { useState, useEffect } from 'react';
import breadcrumb from './images/breadcrumb.png';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Customerinfo = () => {
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const history = useNavigate();

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
    } catch (err) {
      console.log(err);
      window.alert('Not signed in');
      history('/loginpage');
    }
  };

  useEffect(() => {
    verifyPage();
  }, []);

  const cart = async () => {
    try {
      const res = await fetch('/displaydata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCartItems(data.cartItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode,
          city,
          streetName,
          houseNumber,
          cartItems,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log('Not Signed In');
        window.alert('Not Signed In');
      } else if (res.status === 400) {
        window.alert('Please complete all the details');
      } else {
        console.log('Order Placed');
        window.alert('Order has been placed');
        history('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addressHeading = 'Your Address';

  return (
    <>
      <img
        src={breadcrumb}
        className="img-fluid"
        style={{ height: '100px', width: '100%' }}
        alt=""
      />
      <h1 className="fw-bold text-white" style={{ position: 'relative', top: '-70px' }}>
        PLACE ORDER
      </h1>
      <div className="container mt-5 p-3 bg-light rounded shadow">
        <h2>{addressHeading}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="streetName" className="form-label">
              Street Name
            </label>
            <input
              type="text"
              className="form-control"
              id="streetName"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="houseNumber" className="form-label">
              House Number
            </label>
            <input
              type="text"
              className="form-control"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePlaceOrder()}
            disabled={cartItems.length === 0}
          >
            {cartItems.length > 0 ? 'Place Order' : 'Nothing in cart'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Customerinfo;
