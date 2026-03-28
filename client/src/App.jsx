import { useState } from "react";
import PathSearch from "./components/PathSearch";
import MapViewer from "./components/MapViewer";

function App() {
  const [path, setPath] = useState(null);
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div>
        <PathSearch onResult={setPath} />
        {path && <MapViewer path={path} />}
      </div>
    </div>
  );
}

export default App;
