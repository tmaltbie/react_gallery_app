import React, { Component } from 'react';
import axios from 'axios'
import {
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
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

  // performSearch = (query,property) => {
  //   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
  //     .then(response => {
  //       this.setState({ 
  //         [property]: response.data.photos.photo,
  //         loading: false
  //       })
  //     })
  //     .catch(error => {
  //       console.log('uh-oh there has been an error', error)
  //     })
  // }

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
    this.setState({loading: true})
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&content_type=1&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({ 
          search: response.data.photos.photo,
          loading: false,
          query: query 
        })
      })
      .catch(error => {
        console.log('uh-oh there has been an error', error)
      })
  }

  componentDidMount() {
    this.catSearch()
    this.coffeeSearch()
    this.cowsSearch()
    this.performSearch('longhorns')
  }

  // componentDidUpdate() {
  //   if (this.state === ) {
  //     this.performSearch('cats', 'cats')
  //   }
  // }

  render() {
    return (
      <div className="container">
        <SearchForm onSearch={this.performSearch} query={this.state.query} loading={this.state.loading}/>
        <Nav />
        <Switch>
          <Route exact path='/cats' render={()=>(<PhotoContainer data={this.state.cats} loading={this.state.loading}/> )}/>
          <Route exact path='/coffee' render={()=>(<PhotoContainer data={this.state.coffee} loading={this.state.loading}/> )}/>
          <Route exact path='/cows' render={()=>(<PhotoContainer data={this.state.cows} loading={this.state.loading}/> )}/>
          <Route exact path={`/search/${this.state.query}`} render={()=>(<PhotoContainer data={this.state.search} loading={this.state.loading}/> )}/>
          <Route path='/' render={()=> (<Error404/>)} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)