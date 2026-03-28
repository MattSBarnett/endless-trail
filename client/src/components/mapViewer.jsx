function mapViewer({path}) {
  return (
    <p>{JSON.stringify(path, null, 2)}</p>
  )
}

export default mapViewer