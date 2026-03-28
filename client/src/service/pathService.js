const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getPath = async (start, end) => {
  const res = await fetch(
    `${SERVER_URL}/api/path/search?start=${start}&end=${end}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch route");
  }
  return res.json();
};
