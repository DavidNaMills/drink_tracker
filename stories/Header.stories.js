import '../src/styles/Styles.css';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Header from '../src/components/Header';

storiesOf('Header', module)
    .add('Main Header', ()=>(
        <Header />
    ))
    .add('Sub-Header', ()=>(
        
        <Header type={1} />
    ));
