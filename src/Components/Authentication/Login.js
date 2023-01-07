import React, { useContext, useState } from "react";
import alertcontext from "../../Contexts/Alert/AlertContext";
import { useNavigate } from "react-router-dom"
import './Login.css'

const Login = () => {

  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;

  const navigate = useNavigate();

  const [credential, setcredential] = useState({ name: "", email: "", password: "" });
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  const clickhandler = async() => {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    if (json.success)
    {
      localStorage.setItem('token', json.authtoken);  
      setalert("success", "Logged In Successfully");
      navigate('/');
    }
    else
    {
      setalert("Warning", "Login Failed");
      }
  };

  return (
    <div className="text-center" style={{position:"relative",top:"60px"}}>
      <div className="my-8 text-center" style={{ display: "inline-block" }}>
        <h2 className="my-3">Login to Continue to Notes App</h2>
        <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
          <h5>Email address</h5>
        </label>
        <input
          type="email"
          name="email"
          className="form-control my-2 input"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onchange}
        />
        <label htmlFor="inputPassword2" className="mt-3">
          <h5>Password</h5>
        </label>
        <input
          type="password"
          name="password"
          className="form-control my-2 input"
          id="inputPassword2"
          placeholder="Password"
          onChange={onchange}
        />
        <div className="my-3">
          <input
            className="buttonL"
            type="submit"
            value="Login"
            onClick={clickhandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
