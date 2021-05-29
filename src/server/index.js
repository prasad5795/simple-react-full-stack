const express = require("express");
const os = require("os");
const csvFileParser = require("../../csv files/csvFileParser");
const app = express();

app.use(express.static("dist"));
app.use(express.static("csv files"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.get("/api/getDataFromCSV", async (req, res) => {
  console.log(csvFileParser.extractDataFromCSV());
  const data = await csvFileParser.extractDataFromCSV();
  console.log("apis", data.length);
  res.send(data);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
