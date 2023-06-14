import React from 'react';
import styles from './Header.module.css';
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <img className={styles.logoIMG} src={'/logo.svg'} alt="Logo" />
                </Link>
            </div>
            <nav className={styles.navigation}>
                <div className={`${styles.navigationItem} ${styles.itemOne}`}></div>
                <div className={`${styles.navigationItem} ${styles.itemOne} ${styles.fadeOne}`}></div>
                <div className={`${styles.navigationText} ${styles.itemOne}`}><Link className={styles.navigationText} href="/tutorials">Tutorials</Link></div>
                <div className={`${styles.navigationItem} ${styles.itemTwo}`}></div>
                <div className={`${styles.navigationItem} ${styles.itemTwo} ${styles.fadeOne}`}></div>
                <div className={`${styles.navigationText} ${styles.itemTwo}`}><Link className={styles.navigationText} href="/upload">Upload</Link></div>
                <div className={`${styles.navigationItem} ${styles.itemThree}`}></div>
                <div className={`${styles.navigationItem} ${styles.itemThree} ${styles.fadeOne}`}></div>
                <div className={`${styles.navigationText} ${styles.itemThree}`}><Link className={styles.navigationText} href="/login">Login</Link></div>
            </nav>
        </header>
    );
};

export default Header;