//insert.example
// include mysql module
const mysql = require('mysql');

// create a connection variable with the required details
const con = mysql.createConnection({
  host: process.env.DB_HOST, // ip address of server running mysql
  user: process.env.DB_USERNAME, // user name to your mysql database
  password: process.env.DB_PASSWORD, // corresponding password
  database: process.env.DB_NAME, // use the specified database
  port: process.env.DB_PORT,
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