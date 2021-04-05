const express = require('express');
const app = express();
const https = require('https');
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //res.send("Hello there!");
});

app.post("/", (req, res)=>{

  const query = req.body.cityName;
  const apiKey = "";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=" + apiKey;
  https.get(url, (resp)=>{
    console.log(resp.statusCode);
    resp.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const localTemp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(localTemp + " " + description);
      res.write("<p>We are having " + description + " today.</p>");
      res.write("<h1>The temperature in " + query + " is " + localTemp +
               " Degrees fahrenheit.</h1>");
      res.write("<img src='" + imgUrl + "'</>");
      res.send();
    });
  });
});

/*

*/

app.listen(port, ()=>{
  console.log("Server running on port 3000 press ^C to stop");
});
