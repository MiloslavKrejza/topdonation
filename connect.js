//sql
const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    const sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});

const post = {name: "HH", address: "LOL"};

const query = con.query('INSERT INTO customers SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!¨
    console.log("inserted");
});



