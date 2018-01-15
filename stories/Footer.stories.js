import '../src/styles/Styles.css';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Footer from '../src/components/Footer';

storiesOf('Footer', module)
    .add('Basic footer', ()=>(
        <Footer />
    ))
