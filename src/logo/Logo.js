import React from 'react';
import calcLogo from '../assets/new_2020_logo.svg';

import './Logo.module.css';

const logo = (props) => (
    <div>
        <img src={calcLogo} alt='Calcurator Logo' ></img >
    </div>
);

export default logo;