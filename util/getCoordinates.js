export default async function getCoordinates(address) {
  // make request
  const response = await fetch(`/api/coordinates?address=${address}`);
  const json = await response.json();
  return response.ok ? json : undefined;
}
