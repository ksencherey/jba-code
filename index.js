//Reading the .pre file
const { readFileSync } = require("fs");
function syncReadFile(filename) {
  const filecontent = readFileSync(filename, { encoding: "utf-8" });
  //  console.log(filecontent);
  const array = filecontent.split(/\r?\n/).map((row) => {
    return row.split(",");
  });
  console.log(array);
  return array;
}
syncReadFile("cru-ts-2-10.1991-2000-cutdown.pre");

//import mysql
const mysql = require("mysql");

//start express server to retrieve data from the table
const express = require("express");
var app = express();

//import bodyparser
const bodyparser = require("body-parser");

//configure app to use body parser
app.use(bodyparser.json());

//create mysql connection
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "Comelordcome2022!",
  database: "rainfalldb",
  multipleStatements: true,
});

//connect to the DB
mysqlConnection.connect((err) => {
  if (!err) console.log("DB Connection succeeded");
  else
    console.log(
      "DB Connection Failed \n Error: " + JSON.stringify(err, undefined, 2)
    );
});

//starting server
app.listen(3000, () =>
  console.log("Express server is running at port no : 3000")
);

//Get rainfall records
app.get("/rainfalldata", (request, response) => {
  mysqlConnection.query("SELECT * FROM rainfalldata", (err, rows, fields) => {
    if (!err)
      //get the entire rows of data displayed in console
      // console.log(rows);
      //to get a specific row of rainfall data
      // console.log(rows[0].RowID);

      response.send(rows);
    else console.log(err);
  });
});

//Get specific rainfall record
// eg: localhost:3000:rainfalldata/1
app.get("/rainfalldata/:id", (request, response) => {
  mysqlConnection.query(
    "SELECT * FROM rainfalldata WHERE RowID=?",
    [request.params.id],
    (err, rows, fields) => {
      if (!err) response.send(rows);
      else console.log(err);
    }
  );
});

//Delete specific rainfall record
//use postman to post this request
app.delete("/rainfalldata/:id", (request, response) => {
  mysqlConnection.query(
    "DELETE FROM rainfalldata WHERE RowID=?",
    [request.params.id],
    (err, rows, fields) => {
      if (!err) response.send("Deleted successfully");
      else console.log(err);
    }
  );
});

//Insert a rainfall record
app.post("/rainfalldata", (request, response) => {
  let raindata = request.body;
  var sql =
    "SET @RowID = ?; SET @Xref=?; SET @Yref=?; SET @Date=?; SET @Value=?;\
  CALL RainfalldataAddOrEdit(@RowID,@Xref,@Yref,@Date,@Value);";
  mysqlConnection.query(
    sql,
    [
      raindata.RowID,
      raindata.Xref,
      raindata.Yref,
      raindata.Date,
      raindata.Value,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array)
            response.send("Inserted Row id: " + element[0].RowID);
        });
      else console.log(err);
    }
  );
});

//Update a rainfall record
app.put("/rainfalldata", (request, response) => {
  let raindata = request.body;
  var sql =
    "SET @RowID = ?; SET @Xref=?; SET @Yref=?; SET @Date=?; SET @Value=?;\
  CALL RainfalldataAddOrEdit(@RowID,@Xref,@Yref,@Date,@Value);";
  mysqlConnection.query(
    sql,
    [
      raindata.RowID,
      raindata.Xref,
      raindata.Yref,
      raindata.Date,
      raindata.Value,
    ],
    (err, rows, fields) => {
      if (!err) response.send("Updated successfully");
      else console.log(err);
    }
  );
});
