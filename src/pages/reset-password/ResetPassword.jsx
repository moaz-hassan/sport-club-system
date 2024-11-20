import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ResetPassword() {
  const [email, setEmail] = useState();
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setErrorMessage("Please enter a valid email address");
    } else {
      setErrorMessage("");
    }
  };

  const handleResetCode = (e) => {
    const value = e.target.value;
    setResetCode(value);
    if (value.length < 6 || value.length > 6) {
      setErrorMessage("Please enter a valid code");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setErrorMessage("The two passwords dosen't match");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <form>
        <h2>Reset Password</h2>
        {errorMessage && (
          <div
            style={{
              color: "white",
              backgroundColor: "red",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            {errorMessage}
          </div>
        )}
        <div className="email-check">
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            onChange={(event) => {
              handleEmailChange(event);
            }}
          />

          <button
            type="button"
            className="check-email-btn"
            disabled={errorMessage ? true : false}
          >
            Check Email
          </button>
        </div>
        <input
          type="text"
          name="reset_code"
          required
          placeholder="Enter the code"
          onChange={(event) => {
            handleResetCode(event);
          }}
        />
        <div className="password-div">
          <input
            type={showPassword === true ? "text" : "password"}
            name="password"
            required
            placeholder="New Password"
            onChange={(event) => {
              handlePasswordChange(event);
            }}
          />
          <input
            type={showPassword === true ? "text" : "password"}
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            onChange={(event) => {
              handleConfirmPassword(event);
            }}
          />
          <i
            className="fa-regular fa-eye"
            style={
              showPassword === true
                ? { backgroundColor: "#ccc" }
                : { backgroundColor: "transparent" }
            }
            onClick={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
          ></i>
        </div>
        <button type="submit" disabled={errorMessage ? true : false}>
          Reset Password
        </button>
        <Link to="/login">Back to Login</Link>
      </form>
      <Footer />
    </>
  );
}

export default ResetPassword;
