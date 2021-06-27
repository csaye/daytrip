import React, { useState } from 'react';
import Business from '../components/Business/Business.js';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [location, setLocation] = useState('');
  const [businesses, setBusinesses] = useState([]);

  // searches yelp api for matching parameters
  async function search(queryObj) {
    // get query string
    const query = Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`).join('&');
    // get api response
    const response = await fetch(`/api/yelp?${query}`);
    const json = await response.json();
    if (response.ok) {
      setBusinesses(json.businesses);
    }
  }

  function searchCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        // search with latitude and longitude
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        search({ latitude, longitude });
      },
      error => console.warn(error)
    );
  }

  return (
    <div className={styles.home}>
      <button onClick={searchCurrentLocation}>
        Search with Current Location
      </button>
      <form onSubmit={e => {
        e.preventDefault();
        // search with manual location
        search({ location });
      }}>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <button>Search with Manual Location</button>
      </form>
      {
        businesses.length ?
        businesses.map(business =>
          <Business key={business.id} business={business} />
        ) :
        <p>No businesses yet</p>
      }
    </div>
  );
}
