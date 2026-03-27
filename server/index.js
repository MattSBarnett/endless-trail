const express = require('express')

const app = express()
app.use(express.json())

app.listen(8080, () => {
  console.log('The endless trail, running on: http://localhost:8080')
})