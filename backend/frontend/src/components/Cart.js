import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import CustomerInfo from './CustomerInfo';
import { Link } from "react-router-dom";
import breadcrumb from './images/breadcrumb.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = async () =>{
    try{
      const res = await fetch('/displaydata', {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        },

      });
      const data  = await res.json();
      setCartItems(data.cartItems)

    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (title, price) => {
    try {
      const res = await fetch('/deleteItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, price }),
      });
  
      if (res.ok) {
        // If deletion is successful, update the cart
        cart();
      } else {
        console.log('Failed to delete item');
      }
    } catch (err) {
      console.log(err);
    }
  };
 

  useEffect(()=>{
    cart()
  }, [])

  const handleDeleteCartItems = async () => {
    try {
      const response = await fetch('/clearcart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include the user's token here if your server requires authentication
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        cart()
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const newTotalPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      setTotalPrice(newTotalPrice);
    };
  
    calculateTotalPrice();
  }, [cartItems]);


  return (
    <div>
      <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: "relative", top: "-70px" }}>OGANI CART</h1>

      <div className='container'>
      
        <div className="row">
          <h2 className='fw-bold' >Total ITEMS:{cartItems.length}</h2>
          <h2 className='fw-bold' >Total Price:{totalPrice}</h2>

          {cartItems.map(cartitem => (
            <div key={cartitem._id}>
              <div className="card w-75 container p-3">
                <div className="card-body p-3">
                  <h5  className="card-title fw-bold">Title:{cartitem.title}</h5>
                  <p  className="card-text fw-bold">Price:{cartitem.price}$</p>
                  <button className="btn btn-danger" onClick={()=>handleDelete(cartitem.product, cartitem.price)} >Delete</button>
                </div>
              </div>
            </div>
          ))}
          <div>


          {cartItems.length > 0 ? (
            <>
            
        <Link className='me-2' to="/customerinfo">
          <button className="btn btn-success mt-5">Check Out</button>
        </Link>
        
          <button className="btn ms-2 btn-danger mt-5" onClick={handleDeleteCartItems}>Clear All</button>
      
        </>
      ) : (
       <div className='container'>
       <button className="btn btn-success mt-5" disabled>Check Out</button>
       <button className="btn ms-2 btn-success mt-5" disabled onClick={handleDeleteCartItems}>Clear All</button>
       </div>
        
     
      )}
      </div>
      
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
