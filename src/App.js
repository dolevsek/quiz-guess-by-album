import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


//--------------------Component-----------------

export default  class App extends Component {
  constructor() {
    super() 
    this.state = {
        valueAttr : '',
        try : 0,
        score: 0 
    }
  }

  handleChange = (e) => {
    this.setState({valueAttr: e.target.value});
  }

  handleClick = () => {
  	console.log(chosenArtist[this.props.numOfRound-1]);
  	this.setState({try: this.state.try+1});
  	this.setState({valueAttr: ''});
  	if (this.state.valueAttr.toUpperCase()===chosenArtist[this.props.numOfRound-1].toUpperCase()){
    	readData(this.props.numOfRound+1);
    	this.setState({score: this.state.score+updateScore(this.state.try)});
    	this.setState({try: 0});
	}
	else { 
		if (this.state.try>1){
			this.setState({try: 0});
			readData(this.props.numOfRound+1);
  		}
	}
}

  render() {
  	  	if (this.props.numOfRound===0){
	   		return (
			<div id="App">
				<div id = "startBox">
				<h1>Guess by album!</h1>
				<p className="startBoxp"> 
				The game has 5 rounds.<br />
				 At each round 3 album’s names are shown and you <br />
				 have 3 attempts to guess the exact full name of the artist<br />
				 If you succeeds on the 1st attempt -> you get 5 points.<br />
				 If you succeeds on the 2nd attempt -> you get 3 points.<br />
				 If you succeeds on the 3rd attempt -> you get 1 point.<br />
				</p>
				<button className="startBoxbutton" onClick={onClickStart}>Click to start </button>
			</div>
		</div>
	    );
  	}
  	else if (this.props.numOfRound === 1 && this.props.first===1 ){
		readData(1);
		return <div></div>; //
  	}
  	else if (this.props.numOfRound < 6){
	    var ans1 = <p className="ans"> {this.props.ans[1]}</p>;
  		var ans2 = 
	  	<div>
			{ans1}
	  		<p className="ans"> {this.props.ans[2]}</p>;
	  	</div>
	    return (
	    	<div id="startBox">
				<h2>Round {this.props.numOfRound}:</h2> 
				<p className="ans"> {this.props.ans[0]}</p>
				{this.state.try===1 && ans1 }
                {this.state.try===2 && ans2  }
				<h3> Please enter our answer:</h3>
				<input type="text" id="inputText" value = {this.state.valueAttr} onChange={this.handleChange}  />
				<button id="answerButton" onClick={this.handleClick} >Send</button>
				<h2 >score is : {this.state.score}</h2>
			</div>
	    );
	}//

	else if (this.props.numOfRound===6) {
  		return(	    	
  			<div id="startBox">	
  			<h1>Game Over!</h1>
  			<h3 id="Endh3"> score is : {this.state.score}</h3>
			<button className="startBoxbutton" onClick={onClickStart}>Click to start </button>

  			</div>);//

  	}
  }
}


//-----------------Functions----------------------


var  chosenArtist = [5];
//get random artist from an array
export function randomArtist(){
	var  artists = ["U2", "Coldplay", "Queen", "Led Zeppelin", "Arctic monkeys", "Red Hot Chili Peppers", "Britney Spears", "Madonna","Michael Jackson", "Sia", "The Doors", "Metallica","Shakira","Katy Perry","Taylor swift", "Adele","Aerosmith","Guns N Roses","The Beatles","Elvis Presley "];
	var length=artists.length;
	var i;
	for (i=0;i<5;i++){
	var choosen=Math.floor(Math.random() * length);
		length--;
 		chosenArtist[i]=artists[choosen];
		artists[choosen]=artists[length-1];
	} 
}




//get url of the data for the artist that was choosen
function getUrl(i){
	var arrName=chosenArtist[i-1].split(" ");
	var urlApi="https://itunes.apple.com/search?term=";
	for (i=0;i<arrName.length-1;i++)
	{
		urlApi=urlApi+arrName[i]+'+';
	}
	urlApi=urlApi+arrName[arrName.length-1]+"&entity=album";
	return urlApi;
}

function onClickStart(){
	return ReactDOM.render(<App  numOfRound={1} first={1} />, document.getElementById('root'));//

}


function readData(numOfRound){
	var count=0;
	var i=0;
	var answer=[3];
if (numOfRound<6){
	var urlApi=getUrl(numOfRound);
	return fetch(urlApi)
  	.then(function(response) { return response.json(); })
  	.then(function(data) {
  		while (count!==3){
  			var valid=data.results[i].collectionName.includes(chosenArtist[numOfRound-1]);
  			valid=valid || data.results[i].collectionName.includes("Greatest Hits");
  		if (!valid){
  			answer[count]=data.results[i].collectionName;
  			count+=1;
  		}
  		i+=1;
  	}
		ReactDOM.render(<App numOfRound={numOfRound}   ans={answer} first={0}/>, document.getElementById('root'));//
		numOfRound+=1;
		return;  });
}
else
		ReactDOM.render(<App numOfRound={numOfRound}/>, document.getElementById('root'));//

}


//Update the score according to the rules.
function updateScore(numOfTry){
	switch (numOfTry){
		case 0:
			return 5;
		case 1:
			return 3;
		case 2:
			return 1;
		default:
			console.log("Error!!!!");
			return -1;
	}
}








