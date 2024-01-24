import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import lambImage from './images/lamb.png';
import axios from 'axios';
import breadcrumb from './images/breadcrumb.png';
import blog2 from './images/blog4.png'
import Footer from './Footer';
const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  });

  let name;
  let value;
  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
        }),
      });
      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert('Invalid registration');
        console.log('Invalid registration');
      } else {
        window.alert('Success registration');
        console.log('Success registration');
        history('/loginpage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
       <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: 'relative', top: '-70px' }}>
        REGISTER
      </h1>
      <section className="signup mt-0">
        <div style={{ width: '70%', height: 'auto' }} className="container mt-3 bg-light rounded shadow">
          <div className="signup-content row">
            <div className="signup-form col-md-6 mb-5">
              <h3 className="form-title mt-3" style={{ fontFamily: 'sans-serif' }}>
                Sign up
              </h3>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account ms-2 materials-icon-name me-1"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control border-none"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInput}
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="email">
                    <i className="zmdi ms-2 zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control border-none"
                    autoComplete="on"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="phone">
                    <i className="zmdi ms-2 zmdi-phone"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="form-control border-none"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Enter phone"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="work">
                    <i className="zmdi ms-2 zmdi-slideshow"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    className="form-control border-none"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInput}
                    placeholder="Profession"
                  />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password">
                    <i className="zmdi ms-2 zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control border-none"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi ms-2 zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    className="form-control border-none"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInput}
                    placeholder="Confirm password"
                  />
                </div>
              <button className='btn btn-success mt-5' onClick={PostData}> Register</button>
                {/* <div className="form-group form-button mb-5">
                  <input
                    type="submit"
                    
                    name="signup"
                    id="signup"
                    className="btn btn-primary"
                    value="Register"
                  />
                </div> */}
              </form>
            </div>
            <div className="col-md-5 mt-5 mb-5" style={{ maxWidth: '100%', height: 'auto' }}>
              <img
                src={blog2}
                alt=""
                className="ms-5 mt-5 mb-4 img-fluid rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <br />
              <Link to="/loginpage" className="ms-5 mt-5 text-decoration-none text-dark btn btn">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Signup;
