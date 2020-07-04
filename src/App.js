import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//make components for a song
//make compoents for table data

let fakeServerData = {
  user:{
    name:'David'
  },
  recent: [
    {
      title:'song name1',
      artist: 'the artist'
    },
    {
      title:'song name2',
      artist: 'the artist'
    },
    {
      title:'song name3',
      artist: 'the artist'
    },
    {
      title:'song name4',
      artist: 'the artist'
    },
    {
      title:'song name5',
      artist: 'the artist'
    },
    {
      title:'song name6',
      artist: 'the artist'
    }
  ]
};
class Song extends Component{
  render(){
    return(
      <div style={{display:'inline-block', width:'30%'}}>
        <img/>
        <h4> {this.props.song.title}</h4>
        <h5>{this.props.song.artist}</h5>
      </div>
    )
  }
}
class Search extends Component{
  render(){
    return(
      <div>
        <img/>
        <input type="text"/>Search
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>music app</h1>
        </header>
        <Search/>
        {this.state.serverData.user &&
          <h3> {this.state.serverData.user &&
               this.state.serverData.user.name}'s Recently played</h3>
         }
        {this.state.serverData.user ?
          <div className='Recent-songs'>
          {this.state.serverData.recent.map(song =>
            <Song song={song}/>
          )}

          </div> : <h4>no recently played</h4>
        }
      </div>
    );
  }
}

export default App;
