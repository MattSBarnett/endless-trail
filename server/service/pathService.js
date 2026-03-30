import { createLogger } from '../config/logger.js'
const logger = createLogger('pathService')

const geocodeLocation = async (name) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${name}&format=json&countrycodes=gb&limit=1`;

  const result = await fetch(url, {
    headers: { "User-Agent": "endless-trail" },
  });

  if (!result.ok) {
    logger.error(`Returned: ${result.status} for url: ${url}`);
    throw new Error(`Failed to get location: "${name}"`);
  }

  const resultArray = await result.json();
  if (!resultArray || resultArray.length === 0) {
    logger.error(`No location found for url: ${url}`);
    throw new Error(`Location not found: "${name}"`);
  }

  return resultArray[0];
};

const getPathBetweenCoordinates = async (startCoord, endCoord) => {
  const url = `https://api.openrouteservice.org/v2/directions/foot-hiking?api_key=${process.env.OPEN_ROUTE_SERVICE_API_KEY}&start=${startCoord.lon},${startCoord.lat}&end=${endCoord.lon},${endCoord.lat}`;
  const result = await fetch(url);

  if (!result.ok) {
    logger.error(`Returned: ${result.status} for url: ${url}`);
    throw new Error("Could not retreive path");
  }

  const resultJson = await result.json();

  if (!resultJson.features || resultJson.features.length === 0) {
    logger.error(`No features returned for url: ${url}`);
    throw new Error("Path could not be found");
  }

  //This API can return mutliple features, showing muiltiple legs of the journey.
  //If this happens then map them all into a single list, returns an array of lat,lon values.
  return resultJson.features.flatMap((feature) =>
    feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  );
};

export const planRoute = async (startText, endText) => {
  if (!startText) {
    logger.error("Start location not set");
    throw new Error("Start location not set");
  }
  if (!endText) {
    logger.error("End location not set");
    throw new Error("End location not set");
  }

  const startCoord = await geocodeLocation(startText);
  const endCoord = await geocodeLocation(endText);
  const path = await getPathBetweenCoordinates(startCoord, endCoord);
  return path;
};
