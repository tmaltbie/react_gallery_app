import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { withRouter } from "react-router";


//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom

import apiKey from './config'
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';

export default class App extends Component {

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

  performSearch = (query,property) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          [property]: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  componentDidMount() {
    this.performSearch('pangolin','photos')
  }

  render() {
    return (
      <div>
        <Router>
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Route exact path='/' render={()=>(
            <div className="container">
              { 
                (this.state.loading) 
                ? <h2>Loading</h2> 
                : <PhotoContainer data={this.state.photos}/> 
              }
            </div>
          )}/>
        </Router>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App)