import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as fun from './App';



var artists=fun.randomArtist();
ReactDOM.render(<App   artist={artists} first={1}/>, document.getElementById('root'));
registerServiceWorker();
