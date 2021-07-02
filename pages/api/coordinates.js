const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

export default async function handler(req, res) {
  // get query string
  const query = Object.keys(req.query)
  .map(key => `${key}=${req.query[key]}`).join('&');
  const url = `${baseUrl}?key=${process.env.MAPS_KEY}&${query}`;
  // make request
  const response = await fetch(url);
  const json = await response.json();
  res.status(response.status).json(json);
}
