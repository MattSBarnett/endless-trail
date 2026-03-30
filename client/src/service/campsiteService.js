
export const getCampsite = async (stoppingPoint) => {
  const result = await fetch(
    `/api/campsite/search?lat=${stoppingPoint["lat"]}&lon=${stoppingPoint["lon"]}`,
  );

  if (!result.ok) {
    const data = await result.json();
    throw new Error(data.error);
  }

  return await result.json();
};
