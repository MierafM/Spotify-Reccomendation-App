import React from 'react';
import  { Component } from 'react';

class Search extends Component{
  constructor() {
    super();
    this.state = {}
  }

  updateQuery = (entry) =>{

    const { value } = entry.target
    sessionStorage.setItem('query', entry.target.value)
    console.log(entry.target.value)

  }

  search() {
    console.log('in search')

    let token = sessionStorage.getItem('myTokenName')

    fetch('https://api.spotify.com/v1/search?q=abba&type=track',{
      headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
      .then(data =>
      {data && this.setState({ data: data})})


  }




  render(){
    return(
      <div style={{display: 'inline', float:'right'}} >

        <input type='text' onChange={this.updateQuery} placeholder='Search for tracks...'/>
        <button type='submit' onClick={this.search}>Submit</button>
        <br/>

      </div>
    );
  }
}

export default Search;
