import { useState } from 'react'
import PathSearch from './components/pathSearch'
import MapViewer from './components/mapViewer'

function App() {
  const [path, setPath] = useState(null)
  return (
    <div>
      <PathSearch onResult={setPath}/>
      {path && <MapViewer path={path} />}
    </div>
  )
}

export default App
