import React, { useState } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [location, setLocation] = useState('');

  // searches yelp api for matching parameters
  async function search() {
    // construct api request
    const request = {
      location: location
    };
    // get api response
    const response = await fetch('/api/yelp', request);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div className={styles.home}>
      <form onSubmit={e => {
        e.preventDefault();
        search();
      }}>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <button>Search</button>
      </form>
    </div>
  );
}
