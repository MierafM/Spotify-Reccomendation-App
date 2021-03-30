import React from 'react';
import  { Component } from 'react';
import './songStyle.css';

class Song extends Component{


  state = {
    play: false,
    preview: new Audio(this.props.song.preview)
  }

  togglePlay = () => {

    console.log('in da club');
    console.log(this.state.preview);

    this.setState({ play: !this.state.play },
      () => {
      this.state.play ? this.state.preview.play() : this.state.preview.pause();
      });
  }


  render(){
    return(
      <div className="Songs">
      {this.props.song ?

        <div className='trackTile'>

          <div className='imgAndPreview'>

            <img className='songImage' src={this.props.song.image.url} onClick={this.togglePlay}/>
            <div>
            </div>
            {/*option to include song preview but not all the songs have a preview clip
            <audio className='audioToggle' controls> <source src={this.props.song.preview}/> </audio>
              {this.props.song.preview ?
              <div className='previewSection'style={{align:'center'}}>
                 <audio className='audioToggle' controls> <source src={this.props.song.preview}/> </audio>

              </div>
            : <span className='previewAlt' >no preview</span>
            }*/}
          </div>

          <div className='songInfo'>
            <a href={this.props.song.id}> {this.props.song.title}</a>
            <span>{this.props.song.artist}</span>
          </div>

        </div>
      :<p className='loadingMessage'>loading recomendations...</p>
      }
    </div>
  )}}

export default Song;
