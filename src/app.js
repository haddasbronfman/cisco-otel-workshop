require('./tracer') // order is important! 
const express = require("express");

const PORT = '8081';
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});