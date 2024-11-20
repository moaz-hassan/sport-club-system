import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPlan("free");
  }, []);

  const handleChange = (setter, validationFn = null) => (e) => {
    const value = e.target.value;
    setter(value);
    if (validationFn) {
      const error = validationFn(value);
      setErrorMessage(error || "");
    }
  };

  const validateUserName = (value) => {
    if (value.length < 7) {
      return "Username should be at least 7 characters long";
    }
    return null;
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password should be at least 6 characters long";
    }
    return null;
  };

  const validateConfirmPassword = (value) => {
    if (password !== value) {
      return "The two passwords don't match";
    }
    return null;
  };

  const validateNumber = (value) => {
    const passRegex = !/^\d+$/;
    if (passRegex.test(value)) {
      return "Phone number should be numeric";
    }
    if (value.length < 10) {
      return "Phone number should be at least 10 digits long";
    }
    return null;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }
    console.log({ userName, number, email, password, plan });
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={userName}
            onChange={handleChange(setUserName, validateUserName)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="number"
            name="number"
            placeholder="Phone Number"
            value={number}
            onChange={handleChange(setNumber, validateNumber)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange(setEmail, validateEmail)}
            required
          />
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword, validatePassword)}
            required
          />
          <i
            className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            style={{
              position: "absolute",
              right: "10px",
              top: "15px",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword, validateConfirmPassword)}
            required
          />
        </div>
        <div>
          <input type="submit" value="Sign Up" disabled={!!errorMessage} />
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
