import React, { Component } from 'react';
import {App, Main} from './App';
import queryString from 'query-string';

import  {useState, useContext} from "react";
import Song from './Song';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class Detail extends Component {
  
  constructor() {
    super();
    this.state = {}
  }
  callbackFunction = (token) =>{
    this.setState({accessToken: token})
  }
  componentDidMount(){
      let parsed = queryString.parseUrl(window.location.pathname);
      let id= parsed.url.toString().slice(1)
      let token = sessionStorage.getItem('myTokenName')
      console.log(token)
    fetch('https://api.spotify.com/v1/tracks/'+id, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
      .then(data => {data &&
        this.setState({
          song:{
            artist: data.artists[0].name,
            name: data.name,
            popularity: data.popularity,
            album_name: data.albumName,
            image: data.album.images[0],
            preview: data.preview_url
          }
        })
      })
    fetch('https://api.spotify.com/v1/audio-features/'+id, {
      headers: {'Authorization': 'Bearer ' + token}
    })
      .then(response => response.json())
      .then(data => {data &&
        this.setState({
          features:{
            acousticness: data.acousticness,
            danceability: data.danceability,
            energy: data.energy,
            liveness: data.liveness,
            loudness: data.loudness,
            valence: data.valence,
            tempo: data.tempo,
            key:data.key
          }
        })
        console.log(data)
        return fetch('https://api.spotify.com/v1/recommendations?seed_tracks='+data.id
        +'&target_energy='+data.energy+'&target_danceability='+data.danceability
        +'&target_tempo='+data.tempo+'&target_key='+data.key+'&target_valence='+data.valence, {
          headers: {'Authorization': 'Bearer ' + token}
        })})
      .then(response => response.json())
      .then(data =>
        {data &&
          this.setState({
            reccomendations: data.tracks.map(item => ({
              title: item.name,
              id: item.id,
              artist:item.artists[0].name,
              image:item.album.images[0],
              preview:item.preview_url
            }))
      })}
    )

    console.log(this.state)


  }


  render() {
    console.log(this.state)
    return (
    <div>
    <div style={{top:'0', left:'0', width:'25%', height:'100%', position:'fixed'}}>
      {this.state.song ?
          <div >
            <img src={this.state.song.image.url} style={{width:'85%', height:'85%'}}/>
            <h3>{this.state.song.name}</h3>
            <h4>By: {this.state.song.artist}</h4>
            <p>Popularity:{this.state.song.popularity}</p>
            <h4>Song features</h4>
          </div>
        : <p>loading song...</p>}
      {this.state.features ?
          <div>
            <ul>
              <li>acousticness: {this.state.features.acousticness}</li>
              <li>danceability: {this.state.features.danceability}</li>
              <li>energy: {this.state.features.energy}</li>
              <li>liveness: {this.state.features.liveness}</li>
              <li>loudness: {this.state.features.loudness}</li>
              <li>valence: {this.state.features.valence}</li>
              <li>tempo: {this.state.features.tempo}</li>
              <li>key: {this.state.features.key}</li>
            </ul>
          </div>
        :<p>loading song features...</p>}
    </div>
    <div>
    {this.state.reccomendations ?
          <div style={{float:'right', width:'75%'}}>
          <h4 >Reccomendations for this song</h4>
          {this.state.reccomendations.map(song =>  <Song song={song}/>)}
          </div>
      :<p>getting reccomendations...</p>
    }
    </div>
    </div>
  );
}
}


export default Detail;
