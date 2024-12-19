import React, { useState } from 'react';
import axios from './Api';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post('/auth/token/login/', userData);
      const token = response.data.auth_token; // Get the token from the response
      localStorage.setItem('token', token); // Store the token in localStorage
      setError(null); // Reset error state on successful login
      console.log(response.data); // Handle successful login, e.g., redirect or update UI
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className='form-container'>
      <div className='gif-frame'>
        <h4> display for gif</h4>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <span>Do not have an account? <Link to="/register">SignUp</Link></span>
      </div>
    </div>
  );
}

export default Login;
