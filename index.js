const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/total-distance', (req, res) => {
  let dist1 = parseFloat(req.query.dist1);
  let dist2 = parseFloat(req.query.dist2);
  let totalDistance = dist1 + dist2;
  res.send(totalDistance.toString());
});

app.get('/totalTime', (req, res) => {
  let t1 = parseFloat(req.query.t1);
  let t2 = parseFloat(req.query.t2);
  let t3 = parseFloat(req.query.t3);
  let totalTime = t1 + t2 + t3;
  res.send(totalTime.toString());
});

app.get('/averageSpeed', (req, res) => {
  let totalDistance = parseFloat(req.query.totalDistance);
  let timeTaken = parseFloat(req.query.timeTaken);
  let avgSpeed = totalDistance / timeTaken;
  res.send(avgSpeed.toString());
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
