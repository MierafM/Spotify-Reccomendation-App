import React, { Component } from 'react';
import queryString from 'query-string';
import Trackdetail from './Trackdetail';
import Song from './Song';
import Header from './Header';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";
import { SpotifyApiContext } from 'react-spotify-api';

class App extends Component{
  constructor() {
    super();
    this.state = {}
  }
  callbackFunction = (token) =>{
    this.setState({accessToken: token})
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    this.access = accessToken
    sessionStorage.setItem('myTokenName', this.access)
    console.log(this.access)
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data =>
      this.setState({
        user: { name: data.display_name}
      }
    ))

    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data =>
      {data &&
        console.log(data);
        this.setState({
          recent: data.items.filter(item => item.track.preview_url)
          .map(item => ({
            title: item.track.name,
            artist: item.track.artists[0].name,
            image:item.track.album.images[0],
            id: item.track.id,
            preview:item.track.preview_url
          }))
        })
      })
        //this.props.parentCallback(this.access)
  }

  render(){

    return(


        <div className="appDiv">
          <Header/>
          {/*calls the main component here and executes a function that saves the accesstoken */}
          {/*<Main parentCallback={this.callbackFunction}/>*/}

          {this.state.user ?
            <div className="nameDisplay">
              <h2>{this.state.user && this.state.user.name}'s Recently Played </h2>

            </div>
            :<button className="signInButton" onClick={() => window.location='http://localhost:8888/login'}>sign in with spotify</button>
          }
          {this.state.recent ?
            <div className='RecentSongs'>
              {this.state.recent.map(song =>

                <Song song={song}/>
              )}
            </div>
            :<p className='loadingMessage'>searching for recently played...</p>
          }
        </div>

    );

  }
}

export default App;
