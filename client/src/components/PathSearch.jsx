import { useState } from "react";
import { getPath } from "../service/pathService";
import { getCampsite } from "../service/campsiteService";

function PathSearch({ onPathFound, onFoundCampsite, clearCampsites }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState(null);

  const findRoute = async () => {
    try {
      const path = await getPath(start, end);
      onPathFound(path["coordinates"]);
      clearCampsites();
      for (const stoppingPoint of path["stoppingPoints"]) {
        const campsite = await getCampsite(stoppingPoint);
        if (campsite) onFoundCampsite(campsite);
      }
    } catch (errorRespnse) {
      setError(errorRespnse.message);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
      <h1 className="text-green-900 font-bold text-3xl text-center">
        The Endless Trail
      </h1>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-green-900 font-semibold text-sm">Start</label>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border border-green-200 rounded-lg px-4 py-2 bg-green-50 text-green-900"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-green-900 font-semibold text-sm">End</label>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border border-green-200 rounded-lg px-4 py-2 bg-green-50 text-green-900"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={findRoute}
          disabled={!start.trim() || !end.trim()}
          className="bg-green-600 disabled:bg-green-300 text-white px-8 py-2 rounded-lg"
        >
          Find Route
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default PathSearch;
