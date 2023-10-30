import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Check if the email matches the format: "gmail.com"
    return /@gmail\.com$/.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    // Check if the phone number is exactly 10 digits
    return /^\d{10}$/.test(phone);
  };

  const isPasswordValid = (password) => {
    // Check if the password is at least 8 characters and at most 12 characters
    return password.length >= 8 && password.length <= 12;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone || !address || !answer) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please use a valid Gmail email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error("Password must be between 8 and 12 characters.");
      return;
    }

    if (!isPhoneNumberValid(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="nameInput"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="emailInput"
              placeholder="Enter Your Gmail Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                if (e.target.value.length <= 12) {
                  setPassword(e.target.value);
                }
              }}
              className="form-control"
              id="passwordInput"
              placeholder="Enter Your 8-12 character Password"
              maxLength="12"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                if (numericValue.length <= 10) {
                  setPhone(numericValue);
                }
              }}
              className="form-control"
              id="phoneInput"
              placeholder="Enter Your 10-digit Phone Number"
              maxLength="10"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="addressInput"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answerInput"
              placeholder="What is Your Favorite Sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register