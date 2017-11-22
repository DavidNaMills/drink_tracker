import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

const app = document.getElementById('app');

const jsx = (
    <div>
        <Main />
    </div>
);

ReactDOM.render(jsx, app);