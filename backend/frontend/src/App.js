
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Signup from './components/Signup';
import Logout from './components/Logout';
import "./styles.css";
import Header from './components/Header';
import Footer from './components/Footer';
import 'jquery/dist/jquery.slim'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm'

import "./styles.css";

import HomePage from './components/HomePage';
import Shop from './components/Shop';
import Pages from './components/Pages';
import Blogs from './components/Blog';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage'
import CustomerInfo from './components/CustomerInfo';
import Cart from './components/Cart';
import './styles.css';
import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UseReducer';
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Router>
       <Header />
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/blog' element={<Blogs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/pages' element={<Pages />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/loginpage' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/customerinfo' element={<CustomerInfo />} />
          
        </Routes>
    </Router >
  )

}

const App  = () => {  
const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    
    <div style={{font:'BEBAS'}} className='App'>
      <UserContext.Provider value = {[state, dispatch]} >
      <Routing/>
      </UserContext.Provider>
        
    </div>
  );
}



export default App;
