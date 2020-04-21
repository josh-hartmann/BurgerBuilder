import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => {
    return(
        <header className = {styles.Toolbar}>
            <div>MENU</div>
            <Logo></Logo>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    );
}

export default toolbar;