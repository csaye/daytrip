const baseUrl = 'https://www.google.com/maps/dir';

export default function getDirUrl(origin, businesses) {
  // get coords of origin
  const originCoords = `${origin.latitude},${origin.longitude}`;
  // get coords of businesses
  const businessCoords = businesses
  .map(b => `${b.coordinates.latitude},${b.coordinates.longitude}`);
  // construct path
  const coords = [originCoords, ...businessCoords, originCoords];
  const path = coords.map(c => `'${c}'`).join('/');
  // return google maps url
  return `${baseUrl}/${path}`;
}
