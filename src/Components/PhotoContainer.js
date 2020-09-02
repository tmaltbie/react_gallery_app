import React from 'react';

import NotFound from './NotFound';
import Photo from './Photo';

const PhotoContainer = props => {

  const results = props.data;
  let photos;
  if (results.length>0) {
    photos = results.map(photo => 
      <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id}/>  
    );
  } else {
    photos = <NotFound />
  }
  
  return (
    
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {photos}
      </ul>
    </div>
  )
}

export default PhotoContainer;