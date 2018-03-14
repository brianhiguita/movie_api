var express = require("express");
var app = express();
var request = require("request");

app.set('port', (process.env.PORT || 5000))

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res){
  res.render("search");
});


app.get("/results", function(req, res){
  var query = req.query.search
  var url = "http://www.omdbapi.com/?apikey=3cfe2a5f&&t=" + query;



  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      res.render("results", {data: data});
    }
  });
});



// FOR LOCAL USE 
app.listen(3000, function(){
  console.log("server has started");
});



// FOR HEROKU

// app.listen(app.get('port'), function() {
//   console.log('app is running on', app.get('port'))
// });
