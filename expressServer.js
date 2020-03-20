const express = require('express');
const app = express();
var artists = require('./data_artists.json');
//import artists from ('data_artists.json');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/artists', (req, res) => {
    //res.send('hello world');
    //console.log('artists',artists);
    res.json(artists);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));