import React, {Component} from 'react';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';

import axios from 'axios';

export default class App extends Component {

	constructor(){
		super();
		this.state = { 
						albums: [],
						selectedAlbum: {}
					};
		this.handleAlbumClick = this.handleAlbumClick.bind(this);
	}

	componentDidMount(){
		axios.get('/api/albums')
		.then((resp) => {
			this.setState({albums: resp.data})
		})
	}

	handleAlbumClick(album){
		this.setState({selectedAlbum: album });
	}

	render(){
		return (
			<div className='container-fluid'>
				<div className="col-xs-2">
					<Sidebar />
				</div>

				<div className="col-xs-10">
					{ this.state.selectedAlbum.id ? 
						<SingleAlbum album={this.state.selectedAlbum} /> : 
						<Albums albums={this.state.albums} albumclick={this.handleAlbumClick} /> 
					}
				</div>

				<Footer />
			</div>
		)
	}
}