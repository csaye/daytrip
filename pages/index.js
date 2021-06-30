import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar.js';
import Business from '../components/Business/Business.js';

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import getBusinesses from '../util/getBusinesses.js';
import getMapUrl from '../util/getMapUrl.js';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [businesses, setBusinesses] = useState(undefined);
  const [mapUrl, setMapUrl] = useState(undefined);

  const router = useRouter();

  // searches for businesses with given query
  async function search(query) {
    const newBusinesses = await getBusinesses(query, events);
    const newMapUrl = await getMapUrl(query, newBusinesses);
    setBusinesses(newBusinesses);
    setMapUrl(newMapUrl);
    setLoading(false);
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
      {
        loading ?
        <p>Loading...</p> :
        <div className={styles.searchbar}>
          {
            businesses ?
            <button onClick={() => {
              setBusinesses(undefined);
              setMapUrl(undefined);
            }}>
              Return
            </button> :
            <>
              <button onClick={searchCurrentLocation}>
                Search with Current Location
              </button>
              {/*<form onSubmit={e => {
                e.preventDefault();
                // search with manual location
                setLoading(true);
                getBusinesses({ location });
              }}>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
                <button>Search with Manual Location</button>
              </form>*/}
            </>
          }
        </div>
      }
      {
        (businesses && !loading) &&
        <div className={styles.businesslist}>
          {
            businesses.map(business =>
              <Business key={business.id} business={business} />
            )
          }
        </div>
      }
      {
        (mapUrl && !loading) &&
        <div className={styles.map}>
          <iframe
            width="500"
            height="300"
            frameBorder="0"
            src={mapUrl}
            allowFullScreen
          />
        </div>
      }
      <div style={{ display: (businesses || loading) ? 'none' : 'block' }}>
        <Calendar setEvents={setEvents} />
      </div>
    </div>
  );
}
