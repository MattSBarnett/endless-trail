

export const getPath = async (start, end) => {
  const result = await fetch(
    `/api/path/search?start=${start}&end=${end}`,
  );

  if (!result.ok) {
    const data = await result.json();
    throw new Error(data.error);
  }

  return result.json();
};
