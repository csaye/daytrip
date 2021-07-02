import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar/Calendar.js';
import Business from '../components/Business/Business.js';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import getBusinesses from '../util/getBusinesses.js';
import getMapUrl from '../util/getMapUrl.js';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [searchType, setSearchType] = useState('location');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [events, setEvents] = useState([]);
  const [businesses, setBusinesses] = useState(undefined);
  const [mapUrl, setMapUrl] = useState(undefined);

  const router = useRouter();

  // searches for businesses at given coordinates
  async function search(coordinates) {
    if (!events.length) {
      alert('Must create at least one event.');
      return;
    }
    setLoading(true);
    const newBusinesses = await getBusinesses(coordinates, events);
    const newMapUrl = await getMapUrl(coordinates, newBusinesses);
    setBusinesses(newBusinesses);
    setMapUrl(newMapUrl);
    setLoading(false);
  }

  // searches with current location
  async function searchCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        // search with latitude and longitude
        search({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      error => console.warn(error)
    );
  }

  return (
    <>
      {
        loading ?
        <div className={styles.loaddiv}>
          <p className={styles.loadtext}>Loading...</p>
        </div> :
        (businesses && mapUrl) ?
        <>
          <div className={styles.searchbar}>
            <p>Return to calendar</p>
            <button
              onClick={() => {
                setBusinesses(undefined);
                setMapUrl(undefined);
              }}
              className={styles.iconbutton}
            >
              <KeyboardReturnIcon />
            </button>
          </div>
          <div className={styles.businesslist}>
            {
              businesses
              .sort((a, b) => a.timespan.start - b.timespan.start)
              .map(business =>
                <Business key={business.id} business={business} />
              )
            }
          </div>
          <div className={styles.map}>
            <iframe
              width="500"
              height="300"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </> :
        <div className={styles.searchbar}>
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
              search({
                latitude: address,
                longitude: address
              });
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
            search({ latitude, longitude });
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
      </div>
      }
      <div style={{
        display: ((businesses && mapUrl) || loading) ? 'none' : 'block'
      }}>
        <Calendar setEvents={setEvents} />
      </div>
    </>
  );
}


// src={mapUrl}
