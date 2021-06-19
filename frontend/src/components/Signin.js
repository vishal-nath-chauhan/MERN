import React, { useState } from "react";
import "./css/signup.css";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [load, setLoad] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    setLoad(true);
    await axios
      .post("/signin", JSON.stringify({ email, password }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoad(false);
      })
      .catch((err) => {
        console.log("Login failed ", err);
        setLoad(false);
      });
  };
  return (
    <div>
      <Navbar />

      {load ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={500}
          width={500}
          style={{ marginTop: "100px" }}
        />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="card card-signin flex-row my-5">
                <div className="card-img-left d-none d-md-flex"></div>
                <div className="card-body">
                  <h5 className="card-title text-center">SignIn</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        value={password}
                        id="inputPassword"
                        autoComplete="off"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase mt-3"
                      type="submit"
                      onClick={(e) => sendData(e)}
                    >
                      Submit
                    </button>
                    <br />

                    <label className="mt-5">
                      New User? <NavLink to="/signup">Sign Up Here</NavLink>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
