const baseUrl = 'https://api.yelp.com/v3/businesses/search';
const data = {
  headers: {
    Authorization: `Bearer ${process.env.YELP_KEY}`
  }
};

export default async function handler(req, res) {
  const response = await fetch(baseUrl, data);
  const json = await response.json();
  res.status(response.status).json(json);
}
