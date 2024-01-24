import React, { useState } from 'react';
import breadcrumb from './images/breadcrumb.png';
import { getVegetablesData } from './VegetablesData';
import { getFruitsData } from './FruitsData';
import { getMeatData } from './MeatData';
import { getBerriesData } from './BerriesData';
import Footer from './Footer';

const Shop = () => {
  const [Vdata] = useState(getVegetablesData());
  const [Fdata] = useState(getFruitsData());
  const [Mdata] = useState(getMeatData());
  const [Bdata] = useState(getBerriesData());
  const [CartItemsData, setCartItemsData] = useState({ title: "", price: null });

  const handleSubmit = async (title, price) => {
    console.log(title, price);
    try {
      const res = await fetch("/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status !== 201 || res.status === 401 || !data) {
        console.log("Not Signed In");
        window.alert('Not Signed In');
        // Handle UI state accordingly
      } else {
        console.log("Added To Cart");
        window.alert('Added to cart');
        // Handle UI state accordingly
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert('Not Signed In');
      // Handle error state
    }
  };

  return (
    <div>
       <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: "relative", top: "-70px" }}>OGANI SHOP</h1>
      <div className="container d-flex mb-0">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item mt-5" style={{ width: '200px' }}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button text-dark" style={{ background: '#7fad39' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                All Departments
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <ul className="list-group">
                <a href="#scrollspyHeading3" className="list-group-item list-group-item-action">Fresh Meat</a>
                <a href="#scrollspyHeading1" className="list-group-item list-group-item-action">Vegetables</a>
                <a href="#scrollspyHeading2" className="list-group-item list-group-item-action">Fruit and nut gifts</a>
                <a href="#scrollspyHeading4" className="list-group-item list-group-item-action">Fresh Berries</a>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <section id="scrollspyHeading1">
            <h2 className="fw-bolder ms-5 mt-5">Vegetables</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ms-5">
              {Vdata.map((d, index) => (
                <div key={index} className="col mb-3">
                  <div className="card">
                    <img src={d.pic} className="card-img-top" alt="..." style={{ height: '210px' }} />
                    <div className="card-body">
                      <p className="fs-4 fw-bold mt-2">{d.title}</p>
                      <p className="fs-4 fw-bold mt-2">{d.price}$</p>
                      <button type='button' className='btn btn-danger' onClick={() => handleSubmit(d.title, d.price)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />

          <section id="scrollspyHeading2">
            <h2 className="fw-bolder ms-5 mt-5">Fruits</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ms-5">
              {Fdata.map((d, index) => (
                <div key={index} className="col mb-3">
                  <div className="card">
                    <img src={d.pic} className="card-img-top" alt="..." style={{ height: '210px' }} />
                    <div className="card-body">
                      <p className="fs-4 fw-bold mt-2">{d.title}</p>
                      <p className="fs-4 fw-bold mt-2">{d.price}$</p>
                      <button type='button' className='btn btn-danger' onClick={() => handleSubmit(d.title, d.price)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />

          <section id="scrollspyHeading3">
            <h2 className="fw-bolder ms-5 mt-5">Meat</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ms-5">
              {Mdata.map((d, index) => (
                <div key={index} className="col mb-3">
                  <div className="card">
                    <img src={d.pic} className="card-img-top" alt="..." style={{ height: '210px' }} />
                    <div className="card-body">
                      <p className="fs-4 fw-bold mt-2">{d.title}</p>
                      <p className="fs-4 fw-bold mt-2">{d.price}$</p>
                      <button type='button' className='btn btn-danger' onClick={() => handleSubmit(d.title, d.price)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />

          <section id="scrollspyHeading4">
            <h2 className="fw-bolder ms-5 mt-5">Berries</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ms-5">
              {Bdata.map((d, index) => (
                <div key={index} className="col mb-3">
                  <div className="card">
                    <img src={d.pic} className="card-img-top" alt="..." style={{ height: '210px' }} />
                    <div className="card-body">
                      <p className="fs-4 fw-bold mt-2">{d.title}</p>
                      <p className="fs-4 fw-bold mt-2">{d.price}$</p>
                      <button type='button' className='btn btn-danger' onClick={() => handleSubmit(d.title, d.price)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
