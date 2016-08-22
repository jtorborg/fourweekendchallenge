//================================================================
//                        SETUP
//================================================================


var express =  require('express');  //create variable looks in node folder to for express
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Our routes
var tasks = require("./routes/tasks");



app.use(bodyParser.urlencoded({ extended: true }));   //Must come after route variables

//================================================================
//                  ROUTE CONNECTION & USE
//================================================================

app.use('/tasks', tasks);

//=================
 //==================MOVED TO MODULE==================
//================= any app.post or app.get files should be moved to routes and renamed.


//================================================================
//                    STATIC STUFF
//================================================================
// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port')); //actively listening for requests
});
