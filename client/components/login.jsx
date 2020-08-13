import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      stuff: 'state'
    }
  }

  handleLogin(e) {
    e.preventDefault();
    // const datog(JSON.stringify(data))
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log({ username, password , yes: '1'})

    fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => console.log('this is data: ' + data))
    .catch(err => console.log('errorrr: ' + err))

    // get the results of the fetch (API call... don't do redirect there...should status..)
    // if login successful then redirect (happy)
    // if loging failed rethen redirect (sad)
  }

  render() {
    return (
      <div>
        <h1>PLEASE LOGIN!</h1>

        {/* <span>Username: </span>
        <input type="text" id="username"></input>
        <br></br>
        <span>Password: </span>
        <input type="text" id="password"></input>

        <div>
          <button type="button" className="loginButton"
            // onClick={login}
          >Submit</button>
        </div> */}

        {/* <form >
          <label htmlFor="username">Enter username: </label>
          <input id="username" name="username" type="text" required/>
          <br />
          <label htmlFor="password">Enter password: </label>
          <input id="password" name="password" type="text" required/>
          <br />
          <button onClick={this.handleLogin}>login!</button>
        </form> */}

        <form onSubmit={this.handleLogin}>
          <label>
            username:
          <input type="text" id='username' />
          </label>
          <label>
            password:
          <input type="text" id='password' />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/signup" className="signupLink">
          <button>
            Sign up
          </button>
        </Link>
      </div>
    )
  }
}
export default Login;