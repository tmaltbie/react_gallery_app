import React, { Component } from 'react';
import axios from 'axios'

import apiKey from './config'
import SearchForm from './SearchForm';
import Nav from './Nav';

class App extends Component {

  state = {
    photos: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search$api_key=${apiKey}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  performSearch = (query) => {
    
  }

  render() {
    console.log(this.state.photos)
    return (
      <div className="container">
        <SearchForm />
        <Nav />
      </div>
    );
  }
}

export default App;