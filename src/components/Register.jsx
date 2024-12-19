import React, { useState } from "react";
import axios from './Api';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      re_password: confirmPassword, 
    };

    try {
      const response = await axios.post("http://localhost:8000/users/", userData);
      setSuccess("Registration successful! Please check your email to confirm.");
      setError(null); // Reset error state on successful registration
      console.log(response.data); // Handle additional actions as needed
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="gif-frame">
        <h4>GIF-GOES HERE</h4>
      </div>
      <div className="register-container">
        <h2>Signup</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>User Email:</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
          {/* <span>Already have an account? <Link to="/login">Login</Link></span> */}
        </form>
      </div>
    </div>
  );
}

export default Register;