import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return(
        <header className = {styles.Toolbar}>
            <div className={styles.DrawerToggle} onClick={props.opened}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo></Logo>
            <nav className={styles.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}

export default toolbar;