//================================================================
//                        SETUP
//================================================================
var express = require('express');
//
var router = express.Router();
//
var pg = require('pg');
//
var connectionString = 'postgres://localhost:5432/todo'
//================================================================
//                 EXTERNAL FUNCTIONALITY
//================================================================
module.exports = router;

//====================vvv=====Variables=====vvv======================
//
//====================vvv=====ROUTER CALLS===vvv=====================

//

router.get('/', function(req, res) {
  //console.log("GET "/tasks  "/tasks");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      return res.sendStatus(500);
    }

    client.query('SELECT * FROM list', function(err, result) {
      done();

      if(err) {
        console.log("Query failed: ", err);
        return res.sendStatus(500);
      }
      console.log("result: ", result.rows);
      return res.send(result.rows);
    })
  })
});

router.post('/', function(req, res) {
  var singleTask = req.body;
  console.log("Body: ", singleTask);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      return res.sendStatus(500);
    }

    client.query('INSERT INTO list (list_name, list_description, list_status)'
                 + 'VALUES($1, $2, $3)',
                 [singleTask.list_name, singleTask.list_description, singleTask.list_status],
                  function(err, result) {

      console.log(singleTask.list_name);
      console.log(singleTask.list_description);
      console.log(singleTask.list_status);

      done();

      if(err) {
        console.log("Query failed: ", err);
        return res.sendStatus(500);
      }
      return res.sendStatus(201);
    })
  })
});
//
// router.post('/', function(req, res) {
//   console.log('request: ', req.body);
//   cats.push(req.body);
//   res.sendStatus(201);
// });
//
//
// router.get('/', function(req, res) {
//   res.send(cats);
// });
//
//
//
// //app.js file has app.use('/cats', cats);
