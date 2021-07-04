export default async function getMapUrl(origin, businesses) {
  // get origin
  const source = origin.location ??
  `${source.latitude},${source.longitude}`;
  const queryObj = {};
  queryObj.origin = source;
  queryObj.destination = origin;
  // get waypoints
  queryObj.waypoints = businesses
  .map(b => `${b.coordinates.latitude},${b.coordinates.longitude}`)
  .join('|');
  // get query string
  const query = Object.keys(queryObj)
  .map(key => `${key}=${queryObj[key]}`).join('&');
  // fetch and return url
  const response = await fetch(`/api/maps?${query}`);
  const json = await response.json();
  return response.ok ? json.url : undefined;
}
