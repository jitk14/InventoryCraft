/**
 * Application layout main header
 *
 */
import React from 'react';
import styles from './header.module.scss';
import logo from '../../../img/logo-white-small.png';

export const AppHeader = (_props: unknown) => {
    return (
        <header className={`${styles.header} inv-app-header`}>
            <div>
                <img src={logo} className={styles.logo}></img>
            </div>
        </header>
    );
}