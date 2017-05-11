import React from 'react';

export default function Sidebar(props){
	const { handleAlbumButtonClick } = props;
	
	return (
		<sidebar>
		  <img src="juke.svg" className="logo" />
		  <section>
		    <h4 className="menu-item active">
		      <a onClick={() => handleAlbumButtonClick() }>ALBUMS</a>
		    </h4>
		  </section>
		</sidebar>
	)
	
}