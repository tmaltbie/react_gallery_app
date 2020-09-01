import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import apiKey from './config'
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      cats: [],
      coffee: [],
      cows: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = (tags = 'herbs') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  searchCats = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  searchCoffee = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=coffee+shop&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  searchCows = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cows&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">

          {/* route for "home" page */}
          <Route exact path="/" render={()=>{this.performSearch()}}/>

          <SearchForm onSearch={this.performSearch} />
          <Nav />
          { (this.state.loading) ? <p>Loading</p> : <PhotoContainer data={this.state.photos}/> }

          {/* routes for nav "links" */}
          <Route path="/cats" render={() => {this.searchCats()} } />
          <Route path="/coffee" render={() => {this.searchCoffee()} } />
          <Route path="/cows" render={() => {this.searchCows()} } />

        </div>
      </Router>
    );
  }
}

export default App;