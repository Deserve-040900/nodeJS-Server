var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'database_mongodb';

var authenticate = (req, res, next) => {
  var authenticate = req.header('Authorization');
  var array_auth = authenticate.split(' ');

  // console.log(array_auth[1]);
  var string_basic_auth = array_auth[1];
  var data_string_auth = (new Buffer(string_basic_auth, 'base64')).toString();
  // console.log(data_string_auth);

  var user_info = data_string_auth.split(':');
  if(user_info[0] == "xuannguyen" && user_info[1] == '040900'){
    next();
  }
  else{
    res.status(401);
    res.json({
      'error': true,
      'error_message': "you don\'t have permission"
    });
  }
}

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
});//insert

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
});//create or update  

router.post('/', authenticate, (req, res) => {
  console.log(ahihi.length);
  res.json({'xu_ly': 'them user moi ', data_send: req.body});
});//delete

router.post('/sign-up', (req, res) => {
  res.json({
    'xu_ly': 'dang ky user moi ', 
    data_send: req.body
  });
});

module.exports = router;