function MapViewer({ path }) {
  return <p>{JSON.stringify(path, null, 2)}</p>;
}

export default MapViewer;
