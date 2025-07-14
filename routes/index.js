const paypal = require('paypal-rest-sdk');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
;

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': 'ARjAHZ4MMUMpQLAKIMl9t7iXfzsCT7Sbb4JWIHHvMFMV_b5gMRj6tgXPSiOnJJ9b9AYDLbYhp7Hq5g9X',
  'client_secret': 'EHPfJO_28xfA8J6hG4Dvb8-yN8i91KuyvN5SuUWQPKsrfpC-teSZ1CypOooeU7oSIFrSMLWWk1EgHuVo'
});

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
  
 

router.use(bodyParser.urlencoded({extended:true}));

/* GET home page. */
router.get('/lol', function(req, res, next) {
    var readme = fs.readFileSync("readme.txt", "utf8");
    console.log(readme);
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
    let sql = 'SELECT * FROM customers ORDER BY amount DESC';
    let query = con.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        // res.sendfile('views/index.h', { data: results });
        res.render("index", {data: results})
    });
  
});

router.post('/todo', function(req,res){
     
  console.log(req.body.data);





  
   fs.writeFileSync("top.txt", req.body.data);

    //    var stream = fs.createWriteStream("myfile.txt");
    //    stream.once('open', function(fd) {
    //      stream.write(req.body.name + ":");
    //      stream.write(req.body.data+"\n");
    //      stream.end();
    //    });
    

  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donation",
                "price": "25.00",
                "currency": "CZK",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "CZK",
            "total": "25.00"
        },
        "description": ""
    }]
};

create_payment_json.transactions[0].amount.total = req.body.data + ".00";
create_payment_json.transactions[0].item_list.items[0].price = req.body.data + ".00";
create_payment_json.transactions[0].description = req.body.name;

console.log(create_payment_json);

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
      

  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});


router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "CZK",
              "total": "25.00"
          }
      }]
    };
    const suma = fs.readFileSync("top.txt", "utf8");
    execute_payment_json.transactions[0].amount.total = suma; 
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
       } else {

          const post = {
              name: payment.payer.payer_info.shipping_address.recipient_name,
              amount: payment.transactions[0].amount.total
          };
          const query = con.query('INSERT INTO customers SET ?', post, function (error, results, fields) {
              if (error) throw console.error(error);

              // Neat!¨
              console.log("inserted");
          });
          console.log(payment.payer.payer_info.shipping_address.recipient_name);
          console.log(payment.transactions[0].amount.total)
          res.send(payment);
        //   res.redirect("/home");
      }
  });
  });
  



module.exports = router;
