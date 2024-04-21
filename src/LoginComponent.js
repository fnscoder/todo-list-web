import React from 'react';
import UserLists from './UserLists';

export default class LoginComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          username: '', 
          password: '',
          errorMessage: null,
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      }

      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }

      handleSubmit(event) {
        const url = "http://127.0.0.1:8000/api-token-auth/"
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    this.setState({token: data.token, errorMessage: null});
                } else if (data.non_field_errors || data.detail) {
                    this.setState({errorMessage: data.non_field_errors || data.detail});
                }
            })
            .catch(error => {
                this.setState({errorMessage: "Failed to connect to the API"});
            });

        event.preventDefault();
      }

      logout(event) {
        localStorage.removeItem("token");
        this.setState({token: null});
      }

      render() {
        var token = localStorage.getItem("token");
        if (!token) {
          return (
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
                Password:
                <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
              </label>
              <input type="submit" value="Login" />
              {this.state.errorMessage && <div style={{color: 'red'}}>{this.state.errorMessage}</div>}
            </form>
          );
        };
        return (
          <div>
            <UserLists />
            <button onClick={() => this.logout()}>Logout</button>
          </div>
        );
      }
}