import React, { Component } from 'react';
import queryString from 'query-string';

import Trackdetail from './Trackdetail';

import Song from './Song';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";
import { SpotifyApiContext } from 'react-spotify-api';


class App extends Component {
  constructor() {
    super();
    this.state = {}
  }
  callbackFunction = (token) =>{
    this.setState({accessToken: token})
  }
  render() {
    return (

        <div className="App">
          <header style={{backgroundColor:'#343434', color:'white'}}className="App-header">
            <h1 style={{backgroundColor:'#343434', marginTop:'0px'}}>Spotify Reccomendations</h1>
            <p style={{paddingBottom:'2%'}}>find song reccomendations based on a song's metadata</p>
          </header>
          <Main parentCallback={this.callbackFunction}/>
        </div>

    );
  }
}

class Main extends Component{
  constructor() {
    super();
    this.state = {}
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
        this.setState({
          recent: data.items.map(item => ({
            title: item.track.name,
            artist: item.track.artists[0].name,
            image:item.track.album.images[0],
            id: item.track.id,
            preview:item.track.preview_url
          }))
        })
      })
        this.props.parentCallback(this.access)
  }

  render(){

    return(

        <div className="App">
          {this.state.user ?
            <div >
              <h2 style={{width: '50%'}}>{this.state.user && this.state.user.name}'s Recently Played </h2>

            </div>
            :<button onClick={() => window.location='http://localhost:8888/login'}>sign in with spotify</button>
          }

          {this.state.recent ?
            <div className='Recent-songs'>
              {this.state.recent.map(song =>  <Song song={song}/>)}
            </div>
            :<p>searching for recently played</p>
          }
        </div>

    );

  }
}

export default App;
