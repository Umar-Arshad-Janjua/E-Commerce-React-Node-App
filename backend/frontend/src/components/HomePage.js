import React, { useEffect, useState } from 'react';
import breadcrumb from './images/breadcrumb.png';
import banner from './images/banner.png';
import Footer from './Footer';
import { getData } from './CardData';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
  const [data] = useState(getData());
  const [username, setUsername] = useState('');

  const userHomepage = async () => {
    try {
      const res = await fetch('/displaydata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userData = await res.json();
      console.log(userData);
      setUsername(userData.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomepage();
  }, []);

  return (
    <>
      <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: "relative", top: "-70px" }}>OGANI HOME</h1>

      {username && (
        <div className='border border-success container p-3 mb-5'>
          <h1>Welcome: {username}</h1>
        </div>
      )}

      <div className="container mt-3">
        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button color-success text-dark"
                style={{ background: '#7fad39' }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                All Departments
              </button>
            </h2>
            <div 
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <ul className="list-group">
                <Link to="./shop" className="list-group-item">
                  Fresh Meat
                </Link>
                <Link to="./shop" className="list-group-item">
                  Vegetables
                </Link>
                <Link to="./shop" className="list-group-item">
                  Fruit and nut gifts
                </Link>
                <Link to="./shop" className="list-group-item">
                  Fresh Berries
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 p-5 mb-5 ">
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid mt-3"
              src={banner}
              alt="alt text"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
          <div className="col-md-6 mt-3">
            <h2 className="fs-4 fw-bold" style={{ color: "#7fad39" }}>
              Fruit Fresh
            </h2>
            <h2 className="fs-1 fw-bolder" style={{ color: "black" }}>
              {props.banner}Vegetables
              <br />
              100% Organic
              <br />
              <span className="fs-5">Free Pickup and delivery available</span>
            </h2>
            <Link
              className="btn btn-outline-success hover mt-3" style={{background:''}}
              to="./shop"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {data.map((d, index) => (
            <div key={index} style={{}} className="col-lg-3 col-md-4 mb-3">
              <Link style={{color:'black'}} to="/shop" className="text-decoration-none">
                <img src={d.pic} style={{height:'90%'}} className="card-img-top" alt="..." />
                <div className="mt-2">
                  <p className="fw-bold fs-5">{d.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
