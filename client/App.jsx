import React, { Component } from 'react';
// import MainContainer from './containers/MainContainer.jsx';

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
        {/* <MainContainer/> */}
        <h1>hello world !!</h1>
        <h2>{this.state.stuff}</h2>
      </div>
    )
  }
}
export default App;