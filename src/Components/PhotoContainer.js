import React, { Component } from 'react';

import NotFound from './NotFound';
import Photo from './Photo';

class PhotoContainer extends Component {
  state = {
    loading: this.props.loading
  }
  render() {

    const results = this.props.data;
    let photos;

    // while API fetch gets data, show Loading screen instead of "not found"
    if (this.props.loading) {
      return (
        <h2>Loading...</h2>
      )
    }
    
    // if there are results, display them, includes unique key ID for React 
    if (results.length>0) {
      photos = results.map(photo => 
        <Photo 
          url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} 
          key={photo.id}/>  
      );
    } else {
      photos = <NotFound />
    }
    
    return (
      
      <div className="photo-container">
        <h2> Results </h2>
        <ul> {photos} </ul>
      </div>
    )
  }
}

export default PhotoContainer;