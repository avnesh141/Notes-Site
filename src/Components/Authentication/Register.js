import React, { useContext, useState } from "react";
import alertcontext from "../../Contexts/Alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;

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
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      console.log(json);
      setalert("success", "User Signed in SuccessFully");
      navigate("/");
    } else {
      setalert("warning", "Sign in Failed");
    }
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="name"
          name="name"
          className="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="avnesh"
          onChange={onchange}
        />
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control my-3"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={onchange}
        />
        <label htmlFor="inputPassword2">Password</label>
        <input
          type="password"
          name="password"
          className="form-control my-3"
          id="inputPassword2"
          placeholder="Password"
          onChange={onchange}
        />
        <label htmlFor="inputPassword3">Confirm Password</label>
        <input
          type="password"
          name="password"
          className="form-control my-3"
          id="inputPassword3"
          placeholder="Confirm Password"
          onChange={onchange}
        />
        <div className="my-3">
          <input
            className="btn btn-primary my-3"
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
