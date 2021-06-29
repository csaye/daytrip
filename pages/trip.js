import React, { useEffect, useState } from 'react';
import Business from '../components/Business/Business.js';
import Link from 'next/link';

import { useRouter } from 'next/router';

import styles from '../styles/Trip.module.css';

export default function Trip() {
  const [businesses, setBusinesses] = useState(undefined);

  const router = useRouter();

  // searches yelp api for matching parameters
  async function search(queryObj) {
    // get query string
    const query = Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`).join('&');
    // get api response
    const response = await fetch(`/api/yelp?${query}`);
    const json = await response.json();
    return response.ok ? json.businesses : undefined;
  }

  // gets businesses based on given router query
  async function getBusinesses(query, events) {
    const newBusinesses = [];
    // for each event
    for (const e of events) {
      // search with query and term
      const result = await search({ ...query, term: e.term });
      if (!result?.length) continue;
      // append random business from result
      const randomIndex = Math.floor(Math.random() * result.length);
      const business = {
        ...result[randomIndex],
        term: e.term,
        timespan: { start: e.start, end: e.end }
      };
      newBusinesses.push(business);
    }
    setBusinesses(newBusinesses);
  }

  // get router query on start
  useEffect(() => {
    // if router ready, parse query
    if (router.isReady) {
      const query = router.query;
      // parse events json
      const events = JSON.parse(query.events);
      delete query.events;
      // get businesses with query
      getBusinesses(query, events);
    }
  }, [router]);

  return (
    <div>
      <div className={styles.toolbar}>
        <Link href="/">Home</Link>
      </div>
      {
        businesses ?
        <div className={styles.businesslist}>
          {
            businesses.map(business =>
              <Business key={business.id} business={business} />
            )
          }
        </div> :
        <p>Loading businesses...</p>
      }
    </div>
  );
}
