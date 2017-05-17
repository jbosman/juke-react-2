import React from 'react';
import { Link } from 'react-router';

/* a-tag onClick note
	Calling updateAlbum without an argument defaults the argument to an empty object
	Setting the selected Album to an empty object ( i.e. no ablum selected )
	This will render all available albums
*/

export default function Sidebar(props){
	const { updateAlbum } = props;
	
	return (
		<sidebar>
		  <img src="juke.svg" className="logo" />
		  <section>
		    <h4 className="menu-item active">
		    	<Link to='/albums'>ALBUMS</Link>
		    </h4>
		  </section>
		</sidebar>
	)
	
}

