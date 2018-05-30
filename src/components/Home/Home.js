import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

const Home = () => (
  <div className={styles.home}>
    Home page
    <Link to="/about">About</Link>
  </div>
);

export default Home;
