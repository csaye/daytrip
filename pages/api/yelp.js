const baseUrl = 'https://api.yelp.com/v3/businesses/search';
const data = {
  headers: {
    Authorization: `Bearer ${process.env.YELP_KEY}`
  }
};

export default async function handler(req, res) {
  // get query string
  const query = Object.keys(req.query)
  .map(key => `${key}=${req.query[key]}`).join('&');
  const url = `${baseUrl}?${query}`;
  // make request
  const response = await fetch(url, data);
  const json = await response.json();
  res.status(response.status).json(json);
}
