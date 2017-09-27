import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as fun from './App';






var artists=fun.randomArtist();
ReactDOM.render(<App   artist={artists} numOfRound={0}/>, document.getElementById('root'));
registerServiceWorker();
