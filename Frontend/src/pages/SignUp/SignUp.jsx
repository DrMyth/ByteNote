import React, { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/helper";
import { Navbar } from "../../components/Navbar/Navbar";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance} from "../../utils/axiosInstance";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(name);

    if (!validateName(name)) {
      setError("Invalid name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email");
      console.log(email);
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password");
      return;
    }

    setError(null);

    //Api call
    console.log("Sent API call to /signup");
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      console.log(response);
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
        console.log("Navigating to dashboard")
      }
    } catch(e){
      if(e.response && e.response.data && e.response.data.message){
        setError(e.response.data.message);
      } else {  
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center transition-all duration-600 justify-center xl:mt-40 mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl mb-7 font-medium px-1">SignUp</h2>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error ? (
              <p className="text-sm text-red-500 pb-2">{error}</p>
            ) : null}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="underline text-primary font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
