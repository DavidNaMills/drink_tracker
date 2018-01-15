import '../src/styles/Styles.css';
import React from 'react';
import {storiesOf, addWithInfo} from '@storybook/react';
import Button from '../src/components/Button';

storiesOf('Button', module)
    .add('basic button', ()=>(
        <Button />
    ))