import { Link } from 'react-router-dom';
import "./register.css"
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login")
    } catch (err) {
    console.log(err)
    setError(true)
    }
  };
  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
    <label>Username</label>
    <input 
     type="text"
     placeholder="Enter your username"
     className="registerInput"
     onChange={e => setUsername(e.target.value)}>
     </input>
    <label>Email</label>
    <input type="text"
     placeholder="Enter your email"
     className="registerInput"
     onChange={e => setEmail(e.target.value)}>
     </input>
    <label>Password</label>
    <input type="password"
     placeholder="Enter your password"
     className="registerInput"
     onChange={e => setPassword(e.target.value)}>
      </input>
    <button className="registerButton" type='submit'>
    <Link style={{textDecoration: "none", color:'inherit'}} to={"/register"}>
    Register
    </Link>
    </button>
    </form>
    <button className="registerLoginButton">
    <Link style={{textDecoration: "none", color:'inherit'}} to={"/login"}>
    Login
    </Link>
    </button>
    {error && <span style={{color:"red", marginTop:"10px"}}>Registration unsuccessful</span>}
    </div>
  )
}
