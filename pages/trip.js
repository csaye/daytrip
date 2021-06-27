import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

export default function Trip() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
    }
  }, [router]);

  return (
    <div>
      <Link href="/">Home</Link>
    </div>
  );
}
