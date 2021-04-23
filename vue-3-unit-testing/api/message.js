const app = require('express')()

const PORT = 8081

app.get('/message', (req, res) => {
  res.sendStatus(200).json({ text: 'Hello from the db!' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
