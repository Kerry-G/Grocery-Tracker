import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

ReactDOM.render(<App />, document.getElementById('root'));