import React, {Component} from 'react';

import Main from './main';

import axios from 'axios';
const toJSON = function(resp){ return resp.data }
const log = console.log.bind(console);
const logError = console.error.bind(console);

const audio = document.createElement('audio');

function getAudioProgress(){
	const tempProgress = 100 * audio.currentTime / audio.duration;
	return isNaN( tempProgress ) ? 0 : tempProgress;
}

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = { 
						albums: [],
						selectedAlbum: {},
						selectedSong: { songId: 0, isPlaying: false, progress: 0 },
						artists: [],
						selectedArtist: { id: 0, name: '' }
		};
		this.updateSelectedAblum = 	this.updateSelectedAblum.bind(this);
		this.updateSelectedSong = 	this.updateSelectedSong.bind(this);
		this.playSong = 			this.playSong.bind(this);
		this.pauseSong = 			this.pauseSong.bind(this);
		this.nextSong = 			this.nextSong.bind(this);
		this.previousSong = 		this.previousSong.bind(this);
	}

	componentDidMount(){
		axios.get('/api/albums')
		.then(toJSON)
		.then( albums => {
			this.setState({albums: albums})
		})
		.catch(logError)

		axios.get('/api/artists')
		.then(toJSON)
		.then( artists => {
			this.setState({artists: artists});
		})

		audio.addEventListener( 'ended', () => {
			this.nextSong();
		});

		audio.addEventListener( 'timeupdate', () => {
			let currentSong = this.state.selectedSong;
			this.updateSelectedSong( currentSong.songId, currentSong.isPlaying, getAudioProgress());
		})
	}

	updateSelectedAblum(albumId){

		if(typeof albumId !== 'number') this.setState({selectedAlbum: {} });
		else{
			axios.get(`/api/albums/${albumId}`)
			.then(toJSON)
			.then( album => {
				this.setState({selectedAlbum: album});
			})
			.catch(logError)
		}
	}

	updateSelectedSong( songId, isPlaying = false, progress = 0 ){
		this.setState({ selectedSong: { songId, isPlaying, progress } })
	}

	playSong(songId){
		const currentSong = this.state.selectedSong;
		// If selected song doesn't match current songId load the new song
		if(!songId || currentSong.songId === songId){
			audio.play();
			this.updateSelectedSong( currentSong.songId, true, currentSong.progress );
		}
		else{
			audio.src = `/api/songs/${songId}/audio`;
			audio.load();
			audio.play();
			this.updateSelectedSong( songId, true );
		}
	}

	pauseSong(){
		const currentSong = this.state.selectedSong;
		audio.pause();
		this.updateSelectedSong( currentSong.songId, false, currentSong.progress );
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
		
		const audioCtrls = {
			playSong: 		this.playSong,
			pauseSong: 		this.pauseSong,
			nextSong: 		this.nextSong,
			previousSong: 	this.previousSong  
		}
		return (
			<Main 
				appState={this.state}
				updateAlbum={this.updateSelectedAblum}
				updateSong={this.updateSelectedSong}
				audioCtrls={audioCtrls}
				children={this.props.children}
			/>
		)
	}
}