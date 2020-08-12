import React, { Component } from 'react';
// import MainContainer from './containers/MainContainer.jsx';
import { Switch, Route } from 'react-router-dom';

// import Signup from './components/signup';
//import Login from './components/login';
import { Login}  from './components/login';
// import Main from './components/main'

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      stuff: 'state'
    }
  }

  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log('App.componentDidMount: ERROR: ', err));
  }

  render() {
  
    return (
      <div>
        <h1>this is APP page</h1>
        <main>
        {/* <Switch>
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route
            exact
            path="/signup"
            component={Signup}
          />
          <Route
            exact
            path="/main"
            component={Main}
          />
        </Switch> */}
        </main>
      </div>
    )
  }
}
export default App;