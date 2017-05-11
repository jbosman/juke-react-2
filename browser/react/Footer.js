import React, {Component} from 'react';

function isNan(value){
	return value !== value;
}

export default function Footer(props){
	const { 
		currentSong,  
		handlePlayButtonClick,
		handleNextButtonClick,
		handlePreviousButtonClick
	} = props;

	if(!currentSong.songId) return <div></div>;
	return (
		<footer>
	        <div className="pull-left">
	          <button 
	          	onClick={ () => { handlePreviousButtonClick() } }
	          	className="btn btn-default"
	          >
	            <span className="glyphicon glyphicon-step-backward"></span>
	          </button>
	          <button 
	          	onClick={() => { handlePlayButtonClick( currentSong.songId) } }
	          	className="btn btn-default">
	            <span className= { 
 			      	currentSong.isPlaying ?
 			      	"glyphicon glyphicon-pause":
 			      	"glyphicon glyphicon-play"
 			      }
 			    >
		     	</span>
	          </button>
	          <button 
	          	onClick={ () => handleNextButtonClick() }
	          	className="btn btn-default">
	            <span className="glyphicon glyphicon-step-forward"></span>
	          </button>
	        </div>
	        <div className="bar">
	          <div className="progress">
	            <div 
	            	className="progress-bar" 
	            	style={{
	            		width: currentSong.progress,
	            		backgroundColor: '#00BC8C'
	            	}}
	            >
	            </div>
	          </div>
	        </div>
	    </footer>
	)
}