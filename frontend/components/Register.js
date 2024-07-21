import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {

  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [data, setData] = useState('');

  console.log('name', name);
  console.log('pw', pw);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newUser = {
        username: name,
        password: pw,
      };
      const response = await axios.post('http://localhost:8000/users', newUser);
      console.log('User is Created', response.data);
      setData('User created')
      setName('')
      setPw('')
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='register'>
        <form onSubmit={handleSubmit} className='form-container2'>
            <h2><center className='monofett-regular2'>Register</center></h2>
            <div className="mx-3 my-3">
                <label htmlFor="userid" className="form-label2">Create a Username</label>
                <input type="text" className="form-control my-2" id="userid" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mx-3 my-3">
                <label htmlFor="exampleInputPassword1" className="form-label2">Create a Password</label>
                <input type="password" className="form-control my-2" id="exampleInputPassword1" value={pw} onChange={(e) => setPw(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-warning mx-3">Create account</button>
            <p className="mx-3 my-3">{data}</p>
        </form>
    </div>
  )
}

export default Register