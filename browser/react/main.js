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
						selectedAlbum: {}
					};
		this.handleAlbumClick = this.handleAlbumClick.bind(this);
		this.handleAlbumButtonClick = this.handleAlbumButtonClick.bind(this);
		this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
	}

	componentDidMount(){
		axios.get('/api/albums')
		.then(toJSON)
		.then( albums => {
			this.setState({albums: albums})
		})
		.catch(logError)
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

	handlePlayButtonClick(songId){
		audio.src = `/api/songs/${songId}/audio`;
		audio.load();
		audio.play();
		
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
							handlePlayButtonClick={this.handlePlayButtonClick}
						/> : 
						<Albums albums={this.state.albums} albumclick={this.handleAlbumClick} /> 
					}
				</div>

				<Footer />
			</div>
		)
	}
}