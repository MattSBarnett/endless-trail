import { createLogger } from "../config/logger.js";
import * as turf from "@turf/turf";
const logger = createLogger("pathService");

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

  return resultJson;
};

const calculateStoppingPoints = (pathGeoJson, dailyDistance) => {
  const pathCoords = pathGeoJson.features.flatMap(
    (feature) => feature.geometry.coordinates,
  );

  const turfPath = turf.lineString(pathCoords);
  const pathLength = turf.length(turfPath, { units: "kilometers" });

  const stoppingPoints = [];

  for (
    let currentDistance = dailyDistance;
    currentDistance < pathLength;
    currentDistance += dailyDistance
  ) {
    const point = turf.along(turfPath, currentDistance, {
      units: "kilometers",
    });
    const [lon, lat] = point.geometry.coordinates;
    stoppingPoints.push({
      lat,
      lon,
      kmAlongRoute: Math.round(currentDistance),
    });
  }

  return stoppingPoints;
};

export const planRoute = async (startText, endText, dailyDistance = 20) => {
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
  const pathGeoJson = await getPathBetweenCoordinates(startCoord, endCoord);
  const stoppingPoints = calculateStoppingPoints(pathGeoJson, dailyDistance);

  //This API can return mutliple features, showing muiltiple legs of the journey, if this happens then map them all into a single list.
  //This also switches them from lon, lat used in GeoJSON to lat, lon used by leaflet which we use for front end rendering.
  const pathCoordinates = pathGeoJson.features.flatMap((feature) =>
    feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  );

  return {
    coordinates: pathCoordinates,
    stoppingPoints: stoppingPoints,
  };
};
