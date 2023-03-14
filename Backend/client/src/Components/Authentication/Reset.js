import React, { useContext, useState } from "react";
import alertcontext from "../../Contexts/Alert/AlertContext";
import { Link, useNavigate } from "react-router-dom";


const Reset = () => {
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;
    const navigate = useNavigate();
    
const host = process.env.REACT_APP_KEY;  
  const [Credentials, setCredentials] = useState({
    password: "",
    confirmpassword: "",
  });
  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  const Submithandler = async () => {
    if (Credentials.password === Credentials.confirmpassword) {
      const response = await fetch(`/api/auth/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(Credentials),
      });
        const json = await response.json();
      console.log(json);
        setalert("SUCCESS", "Password Updated SuccessFully  Login Again to continue");
        // localStorage.removeItem('token');
        navigate('/profile');
    } else {
        setalert("WARNING", "Password and Confirm Password do not match");
    }
  };
  return (
    <div style={{display:"inline-block",width:"60%",position:"relative",top:"110px"}}>
      <h1>Reset Password</h1>
      <form >
        <div className="form-group text-center">
          <label for="exampleInputPassword1" className="mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control mt-3 inputN"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onchange}
            style={{margin:"auto"}}
          />
          <label for="exampleInputPassword1" className="mt-3">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control mt-3 inputN"
            name="confirmpassword"
            id="exampleInputPassword2"
            placeholder="Confirm Password"
            onChange={onchange}
            style={{margin:"auto"}}
          />
        </div>
        <div className="text-center">
          <Link type="submit" className="buttonAdd mt-3" style={{textDecoration:"none"}} onClick={Submithandler}>
            Reset
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
