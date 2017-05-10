import React, {Component} from 'react';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';

import axios from 'axios';

axios.get('/api/albums')
.then((resp) => {
	console.log(resp.data);
})

export default class App extends Component {

	componentDidMount(){
		axios.get('/api/albums')
		.then((resp) => {
			this.setState({albums: resp.data})
		})
	}

	constructor(){
		super();
		this.state = { albums: [] };
	}

	render(){
		return (
			<div className='container-fluid'>
				<div className="col-xs-2">
					<Sidebar />
				</div>

				<div className="col-xs-10">
				  <Albums albums={this.state.albums} />
				</div>

				<Footer />
			</div>
		)
	}
}