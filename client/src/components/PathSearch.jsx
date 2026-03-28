import { useState } from "react";
import { getPath } from "../service/pathService";

function PathSearch({ onResult }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState(null);

  const findRoute = async () => {
    try {
      const path = await getPath(start, end);
      onResult(path);
    } catch (errorRespnse) {
      setError(errorRespnse.message);
    }
  };
  return (
    <div>
      <h1>The Endless Trail</h1>
      <label>Start:</label>
      <input
        type="text"
        id="start"
        name="start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <label>End:</label>
      <input
        type="text"
        id="end"
        name="end"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={findRoute} disabled={!start.trim() || !end.trim()}>
        Find Route
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default PathSearch;
