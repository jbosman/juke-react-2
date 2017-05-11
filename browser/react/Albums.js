import React from 'react';

export default function Albums(props){
	const { 
		albums,
		albumClick 
	} = props;

	return (
		<div>
			<h3>Albums</h3>
		  	<div className="row">
		    { 
		    	albums.map( (album) => {
			    	return (
			    		<div key={album.id} className="col-xs-4">
					      <a className="thumbnail" onClick={() => { albumClick(album) } }>
					        <img src={`/api/albums/${album.id}/image`} />
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