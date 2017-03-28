var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

/* Create a database variable outside of the database connection callback 
*  to reuse the connection pool in your app. */
var db;

/* Connect to the database before starting the application server. */
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  /* Save database object from the callback for reuse. */
  db = database;
  console.log("Database connection ready");

  /* Initialize the app. */
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});// end of mongo connect



/* CONTACTS API ROUTES BELOW */
/* Generic error handler used by all endpoints.*/
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/* GET route finds all contacts */
app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});// end of GET all


/* POST route creates a new contact */
app.post("/api/contacts", function(req, res) {
  var newContact = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});// end of POST


/* GET route find contact by id */
app.get("/api/contacts/:id", function(req, res) {
});

/* PUT route updates contact by id */
app.put("/api/contacts/:id", function(req, res) {
});

/* DELETE route deletes contact by id */
app.delete("/api/contacts/:id", function(req, res) {
});
// end of ROUTES

