import React from 'react';

export default function Albums(props){
	return (
		<div>
		<h3>Albums</h3>
		  <div className="row">
		    { 
		    	props.albums.map( (album) => {
			    	return (
			    		<div key={album.id} className="col-xs-4">
					      <a className="thumbnail" href="#">
					        <img src={album.imageUrl} />
					        <div className="caption">
					          <h5>
					            <span>{album.name}</span>
					          </h5>
					          <small>{album.songs.length} songs</small>
					        </div>
					      </a>
					    </div>
			    	)
		    	})
			}
		    
		  </div>
		  </div>
	)
}