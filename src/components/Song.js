import React from 'react';
import  { Component } from 'react';


class Song extends Component{
  render(){
    return(
      <div>
      {this.props.song ?

      <div style={{float:'left', width:'33%'}}>


        <img style={{margin: 'auto', width:'35%'}}src={this.props.song.image.url}/><br/>

        {this.props.song.preview ?
          <div style={{align:'center'}}>
          <audio controls style={{height:'30px', width:'70%'}}> <source src={this.props.song.preview}/> </audio>
          <br/>
          </div>
          :<div> <p style={{padding:'2px', border: '2px', margin:'3.2px'}}>no preview</p></div>
        }

        <a href={this.props.song.id}> {this.props.song.title}</a>
        <h5>{this.props.song.artist}</h5>

      </div>
      :<p>loading reccomendations...</p>
    }
    </div>
  )}}

export default Song;
