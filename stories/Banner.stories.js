import '../src/styles/Styles.css';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Banner from '../src/components/Banner';

storiesOf('Banner', module)
    .add('Basic Banner', ()=>(
        <Banner />
    ))