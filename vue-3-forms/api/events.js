const app = require("express")();

const PORT = 8081;

app.post("/events", (req, res) => {
  // Implement server-side validation here
  res.sendStatus(200).end();
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
