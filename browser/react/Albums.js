import React from 'react';

import axios from 'axios';
const toJSON = function(resp){ return resp.data }
const log = console.log.bind(console);
const logError = console.error.bind(console);

function handleAlbumClick(album, updateAlbumCB){
		axios.get(`/api/albums/${album.id}`)
		.then(toJSON)
		.then( album => {
			updateAlbumCB(album);
		})
		.catch(logError)
	}

export default function Albums(props){
	const { 
		albums,
		updateAlbum
	} = props;

	return (
		<div>
			<h3>Albums</h3>
		  	<div className="row">
		    { 
		    	albums.map( (album) => {
			    	return (
			    		<div key={album.id} className="col-xs-4">
					      <a 
					      	className="thumbnail" 
					      	onClick={() => { handleAlbumClick(album, updateAlbum) } }
					      >
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