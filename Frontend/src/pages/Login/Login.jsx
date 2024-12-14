import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { validateEmail, validatePassword } from "../../utils/helper";
import { axiosInstance } from "../../utils/axiosInstance";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if(localStorage.getItem("token")){
      navigate("/dashboard");
    }
    
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password");
      return;
    }

    setError(null);

    //Api call
    console.log("Sent API call to /login");
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later!");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center xl:mt-40 mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl mb-7 font-medium px-1">Login</h2>

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
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="underline text-primary font-medium">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
