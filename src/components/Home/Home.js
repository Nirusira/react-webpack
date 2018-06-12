import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.data) {
          this.setState({ users: response.data });
        }
      });
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.users.length > 0 &&
            this.state.users.map((val, index) => (
              <li key={index}>{val.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Home;
