import React from 'react';

function renderArtists(artists){
	let artistsNames = artists.map( (artistInfo) => { return artistInfo.name });

	// Build artists string correctly for single and multiple artists
	return artistsNames.length === 1 ? 
		artistsNames[0] :
		artistsNames.join(', ').slice(-2);
}

export default function SingleAlbum(props){

	const { 
		album,
		currentSong,
		handlePlayButtonClick
	} = props;

	if(!album) return;
	return (
		<div>
		  <div>
		    <h3>{album.name}</h3>
		    <img src={`api/albums/${album.id}/image`} className="img-thumbnail" />
		  </div>
		  <table className='table'>
		    <thead>
		      <tr>
		        <th></th>
		        <th>Name</th>
		        <th>Artists</th>
		        <th>Genre</th>
		      </tr>
		    </thead>
		    <tbody>
		     {
		     	album.songs.map( (song) => {
		     		return (
		     			<tr key={song.id}>
		     			  <td>
		     			    <button onClick={ () => handlePlayButtonClick(song.id) } className="btn btn-default btn-xs">
		     			      <span className= { 
		     			      	song.id === currentSong.songId && currentSong.isPlaying ?
		     			      	"glyphicon glyphicon-pause":
		     			      	"glyphicon glyphicon-play"
		     			      }
		     			      >
		     			      </span>
		     			    </button>
		     			  </td>
		     			  <td>{song.name}</td>
		     			  <td>{renderArtists(song.artists)}</td>
		     			  <td>{song.genre}</td>
		     			</tr>
		     		)
		     	})
		     }
		    </tbody>
		  </table>
		</div>
	)
	
}