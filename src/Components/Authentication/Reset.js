import React, { useContext, useState } from "react";
import alertcontext from "../../Contexts/Alert/AlertContext";
import { Link, useNavigate } from "react-router-dom";


const Reset = () => {
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;
    const navigate = useNavigate();
    
  const [Credentials, setCredentials] = useState({
    password: "",
    confirmpassword: "",
  });
  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  const Submithandler = async () => {
    if (Credentials.password === Credentials.confirmpassword) {
      const response = await fetch(`http://localhost:5000/api/auth/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(Credentials),
      });
        const json = await response.json();
        setalert("SUCCESS", "Password Updated SuccessFully  Login Again to continue");
        // localStorage.removeItem('token');
        navigate('/profile');
    } else {
        setalert("WARNING", "Password and Confirm Password do not match");
    }
  };
  return (
    <div>
      <form >
        <div class="form-group">
          <label for="exampleInputPassword1" className="mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control mt-3"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onchange}
          />
          <label for="exampleInputPassword1" className="mt-3">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control mt-3"
            name="confirmpassword"
            id="exampleInputPassword2"
            placeholder="Confirm Password"
            onChange={onchange}
          />
        </div>
        <div className="text-center">
          <Link type="submit" className="btn btn-primary mt-3" onClick={Submithandler}>
            Reset
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
