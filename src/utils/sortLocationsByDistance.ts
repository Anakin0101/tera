// Assuming AtmsResponse is similar and has latitude and longitude
// import { AtmsResponse } from 'services/apis/profileAPI/profileAPI.types';

// Define a constraint for the generic type to ensure it has the necessary properties
type LocationEntity = {
  latitude: number;
  longitude: number;
};

export const sortLocationsByDistance = <T extends LocationEntity>(
  currentLocation: { latitude: number; longitude: number },
  data?: T[],
): (T & { distance: number })[] => {
  if (!data) return [];

  const currentLat = currentLocation.latitude;
  const currentLong = currentLocation.longitude;

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  return data
    .map(item => ({
      ...item,
      distance: getDistanceFromLatLonInKm(currentLat, currentLong, item.latitude, item.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
};

// Usage with ServiceCentersResponse[] or AtmsResponse[] as 'data'
// sortLocationsByDistance(data);
