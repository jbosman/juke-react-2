import React from 'react';

export default function Footer(props){
	const { 
		currentSong,  
		audioCtrls
	} = props;

	if(!currentSong.songId) return <div></div>;
	return (
		<footer>
	        <div className="pull-left">
	          <button 
	          	onClick={ () => { audioCtrls.previousSong() } }
	          	className="btn btn-default"
	          >
	            <span className="glyphicon glyphicon-step-backward"></span>
	          </button>
	          <button 
	          	onClick={ () => { 
	          		currentSong.isPlaying ? 
	          			audioCtrls.pauseSong() :
	          			audioCtrls.playSong()
	          		}
	          	}
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
	          	onClick={ () => audioCtrls.nextSong() }
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