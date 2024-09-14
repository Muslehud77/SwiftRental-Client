export const getLocationName = async (latlng: { lat: number; lng: number }) => {
  const geocoder = new window.google.maps.Geocoder();

const location = await geocoder.geocode({ location: latlng }, (results) => results);

  const results = location?.results || []
  const address = results[0]?.formatted_address || "Somewhere in this world"
  

  
  return address
};
