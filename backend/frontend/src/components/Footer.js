import React from 'react';
import logo from './images/logo.png';

const Footer = () => {
  return (
    <div>
      <div className="mt-5" style={{ backgroundColor: "#F3F6FA" }}>
        <img src={logo} alt="" className='mt-4' />
        <p style={{ fontFamily: "cairo" }} className='fw-bold'>Address: 60-49 Road 11378 New York</p>
        <p style={{ fontFamily: "cairo" }} className='fw-bold'>Phone: +65 11.188.888</p>
        <p style={{ fontFamily: "cairo" }} className='fw-bold'>Email: hello@colorlib.com</p>
        <p className="fs-4 mt-5" style={{ fontFamily: "cairo" }}>© All Rights Reserved by <a style={{ textDecoration: 'none' }} href="#">OGANI<i className="fa fa-love"></i></a></p>
      </div>
    </div>
  );
}

export default Footer;
