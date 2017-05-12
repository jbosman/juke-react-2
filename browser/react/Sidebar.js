import React from 'react';

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
		      <a onClick={ () => updateAlbum() }>ALBUMS</a>
		    </h4>
		  </section>
		</sidebar>
	)
	
}

