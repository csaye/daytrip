import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar.js';
import Business from '../components/Business/Business.js';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import getBusinesses from '../util/getBusinesses.js';
import getDirUrl from '../util/getDirUrl.js';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: false, text: 'Create your schedule below.' });

  const [searchType, setSearchType] = useState('location');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [events, setEvents] = useState([]);
  const [businesses, setBusinesses] = useState(undefined);
  const [dirUrl, setDirUrl] = useState(undefined);

  const router = useRouter();

  // reset message when search type changes
  useEffect(() => {
    setMessage({ error: false, text: 'Create your schedule below.' });
  }, [searchType]); // eslint-disable-line react-hooks/exhaustive-deps

  // searches for businesses at given coordinates
  async function search(origin) {
    setLoading(true);
    const newBusinesses = await getBusinesses(origin, events);
    const newDirUrl = getDirUrl(origin, newBusinesses);
    setDirUrl(newDirUrl);
    setBusinesses(newBusinesses);
    setLoading(false);
  }

  // searches with current location
  async function searchCurrentLocation() {
    // check events
    if (!events.length) {
      alert('Must create at least one event.');
      return;
    }
    setLoading(true);
    // retrieve current position
    navigator.geolocation.getCurrentPosition(
      pos => {
        // search with latitude and longitude
        search({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      error => {
        setMessage({ error: true, text: 'Location not enabled.' })
        setLoading(false);
      }
    );
  }

  // searches with address
  async function searchAddress() {
    // check events
    if (!events.length) {
      alert('Must create at least one event.');
      return;
    }
    // search with address
    search({ location: address });
  }

  // searches with coordinates
  function searchCoordinates() {
    // check events
    if (!events.length) {
      alert('Must create at least one event.');
      return;
    }
    // get latitude and longitude
    const floatLat = parseFloat(latitude);
    const floatLong = parseFloat(longitude);
    // check for invalid numbers
    if (isNaN(floatLat) || isNaN(floatLong)) {
      setMessage({ error: true, text: 'Coordinates must be numbers.' });
      return;
    }
    // verify latitude
    if (floatLat < -90 || floatLat > 90) {
      setMessage({ error: true, text: 'Latitude must be between -90 and 90.' });
      return;
    }
    // verify longitude
    if (floatLong < -180 || floatLong > 180) {
      setMessage({ error: true, text: 'Longitude must be between -180 and 180.' });
      return;
    }
    // search with latitude and longitude
    search({
      latitude: floatLat,
      longitude: floatLong
    });
  }

  return (
    <div className={styles.home}>
      {
        loading ?
        <div className={styles.loaddiv}>
          <p className={styles.loadtext}>Loading...</p>
        </div> :
        businesses ?
        <>
          <div className={styles.search}>
            <div className={styles.background} />
            <p>Return to calendar</p>
            <button
              onClick={() => setBusinesses(undefined)}
              className={styles.iconbutton}
            >
              <KeyboardReturnIcon />
            </button>
          </div>
          <h1>
            Schedule for{' '}
            {
              new Date(businesses[0].timespan.start)
              .toLocaleString(undefined,
                { year: 'numeric', month: 'long', day: 'numeric' }
              )
            }
          </h1>
          <div className={styles.mapslink}>
            <a href={dirUrl} target="_blank" rel="noopener noreferrer">
              Open Route in Google Maps
            </a>
          </div>
          <div className={styles.businesslist}>
            {
              businesses.map(business =>
                <Business key={business.id} business={business} />
              )
            }
          </div>
        </> :
        <div className={styles.search}>
          <div className={styles.background} />
          <p>
            Search with{' '}
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
            >
              <option value="location">Current Location</option>
              <option value="address">Address</option>
              <option value="coordinates">Coordinates</option>
            </select>
          </p>
          {
            searchType === 'location' &&
            <button
              onClick={searchCurrentLocation}
              className={styles.iconbutton}
            >
              <SearchIcon />
            </button>
          }
          {
            searchType === 'address' &&
            <form onSubmit={e => {
              e.preventDefault();
              searchAddress();
            }}>
            <input
              placeholder="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <button className={styles.iconbutton}>
              <SearchIcon />
            </button>
          </form>
        }
        {
          searchType === 'coordinates' &&
          <form onSubmit={e => {
            e.preventDefault();
            searchCoordinates();
          }}>
            <input
              placeholder="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              required
            />
            <input
              placeholder="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required
            />
            <button className={styles.iconbutton}>
              <SearchIcon />
            </button>
          </form>
        }
        <p style={{ color: message.error ? 'red' : 'inherit' }}>
          {message.text}
        </p>
      </div>
      }
      <div style={{
        display: (businesses || loading) ? 'none' : 'block'
      }}>
        <Calendar setEvents={setEvents} />
      </div>
    </div>
  );
}
