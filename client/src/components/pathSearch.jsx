import { useState } from "react";
import { getPath } from "../service/pathService";

function PathSearch({ onResult }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const findRoute = async () => {
    const path = await getPath(start, end);
    onResult(path);
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
      <button onClick={findRoute}>Find Route</button>
    </div>
  );
}

export default PathSearch;
