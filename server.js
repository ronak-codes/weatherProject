const express = require("express");
// https is native nodeJs module it means we do not have to download and install it using npm install instead directly use it by require("https") method
const https = require("https");
//  body-parser is used to parse the post request made to the server from the client
// using bodyParser we can fetch the value of input fields given by the user
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get('/',function(req,res)
{
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res)
{
  const query = req.body.cityName;
  const apiKey ="e834ff7827234ed79ec53206cdc79ffa"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response)
  {
    console.log(response.statusCode);
    // JSON.parse() is used to convert any data into Javascript object notation format
    //JSON.Stringify() for converting Javascript objects into json formats
    response.on("data",function(data)
    {
      const weatherData = JSON.parse(data);
      const temperature= weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
      res.write("<body style='background:lightblue;margin:0;'><body>");
      res.write("<div style='background:#4666;'>");
      res.write("<center><h1>Weather Statistics of : "+ query + "<h1><center>");
      res.write("<center>Weather is  : " + description+"</center>");
      res.write("<center>Temperature is  : "+temperature+"<center>");
      res.write("<center><img src ="+imageUrl+"></center>");
      res.write("</div>")
      res.send();
    })

  });
})

app.listen(3000,function()
{
  console.log("Server is running at port number 3000");
});
