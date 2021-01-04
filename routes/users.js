var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/auth');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'database_mongodb';

/* GET users listing. */
router.get('/', function(req, res, next) {

  // var x = 97 + 91;
  // res.send('respond with a resource ' + x);

  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);
      
    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.find({}).toArray(function(er, ds_user){
      if(er)
        console.log(er);

      res.json({'xu_ly': 'danh sach user', 'data': ds_user});
      client.close();
    });
  });

  // res.json({
  //   "data": "danh sach user " + JSON.stringify(req.query)
  // });

  // var data = {
  //   data: "boylove"
  // };
  // res.json(data);

});

router.post('/', authenticate.auth, (req, res) => {
  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.insertMany(req.body, () => {
      res.json({
        'xu_ly': 'update nhieu user 1 luc ', 
        data_send: req.body
      });
    });
  });  
  // res.json({'xu_ly': 'import nhieu user 1 luc'});
});  //insert

router.put('/', (req, res) => {
  res.json({'xu_ly': 'update nhieu user 1 luc'});
});   //create or update

router.delete('/', (req, res) => {
  res.json({'xu_ly': 'delete nhieu user 1 luc'});
});//delete

// router.all();   //thich cai nao run cai do
// router.patch(); //move
// router.head();  //send before to get token
// router.options();//checked server
// router.purge(); //re-checked server

module.exports = router;