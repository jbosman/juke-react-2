import React from 'react';
import {Link} from 'react-router';

export default function Arists(props){

	const {artists} = props;

	if(!artists.length) return <div />;

	return (
		<div>
		  <h3>Artists</h3>
		    <div className="list-group">
		    {
		      artists.map(artist => {
		        return (
		          <div className="list-group-item" key={artist.id}>
		            <Link to="">{ artist.name }</Link>   
		          </div>
		        )    
		      })
		    }
		  </div>
		</div>
	)
}