import { useState } from "react";
import PathSearch from "./components/PathSearch";
import MapViewer from "./components/MapViewer";
import DayPlanner from "./components/DayPlanner";

function App() {
  const [path, setPath] = useState(null);
  const [campsites, setCampsites] = useState([]);

  const addNewCampsite = (campsite) => {
    setCampsites((currnet) => currnet.concat(campsite));
  };
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div>
        <PathSearch
          onPathFound={setPath}
          onFoundCampsite={addNewCampsite}
          clearCampsites={() => setCampsites([])}
        />
        {path && <MapViewer path={path} campsites={campsites} />}
        {campsites.length > 0 && <DayPlanner campsites={campsites} />}
      </div>
    </div>
  );
}

export default App;
