var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:postgres@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})

app.get('/api/users', function(req, res){
  db.getUsers(function(err, response){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(response);
    }
  });
});

app.get('/api/vehicles', function(req, res) {
  db.getVehicles(function(err, response){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(response);
    }
  });
});

app.post('/api/users', function(req, res) {
  var value = [ req.body.firstname,
                req.body.lastname,
                req.body.email
  ];
  db.createUser(value, function(err, response){
    if (err){
      res.status(500).json(err);
    } else {
      res.status(200).json(response);
    }
  })
});

app.post('/api/vehicles', function(req, res){
  var value = [ req.body.make,
                req.body.model,
                req.body.year,
                req.body.ownerId
  ];
  db.createVehicle(value, function(err, response){
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(response);
    }
  });
});

app.get('/api/user/:userId/vehiclecount', function(req, res){
  db.getVehicleCount([req.params.userId], function(err, response){
    if(err){
      res.status(500).json(err)
    } else {
      res.status(200).json(response[0]);
    }
  })
});

app.get('/api/user/:userId/vehicle', function(req, res){
  db.getUserVehicle([req.params.userId], function(err, response){
    if(err) {
      res.status(500).json(err)
    }
    else {
    res.status(200).json(response);
  }
  })
})

app.get('/api/vehicle', function (req, res) {
  if (req.query.UserEmail) {
    db.getVehicleByEmail([req.query.UserEmail], function (err, response) {
      if (err) {
        res.status(500).json(err)
      }
      else {
        res.status(200).json(response);
      }
    })
  }
  if (req.query.userFirstStart) {
    db.getVehicleByFirstName([req.query.userFirstStart], function (err, response) {
      if (err) {
        res.status(500).json(err)
      }
      else {
        res.status(200).json(response);
      }
    })
  }
});

app.get('/api/newervehiclesbyyear', function(req, res){
  db.getNewerVehicle(function(err, response){
    if (err) {
      res.status(500).json(err)
    }
    else {
    res.status(200).json(response);
    }
  })
});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
  db.updateOwnership([req.params.vehicleId, req.params.userId], function(err, response){
    if (err){
      res.status(200).json(err)
    }
    else{
    res.status(200).json(response);
    }
  })
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
  db.deleteOwnership([req.params.userId, req.params.vehicleId], function(err, response) {
    if (err) {
    res.status(500).json(err)
  }
  else {
    res.status(200).json(response);
    }
  })
});

app.delete('/api/vehicle/:vehicleId', function(req, res){
  db.deleteVehicle([req.params.vehicleId], function(err, response){
    if (err) {
      res.status(500).json(err)
    }
    else {
    res.status(200).json(response)
    }
  })
});


// app.listen('3000', function(){
//   console.log("Successfully listening on : 3000")
// })

module.exports = app;
