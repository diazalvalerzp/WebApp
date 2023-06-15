import React from 'react';
import styles from '../public/styles.css'
import Layout from '../components/Layout';
import Header from "../components/Header";
import Switch from "../components/Switch";

export default function MyApp ({ Component, pageProps }){
    return (
        <Layout>
            <Header/>
            <Switch></Switch>
            <div className={styles.content}>
                <Component {...pageProps} />
            </div>
        </Layout>
    );
};
