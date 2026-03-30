const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getCampsite = async (stoppingPoint) => {
  const result = await fetch(
    `${SERVER_URL}/api/campsite/search?lat=${stoppingPoint["lat"]}&lon=${stoppingPoint["lon"]}`,
  );

  if (!result.ok) {
    const data = await result.json();
    throw new Error(data.error);
  }

  return await result.json();
};
