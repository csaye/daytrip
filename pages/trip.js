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

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
    }
  }, [router]);

  return (
    <div>
      <Link href="/">Home</Link>
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
