import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <form className="form-container">
        <div className="centered">
          <h1 className="page-title monofett-regular">PLANIFY</h1>
          <div className="button-container">
            <Link to="/login" className="link-style">
              <button type="submit" className="btn btn-lg btnLogin">Login</button>
            </Link>
            <Link to="/register" className="link-style">
              <button type="submit" className="btn btn-lg btnRegister">Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
