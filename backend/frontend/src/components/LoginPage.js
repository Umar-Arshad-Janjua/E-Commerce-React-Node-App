import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import breadcrumb from './images/breadcrumb.png';
import blog from './images/blog3.png';
import Footer from './Footer';

const LoginPage = () => {
  const [payload, dispatch] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
      console.log("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Success login");
      console.log("Success login");
      history("/");
    }
  };

  return (
    <>
      <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: "relative", top: "-70px" }}>
        LOGIN PAGE
      </h1>
      <section className='sign-in mt-0'>
        <div className='container mt-3 bg-light rounded shadow'>
          <div className='row mt-5'>
            <div className="col-md-5 mt-5 mb-5 text-center">
              <img src={blog} alt="" className='ms-auto me-auto mb-4 img-fluid' style={{ maxWidth: '100%', height: 'auto' }} />
              <Link to='/signup' className='text-decoration-none text-dark d-block mt-3'>
                Register
              </Link>
            </div>
            <div className='signin-form col-md-6 ms-auto mt-5 mb-5'>
              <h3 className='form-title mt-3' style={{ fontFamily: "sans-serif" }}>
                Sign in
              </h3>
              <form method="POST" className='register-form' id='register-form'>
                <div className="form-group ">
                  <label htmlFor="email">
                    <i className="zmdi ms-2 zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id='email'
                    required={true}
                    className="form-control border-none"
                    autoComplete='off'
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="password">
                    <i className="zmdi ms-2 zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id='password'
                    className="form-control border-none"
                    required={true}
                    autoComplete='off'
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group form-button mt-3">
                  <input
                    onClick={loginUser}
                    name="sign"
                    id="sign"
                    className='btn btn-primary '
                    value='Sign in'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default LoginPage;
