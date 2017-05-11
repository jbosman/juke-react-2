import React, {Component} from 'react';

export default class Footer extends Component{
	render(){
		if(!this.props.currentSong.songId) return <div></div>;
		return (
			<footer>
		        <div className="pull-left">
		          <button 
		          	onClick={ () => { this.props.handlePreviousButtonClick() } }
		          	className="btn btn-default"
		          >
		            <span className="glyphicon glyphicon-step-backward"></span>
		          </button>
		          <button 
		          	onClick={() => {this.props.handlePlayButtonClick(this.props.currentSong.songId)} }
		          	className="btn btn-default">
		            <span className= { 
	 			      	this.props.currentSong.isPlaying ?
	 			      	"glyphicon glyphicon-pause":
	 			      	"glyphicon glyphicon-play"
	 			      }
	 			    >
			     	</span>
		          </button>
		          <button 
		          	onClick={ () => this.props.handleNextButtonClick() }
		          	className="btn btn-default">
		            <span className="glyphicon glyphicon-step-forward"></span>
		          </button>
		        </div>
		        <div className="bar">
		          <div className="progress">
		            <div 
		            	className="progress-bar" 
		            	style={{
		            		width: `${this.props.currentSong.progress}`,
		            		backgroundColor: '#00BC8C'
		            	}}
		            >
		            </div>
		          </div>
		        </div>
		    </footer>
		)
	}
}