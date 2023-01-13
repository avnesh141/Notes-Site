import React, { useEffect,useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {

  const [data, setData] = useState(null);

  const details = async () => {


    if (localStorage.getItem("token")) {
      const response = await fetch(
        `http://localhost:5000/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      setData(json);
      console.log(data);
      console.log(json);
    }
  };
  useEffect(() => {
    details();
  }, [data])
  


  return (
    <>
      {data && (
        <div
          className="text-center"
          style={{
            display: "inline-block",
            width: "60%",
            position: "relative",
            top: "110px",
          }}
        >
          <div className="container mt-3">
            <h3 className="text-center">Profile Details</h3>
            <table className="table table-success table-striped mt-5 text-center">
              <tbody>
                <tr style={{ borderRadius: "20px" }}>
                  <td>Name</td>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <td>id</td>
                  <td>{data._id}</td>
                </tr>
                <tr>
                  <td>Registered On</td>
                  <td>{data.date}</td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <Link
            type="button"
            className="buttonAdd"
            style={{ textDecoration: "none" }}
            to="/reset"
          >
            Change Password
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
