import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState('');

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/login',
        formdata
      );
      console.log('Login successful:', response.data);
      setLoginStatus('Login successful');
      navigate('/main');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setLoginStatus('Login failed');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form-container1'>
        <h1>
          <center className='monofett-regular1'>Login</center>
        </h1>
        <div className='mx-3 my-3'>
          <label htmlFor='userid' className='form-label1 my-1'>
            Enter Username
          </label>
          <input
            type='text'
            className='form-control'
            id='userid'
            name='username'
            value={formdata.username}
            onChange={handleChange}
          />
        </div>
        <div className='mx-3 my-3'>
          <label htmlFor='exampleInputPassword1' className='form-label1 my-2'>
            Enter Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            name='password'
            value={formdata.password}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-warning'>
          Submit
        </button>
        <p className='mx-3 my-3'>{loginStatus}</p>
      </form>
    </div>
  );
};

export default Login;