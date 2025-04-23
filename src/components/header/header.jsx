import React from 'react';

import logoPic from '../../assets/logo.png';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.link}>
        <img src={logoPic} alt="logo" className={styles.logo} />
      </a>
    </header>
  );
}
