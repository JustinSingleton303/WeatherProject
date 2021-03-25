const express = require('express');
const app = express();
const https = require('https');
const port = 3000;



app.get('/', (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=denver&units=imperial&appid=579a6c8b76122bf5319c2f49efbb9867";
  https.get(url, (resp)=>{
    console.log(resp.statusCode);
    resp.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const localTemp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(localTemp + " " + description);
    });
  });

  res.send("Hello there!");
});

app.listen(port, ()=>{
  console.log("Server running on port 3000 press ^C to stop");
});
