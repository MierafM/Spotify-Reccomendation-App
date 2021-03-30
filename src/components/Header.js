import React from 'react';
import  { Component } from 'react';
import './headerStyle.css';

class Header extends Component{
  constructor() {
    super();
    this.state = {}
  }
  render(){

    return(
      <header className="appHeader">
        <div className='headerText'>
        <a href="http://localhost:8888/login">
          <h1>Recommendify</h1></a>
          <p>find song recomendations based on a song's Spotify metadata</p>
        </div>
        {/*
        <div className="searchSection">

          <input type="text" placeholder="Search songs..." name="search"/>
          <button type="submit">Search</button>

        </div>
        */}
      </header>

    );
  }

}
export default Header;
