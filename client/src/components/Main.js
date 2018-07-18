import React, { Component } from 'react';
const blue ={
  color: 'blue'
}
const red ={
  color: 'red'
}
const green ={
  color: 'green'
}

class Main extends Component {
  render() {
    return (
      <div>
      <h1 style={blue}>Welcome to SuperHeroes Number picker!</h1>
      <p></p>
      <h3 style={green}>This Page Can Help You Search Your Favourite Heroes in all types of comics</h3>
      <p></p>
</div>
    );
  }
}

export default Main;
