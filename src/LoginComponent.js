import React, { useState } from 'react';
import UserLists from './UserLists';

export default function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8000/api-token-auth/";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setErrorMessage(null);
        } else if (data.non_field_errors || data.detail) {
          setErrorMessage(data.non_field_errors || data.detail);
        }
      })
      .catch(error => {
        setErrorMessage("Failed to connect to the API");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={username} onChange={handleChangeUsername} />
          Password:
          <input type="password" value={password} onChange={handleChangePassword} />
        </label>
        <input type="submit" value="Login" />
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      </form>
    );
  }

  return (
    <div>
      <UserLists />
      <button onClick={logout}>Logout</button>
    </div>
  );
}