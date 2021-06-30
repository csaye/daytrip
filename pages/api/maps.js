const baseUrl = 'https://www.google.com/maps/embed/v1/directions';

export default function handler(req, res) {
  // get query string
  const query = Object.keys(req.query)
  .map(key => `${key}=${req.query[key]}`).join('&');
  // construct and return url
  const url = `${baseUrl}?key=${process.env.MAPS_KEY}&${query}`;
  res.status(200).json({ url });
}
