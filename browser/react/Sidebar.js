import React, {Component} from 'react';

export default class Sidebar extends Component{
	render(){
		return (
			<sidebar>
			  <img src="juke.svg" className="logo" />
			  <section>
			    <h4 className="menu-item active">
			      <a href="#">ALBUMS</a>
			    </h4>
			  </section>
			</sidebar>
		)
	}
}