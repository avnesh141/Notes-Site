import React, { useContext, useState } from "react";
import alertcontext from "../../Contexts/Alert/AlertContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;

const host = process.env.REACT_APP_KEY;
  const navigate = useNavigate();

  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  const clickhandler = async () => {
    const response = await fetch(`/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      console.log(json);
      setalert("success", "User Signed in SuccessFully");
      navigate("/");
    } else {
      setalert("Warning", "Sign in Failed");
    }
  };
  return (
    <div className="text-center" style={{ position: "relative", top: "110px" }}>
      <div
        className="my-3 text-center inputBoxes"
        
      >
        <label htmlFor="exampleFormControlInput1" className="form-label">
          <h5>Name</h5>
        </label>
        <input
          type="name"
          name="name"
          className="form-control  input"
          style={{ margin: "auto" }}
          id="exampleFormControlInput1"
          placeholder="avnesh"
          onChange={onchange}
        />
        <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
          <h5>Email address</h5>
        </label>
        <input
          style={{ margin: "auto" }}
          type="email"
          name="email"
          className="form-control input"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onchange}
        />
        <label htmlFor="inputPassword2" className="mt-3">
          <h5>Password</h5>
        </label>
        <input
          style={{ margin: "auto" }}
          type="password"
          name="password"
          className="form-control  input"
          id="inputPassword2"
          placeholder="Password"
          onChange={onchange}
        />
        <label htmlFor="inputPassword3" className="mt-3">
          <h5> Confirm Password</h5>
        </label>
        <input
          style={{ margin: "auto" }}
          type="password"
          name="password"
          className="form-control  input"
          id="inputPassword3"
          placeholder="Confirm Password"
          onChange={onchange}
        />
        <div className="my-3">
          <input
            className="buttonR"
            type="submit"
            value="Register"
            onClick={clickhandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
