var express = require('express');
var router = express.Router();
var authenticate = require('../middleware/auth');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'database_mongodb';

router.get('/', (req, res) => {
  res.json({'xu_ly': 'thong tin user'});
  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.find({}).toArray(function(er, ds_user){
      if(er)
        console.log(er);

      res.json({'xu_ly': 'thong tin user', 'data': ds_user});
      client.close();
    });
  });  
}); //insert

router.get('/:id_user', (req, res) => {
  res.json({'xu_ly': 'thong tin user' + req.params.id_user});
  MongoClient.connect(url, function(err, client){
    if(err)
      console.log(err);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.findOne({'email': req.params.id_user},function(err, ds_user){
      if(err)
        console.log(err);

      res.json({'xu_ly': 'thong tin user', 'data': info_user});
      client.close();
    });
  });  
}); //create or update  

router.post('/', authenticate.auth, (req, res) => {
  // console.log(ahihi.length);
  res.json({'xu_ly': 'them user moi ', data_send: req.body});
}); //delete

router.post('/sign-up', (req, res) => {
  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.insertOne(req.body, () => {
      res.json({
        'xu_ly': 'dang ky user moi ', 
        data_send: req.body
      });
    });
  });  
});

router.put('/:email', (req, res) => {
  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.updateOne({email: req.params.email}, {$set: req.body}, () => {
      res.json({
        'xu_ly': 'update user ' + req.params + ' thành công', 
        data_send: req.body
      });
    });
  });
}); //create or update

router.delete('/:email', authenticate.auth, (req, res) => {
  console.log(req.params.email);
  
  MongoClient.connect(url, function(er, client){
    if(er)
      console.log(er);

    const db = client.db(dbName);
    const collection_user = db.collection('users');
    collection_user.deleteOne({email: req.params.email}, () => {
      res.json({
        'xu_ly': 'delete user ' + req.params.email + ' thành công', 
        data_send: req.body
      });
    });
  });
}); //delete

module.exports = router;