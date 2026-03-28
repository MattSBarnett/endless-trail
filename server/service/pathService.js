const geocodeLocation = async (name) => {
  const result = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${name}&format=json&countrycodes=gb&limit=1`,
    { headers: { "User-Agent": "endless-trail" } },
  );
  if (!result.ok) throw new Error(`Failed to get location: "${name}"`);

  const resultArray = await result.json();
  if (!resultArray || resultArray.length === 0)
    throw new Error(`Location not found: "${name}"`);

  return resultArray[0];
};

const getPathBetweenCoordinates = async (startCoord, endCoord) => {
  const result = await fetch(
    `https://api.openrouteservice.org/v2/directions/foot-hiking?api_key=${process.env.OPEN_ROUTE_SERVICE_API_KEY}&start=${startCoord.lon},${startCoord.lat}&end=${endCoord.lon},${endCoord.lat}`,
  );
  if (!result.ok) throw new Error("Failed to get path");

  return result.json();
};

export const planRoute = async (startText, endText) => {
  if (!startText) throw new Error("Start location not set");
  if (!endText) throw new Error("End location not set");

  const startCoord = await geocodeLocation(startText);
  const endCoord = await geocodeLocation(endText);
  const path = await getPathBetweenCoordinates(startCoord, endCoord);
  return path;
};
