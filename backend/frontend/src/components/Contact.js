import React, {useState, useContext, useEffect} from 'react';
import breadcrumb from './images/breadcrumb.png';
import { FaPhoneAlt, FaLocationArrow, FaBusinessTime, FaMailBulk } from 'react-icons/fa';
import Footer from './Footer';
import { UserContext } from '../App';
const Contact = () => {
  const [message, setMessage] = useState('');
  const contextValue = useContext(UserContext);
  const [state, payload, dispatch] = contextValue;
  const [isLogin, setIsLogin] = useState(false);
  const handleSubmit = async () => {
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log("Message sent successfully");
        window.alert('message has been sent')
        // You can perform additional actions on success
      } else if (res.status === 422) {
        console.log("Error sending message");
        window.alert('Textbox is empty')
        // Handle error state
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error state
    }
  };


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
  return (
    <div>
       <img src={breadcrumb} className="img-fluid" style={{height:'100px' , width:'100%'}} alt="" />
      <h1 className="fw-bold text-white" style={{ position: "relative", top: "-70px" }}>CONTACT US</h1>

      <div className="row">
        <div className="col-md-3 fs-2" ><FaPhoneAlt /><br /> PHONE <br /><span className='fs-6'>+01-3-8888-6868</span></div>
        <div className="col-md-3 fs-2" ><FaLocationArrow /><br /> ADDRESS <br /><span className='fs-6'>60-49 Road 11378 New York</span></div>
        <div className="col-md-3 fs-2" ><FaBusinessTime /><br /> OPEN TIME <br /><span className='fs-6'>10:00 am to 23:00 pm</span></div>
        <div className="col-md-3 fs-2" ><FaMailBulk /><br /> EMAIL <br /><span className='fs-6'>hello@ogani.com</span></div>
      </div>
      {isLogin ? (
        <>
        
      <div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <textarea
            className="form-control"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      </div>
        </>
      ) : (
        <>
        
      <div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <textarea
            className="form-control"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <button
            className="btn btn-primary"
           disabled
          >
            Not Logged In
          </button>
        </div>
      </div>
      </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Contact;
