const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getPath = async (start, end) => {
  const result = await fetch(
    `${SERVER_URL}/api/path/search?start=${start}&end=${end}`,
  );

  if (!result.ok) {
    const data = await result.json();
    throw new Error(data.error);
  }

  return result.json();
};
