import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state= {
      stuff: 'state'
    }
  }

  render() {
    return (
      <div>
       <h1>this is MAIN page</h1>
      </div>
    )
  }
}
export default Main;