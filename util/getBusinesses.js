// searches yelp api for matching parameters
async function yelpSearch(queryObj) {
  // get query string
  const query = Object.keys(queryObj)
  .map(key => `${key}=${queryObj[key]}`).join('&');
  // get api response
  const response = await fetch(`/api/yelp?${query}`);
  const json = await response.json();
  return response.ok ? json.businesses : undefined;
}

// gets businesses based on given search query and events
export default async function getBusinesses(coordinates, events) {
  const businesses = [];
  // for each event
  for (const e of events) {
    // yelp search with query and term
    const result = await yelpSearch({ ...coordinates, term: e.term });
    // continue if invalid result
    if (!result?.length) continue;
    // append random business from result
    const randomIndex = Math.floor(Math.random() * result.length);
    const business = {
      ...result[randomIndex],
      term: e.term,
      timespan: { start: e.start, end: e.end }
    };
    businesses.push(business);
  }
  // return businesses sorted by start time
  return businesses.sort((a, b) => a.timespan.start - b.timespan.start);
}
