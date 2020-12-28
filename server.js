// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Above code is forked from freeCodeCamp
// Below is the start of jun's code

// An empty date parameter should return the current time in a JSON object with a unix & utc key
app.get("/api/timestamp/", (request, response) => {
  // Return the primitive value of a Date object in milliseconds
  const unixVal = new Date().valueOf();
  // Convert Date object to a string based on universal time
  const utcVal = new Date().toUTCString();
  // Create JSON Object to display
  response.json({
    unix: unixVal,
    utc: utcVal
  });
});
// If date parameter is not empty 
app.get("/api/timestamp/:whatever", (request, response) => {
  // input is whatever string typed after /api/timestamp/
  const input = request["params"]["whatever"];
  // Initialize an empty output object
  let outputObject = {};
  // Initialize inputDate variable
  let inputDate;
  //console.log(new Date(input));
  // Date can be successfully parsed by new Date(date_string)
  if(new Date(input)){
    //console.log("-valid date-");
    // If there is a "-" in the input (e.g. 2015-12-25),
    const dashRegex = /[-]/;
    // or there is a space (e.g. Mar 25 2015)
    const spaceRegex = /\s/;
    //if(input.includes("-") === true || input.includes(" ") === true) {
    if(dashRegex.test(input) === true || spaceRegex.test(input) === true) {
      // Convert to Date Object
      inputDate = new Date(input);
    }
    // If input date string is "1451001600000" as string
    else {
      // Convert input string to number first
      inputDate = new Date(parseInt(input));
    }
    // Return the primitive value of a Date object in milliseconds
    outputObject["unix"] = inputDate.valueOf();
    // Convert Date object to a string based on universal time
    outputObject["utc"] = inputDate.toUTCString();
  }
  //console.log(outputObject["unix"]);
  //console.log(outputObject["unix"]);
  // If input date string is invalid
  if(!outputObject["unix"] || !outputObject["utc"]) {
    response.json({ error : "Invalid Date" });
  }
  // Create JSON Object to display
  response.json(outputObject);
});