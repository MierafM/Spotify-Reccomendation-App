import React, { Component } from 'react';
import {App} from './App';
import queryString from 'query-string';
import './trackdetailStyle.css';
import  {useState, useContext} from "react";
import Song from './Song';
import Header from './Header';

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
      console.log('this is the token: ' + token)
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
      console.log('2this is the token: ' + token)
    fetch('https://api.spotify.com/v1/audio-features/'+id, {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
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
        {/*dont forget to restric for popularity and songs with previews*/}
        return fetch('https://api.spotify.com/v1/recommendations?seed_tracks='
        +data.id
        +'&target_energy='+data.energy+'&min_energy='+(data.energy-10)+'&max_energy='+(data.energy+10)
        +'&target_danceability='+data.danceability+'&min_danceability='+(data.danceability-10)+'&max_danceability='+(data.danceability+10)
        +'&target_tempo='+data.tempo+'&min_tempo='+(data.tempo-10)+'&max_tempo='+(data.tempo+10)
        +'&target_key='+data.key
        +'&target_valence='+data.valence
        +'&limit='+40, {
          headers: {'Authorization': 'Bearer ' + token}
        })})
      .then(response => response.json())
      .then(data =>
        {data &&
          console.log(data)
          this.setState({
            recomendations: data.tracks.filter(item => item.preview_url).map(item => ({
              title: item.name,
              id: item.id,
              artist:item.artists[0].name,
              image:item.album.images[0],
              preview:item.preview_url
              }))

          })

      }

    )




  }


  render() {
    return (
    <div className='tdPageMain'>
      <Header/>

      <div className='trackDetailBody'>
        <div className='songInformation'>
          {this.state.song ?

                <img  className='albumCover' src={this.state.song.image.url}/>
            : <p className='loadingMessage'>loading Album cover...</p>
          }
          {this.state.song ?
              <div className="songText">

                <div className="aboutSong">
                  <h3 className='songTitle'>{this.state.song.name}</h3>
                  <h4>By: {this.state.song.artist}</h4>
                </div>

                {this.state.features ?
                    <div className="songFeatures">
                      <h3>Song features</h3>
                      <div className="songStats">
                        <ul className="featuresList">
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
                    </div>
                  :<p className='loadingMessage'>loading song features...</p>
                }

              </div>
            : <p className='loadingMessage'>loading song...</p>
          }

        </div>

        <div className="songRecomendation">
        {this.state.song ?
          <h4 >Songs similar to {this.state.song.name}:</h4>
          : <p className='loadingMessage'>loading Album cover...</p>
        }

        {this.state.recomendations ?
              <div className='recomendedList' >

              {this.state.recomendations.map(song =>
                <div>
                <Song song={song}/>
                </div>
              )}
              </div>
          :<p className='loadingMessage'>Loading recomendations...</p>
        }
        </div>
      </div>

    </div>

  );
}
}


export default Detail;
