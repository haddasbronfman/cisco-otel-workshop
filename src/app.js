require('./tracer') // order is important! 
const express = require("express");

const PORT = '8081';
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from Glitch otel-app! <br><br>To see your traces go to <a href=\"url\">http://3.92.199.248:16686</a>");
});

app.get('/:name', (req, res) => {
  res.send("Hello " + req.params.name);
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
