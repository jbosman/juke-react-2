import React, {Component} from 'react';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';

import axios from 'axios';
const toJSON = function(resp){ return resp.data }
const log = console.log.bind(console);
const logError = console.error.bind(console);

function isAlbumSelected(appState){
	return appState.selectedAlbum.id !== undefined;
}

export default function Main(props){

	const {
		appState,
		updateAlbum,
		updateSong,
		audioCtrls
	} = props;
	console.log('children: ', props.children)
	if(!appState) return <div></div>

	return (
		<div className='container-fluid'>
			<div className="col-xs-2">
				<Sidebar updateAlbum={updateAlbum}/>
			</div>

			<div className="col-xs-10">
				{ 
					isAlbumSelected(appState) ? 
					<SingleAlbum 
						currentAlbum={appState.selectedAlbum} 
						currentSong={appState.selectedSong}
						udpateSong={updateSong}
						playSong={audioCtrls.playSong}
					/> : 
					<Albums albums={appState.albums} updateAlbum={updateAlbum} />
					
				}
			</div>

			<Footer currentSong={appState.selectedSong} audioCtrls={audioCtrls} />
		</div>
	)
}


