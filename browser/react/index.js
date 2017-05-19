'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import App from './App';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';
import Artists from './Artists';

ReactDOM.render( 
	<Router history={hashHistory} >
		<Route path='/' component={App}>
			<IndexRedirect to='/albums' />
			<Route path='/albums' component={Albums} />
			<Route path='/albums/:albumId' component={SingleAlbum} />
			<Route path='/artists' component={Artists} />
			
		</Route>
	</Router>
, document.getElementById('app') );
