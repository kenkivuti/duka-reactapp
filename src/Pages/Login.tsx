import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure FontAwesome CSS is imported
import "../Styles/login.css";
import url from "../config";

function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  type AuthType = {
    username: string;
    password: string;
  };

  type ResponseData = {
    access_token: string;
    message: string;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formContent: AuthType = {
      username: username,
      password: password,
    };

    try {
      const apiUrl = `${url}/login`;
      const response = await axios.post(apiUrl, formContent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Done: ", response);

      const responseData: ResponseData = {
        ...response.data,
      }
      console.log("Done....", responseData);
      localStorage.setItem("Token", responseData.access_token);
      console.log('Navigating to Dashboard');
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <MDBContainer fluid className="p-3 my-5 h-custom">
    <form onSubmit={handleSubmit}> 
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size="lg" tag="a" className="me-2" href="https://www.facebook.com">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn floating size="lg" tag="a" className="me-2" href="https://www.twitter.com">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn floating size="lg" tag="a" className="me-2" href="https://www.linkedin.com">
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            type="username"
            name="name"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            type="password"
            name="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="lg"
          />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" type="submit">
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
              <a href="/Register" className="link-danger">
                Register
              </a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>
          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="mx-3"
            style={{ color: "white" }}
          >
            <MDBIcon fab icon="linkedin-in" size="sm" />
          </MDBBtn>
        </div>
      </div>
    </form>
  </MDBContainer>
  );
}

export default Login;
