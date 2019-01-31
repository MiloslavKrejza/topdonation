//insert.example
// include mysql module
var mysql = require('mysql');
 
// create a connection variable with the required details
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "12345", // corresponding password
  database: "my_db", // use the specified database
  port:3000
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
  con.query("INSERT INTO `payment` (`id`, `amount`) VALUES (NULL, '99'))", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
}); 