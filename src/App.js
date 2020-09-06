import React, { Component } from 'react';
import axios from 'axios'
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom

import apiKey from './config'
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import Error404 from './Components/Error404';

class App extends Component {

  state = {
    search: [],
    cats: [],
    coffee: [],
    cows: [],
    loading: true
    }

    // populate images for nav links and initial page load
  componentDidMount() {
    this.catSearch()
    this.coffeeSearch()
    this.cowsSearch()
    this.performSearch('longhorns')
  }

  catSearch = (query = "cats") => {
    this.setState({loading: true})
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          cats: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  coffeeSearch = (query = "coffee+beans") => {
    this.setState({loading: true})
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          coffee: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  cowsSearch = (query = "cows") => {
    this.setState({loading: true})
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          cows: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  performSearch = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          search: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  render() {
    return (
      <div className="container">
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <Switch>
          <Route exact path='/' render={()=>(<PhotoContainer data={this.state.search} loading={this.state.loading} /> )}/> 
          <Route path='/cats' render={()=>(<PhotoContainer data={this.state.cats} loading={this.state.loading} /> )}/>
          <Route path='/coffee' render={()=>(<PhotoContainer data={this.state.coffee} loading={this.state.loading} /> )}/>
          <Route path='/cows' render={()=>(<PhotoContainer data={this.state.cows} loading={this.state.loading} /> )}/>
          <Route path={'/search/:query'} render={()=>(<PhotoContainer data={this.state.search} loading={this.state.loading} /> )}/>
          <Route path='/' component={Error404} />
        </Switch>
      </div>
    );
  }
}
// ${this.state.query}

export default withRouter(App)