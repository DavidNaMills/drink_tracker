import './styles/test.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

const app = document.getElementById('app');

const jsx = (
    <div className="test">
        <Main />
    </div>
);

ReactDOM.render(jsx, app);