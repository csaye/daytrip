const baseUrl = 'https://www.google.com/maps/dir';

export default function getDirUrl(origin, businesses) {
  // get coords of origin
  const source = origin.location ??
  `'${origin.latitude},${origin.longitude}'`;
  // get coords of businesses
  const businessCoords = businesses
  .map(b => `'${b.coordinates.latitude},${b.coordinates.longitude}'`);
  // construct path
  const spots = [source, ...businessCoords, source];
  const path = spots.join('/');
  // return google maps url
  return `${baseUrl}/${path}`;
}
