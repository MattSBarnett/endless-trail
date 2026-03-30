import { useState } from "react";
import PathSearch from "./components/PathSearch";
import MapViewer from "./components/MapViewer";

function App() {
  const [path, setPath] = useState(null);
  const [campsites, setCampsites] = useState([]);

  const addNewCampsite = (campsite) => {
    setCampsites((currnet) => currnet.concat(campsite));
  };
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div>
        <PathSearch onPathFound={setPath} onFoundCampsite={addNewCampsite} />
        {path && <MapViewer path={path} campsites={campsites} />}
      </div>
    </div>
  );
}

export default App;
