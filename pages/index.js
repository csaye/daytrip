import React, { useState } from 'react';
import Calendar from '../components/Calendar/Calendar.js';

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);

  const router = useRouter();

  // searches yelp api for matching parameters
  function search(queryObj) {
    // encode events
    queryObj.events = encodeURIComponent(JSON.stringify(events));
    // get query string
    const query = Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`).join('&');
    // pass parameters to trip page
    router.push(`/trip?${query}`);
  }

  // searches with current location
  function searchCurrentLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        // search with latitude and longitude
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        search({ latitude, longitude });
      },
      error => {
        console.warn(error);
        setLoading(false);
      }
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Daytrip</h1>
      </div>
      {
        loading ?
        <p>Loading...</p> :
        <>
          <div className={styles.searchbar}>
            <button onClick={searchCurrentLocation}>
              Search with Current Location
            </button>
            <form onSubmit={e => {
              e.preventDefault();
              // search with manual location
              setLoading(true);
              search({ location });
            }}>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
              <button>Search with Manual Location</button>
            </form>
          </div>
          <Calendar setEvents={setEvents} />
        </>
      }
    </div>
  );
}
