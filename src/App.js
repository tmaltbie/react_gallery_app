import React, { Component } from 'react';
import axios from 'axios'
import {
  Route,
  Switch
} from "react-router-dom";
import { withRouter } from "react-router";

//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom

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

  // initial call of API to show some images upon load
  componentDidMount() {
    this.performSearch('pangolin','photos')
  }

  // componentDidUpdate() {
  //   this.performSearch('cats', 'cats')
  // }

  render() {
    return (
      <div>
          {/* For later: Switch goes here, maybe??? */}
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Route exact path='/' render={()=>(
            <div className="container">
              { 
                (this.state.loading) 
                ? <h2>Loading...</h2> 
                : <PhotoContainer data={this.state.photos}/> 
              }
            </div>
          )}/>
          <Route exact path='/cats' render={()=>(
            <div className="container">
              { 
                (this.state.loading) 
                ? <h2>Loading</h2> 
                : <PhotoContainer data={this.state.cats}/> 
              }
            </div>
          )}/>
      </div>
    );
  }
}

export default withRouter(App)