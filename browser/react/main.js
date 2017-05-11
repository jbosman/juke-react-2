import React, {Component} from 'react';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';

import axios from 'axios';
const toJSON = function(resp){ return resp.data }
const log = console.log.bind(console);
const logError = console.error.bind(console);

const audio = document.createElement('audio');

export default class App extends Component {

	constructor(){
		super();
		this.state = { 
						albums: [],
						selectedAlbum: {},
						selectedSong: { songId: 0, isPlaying: false }
					};
		this.handleAlbumClick = this.handleAlbumClick.bind(this);
		this.handleAlbumButtonClick = this.handleAlbumButtonClick.bind(this);
		this.playSong = this.playSong.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.previousSong = this.previousSong.bind(this);
	}

	componentDidMount(){
		axios.get('/api/albums')
		.then(toJSON)
		.then( albums => {
			this.setState({albums: albums})
		})
		.catch(logError)

		audio.addEventListener( 'ended', () => {
			this.nextSong();
		})
	}

	handleAlbumClick(album){
		axios.get(`/api/albums/${album.id}`)
		.then(toJSON)
		.then( album => {
			this.setState({selectedAlbum: album})
		})
		.catch(logError)
	}

	handleAlbumButtonClick(){
		this.setState({selectedAlbum: {} });
	}

	playSong(songId){
		const currentSong = this.state.selectedSong;
		// If selected song doesn't match current songId load the new song
		if( currentSong.songId !== songId ){
			audio.src = `/api/songs/${songId}/audio`;
			audio.load();
			audio.play();
			this.setState({ selectedSong: { songId: songId, isPlaying: true } });
		}
		else if( currentSong.isPlaying ){
			audio.pause();
			this.setState({ selectedSong: { songId: songId, isPlaying: false } });
		}
		else {
			audio.play();
			this.setState({ selectedSong: { songId: songId, isPlaying: true } });
		}
	}

	nextSong(){
		let songIds = this.state.selectedAlbum.songs.map( (song) => song.id )
		let nextSongIndex = (songIds.indexOf(this.state.selectedSong.songId) + 1) % ( songIds.length );
		this.playSong(songIds[nextSongIndex]);
	}

	previousSong(){
		let songIds = this.state.selectedAlbum.songs.map( (song) => song.id )
		let prevSongIndex = songIds.indexOf(this.state.selectedSong.songId) - 1;
		prevSongIndex = prevSongIndex === -1 ? songIds.length - 1 : prevSongIndex;
		this.playSong(songIds[prevSongIndex]);
	}

	render(){
		return (
			<div className='container-fluid'>
				<div className="col-xs-2">
					<Sidebar handleAlbumButtonClick={this.handleAlbumButtonClick}/>
				</div>

				<div className="col-xs-10">
					{ this.state.selectedAlbum.id ? 
						<SingleAlbum 
							album={this.state.selectedAlbum} 
							handlePlayButtonClick={this.playSong}
							currentSong={this.state.selectedSong}
						/> : 
						<Albums albums={this.state.albums} albumclick={this.handleAlbumClick} /> 
					}
				</div>

				<Footer
					handlePlayButtonClick={this.playSong} 
					currentSong={this.state.selectedSong} 
					handleNextButtonClick={this.nextSong}
					handlePreviousButtonClick={this.previousSong}
				/>
			</div>
		)
	}
}