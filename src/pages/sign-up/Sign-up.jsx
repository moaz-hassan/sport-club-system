/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ApiReq from "../../hooks/apiReq";
import store from "../../components/store";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPlan("free");
  }, []);

  function signUpRequest() {
    console.log(store.getState());
    if (store.getState().resObj.status === "Success") {
      ApiReq("api/signup", "POST", {
        userName: userName,
        password: password,
        number: number,
        birthDate: birthDate,
        email: email,
      });
    }
  }
  const handleRequestCode = async () => {
    try {
      await ApiReq("api/request-otp", "POST", null, { email: email });
    } catch (error) {
      console.error("Error occurred while requesting OTP:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await ApiReq("api/verify-otp", "POST", null, {
        email: email,
        otpCode: otpCode,
      });
    } catch (error) {
      console.error("Error occurred while requesting OTP:", error);
    }
  };

  const handleChange =
    (setter, validationFn = null) =>
    (e) => {
      const value = e.target.value;
      setter(value);
      if (validationFn) {
        const error = validationFn(value);
        setErrorMessage(error || "");
      }
    };

  const validateUserName = (value) =>
    value.length < 7 ? "Username should be at least 7 characters long" : null;
  const validatePassword = (value) =>
    value.length < 6 ? "Password should be at least 6 characters long" : null;
  const validateConfirmPassword = (value) =>
    password !== value ? "The two passwords don't match" : null;
  const validateNumber = (value) => {
    if (!/^\d+$/.test(value)) return "Phone number should be numeric";
    if (value.length < 10)
      return "Phone number should be at least 10 digits long";
    return null;
  };
  const validateEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ? null
      : "Please enter a valid email address";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) return;
    console.log({ userName, number, email, password, plan });
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="sign-up-form" action="/">
        <h2>Sign Up</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {[
          {
            id: "username",
            label: "Username",
            value: userName,
            setValue: setUserName,
            validate: validateUserName,
            type: "text",
          },
          {
            id: "email",
            label: "Email Address",
            value: email,
            setValue: setEmail,
            validate: validateEmail,
            type: "email",
          },
          {
            id: "number",
            label: "Phone Number",
            value: number,
            setValue: setNumber,
            validate: validateNumber,
            type: "text",
          },
          {
            id: "birthdate",
            label: "Birth Date",
            value: birthDate,
            setValue: setBirthDate,
            type: "date",
          },
        ].map(({ id, label, value, setValue, validate, type }) => (
          <div key={id} className="input-container">
            <input
              type={type}
              id={id}
              value={value}
              onChange={handleChange(setValue, validate)}
              required
              placeholder=" "
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
        <div
          className="input-container"
          style={{ display: "flex", gap: "10px" }}
        >
          <input
            type="number"
            id="otp-code"
            value={otpCode}
            onChange={handleChange(setOtpCode, validatePassword)}
            required
            placeholder=" "
          />
          <label htmlFor="otp-code">Code</label>
          <button
            onClick={() => {
              handleRequestCode();
            }}
            type="button"
            className="otp-btn"
          >
            Get Code
          </button>
          <button
            onClick={() => {
              handleVerifyCode();
            }}
            type="button"
            className="otp-btn"
          >
            Verify Code
          </button>
        </div>

        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handleChange(setPassword, validatePassword)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
          <i
            className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-100%)",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword, validateConfirmPassword)}
            required
            placeholder=" "
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <div>
          <button
            onClick={() => {
              signUpRequest();
            }}
            type="button"
            value="Sign Up"
            disabled={!!errorMessage}
          >
            Sign up
          </button>
        </div>
        <div>
          <Link to="/Login">Already have an account? Login</Link>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default SignUp;
