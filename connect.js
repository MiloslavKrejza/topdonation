//sql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_db"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});

var post  = {name:"HH", address: "LOL"};
    
var query = con.query('INSERT INTO customers SET ?', post, function (error, results, fields) {
       if (error) throw error;
     // Neat!¨
      console.log("inserted");
   });



