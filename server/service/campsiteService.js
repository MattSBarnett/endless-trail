import { createLogger } from "../config/logger.js";
const logger = createLogger("campsiteService");

const SEARCH_RADIUS_LIST = [2000, 5000, 10000];

const queryForCampsites = async (lat, lon, radius) => {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.location,places.websiteUri",
      },
      body: JSON.stringify({
        includedTypes: ["campground"],
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lon },
            radius: radius,
          },
        },
        maxResultCount: 1,
        rankPreference: "DISTANCE",
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json();
    logger.error(
      `Campsite request returned ${response.status} with the error: ${JSON.stringify(errorBody)}`,
    );
    throw new Error("Failed to find campsite");
  }

  const data = await response.json();

  if (!data.places || data.places.length === 0) {
    return null;
  }

  return data.places[0];
};

export const searchCampsites = async (lat, lon) => {
  //Start with a small radius around where you want to stop then increase if no results are found
  for (const radius of SEARCH_RADIUS_LIST) {
    const result = await queryForCampsites(lat, lon, radius);
    if (result) return result;
  }
  logger.warn(`No campsite found near ${lat}, ${lon}`);
  return null;
};
