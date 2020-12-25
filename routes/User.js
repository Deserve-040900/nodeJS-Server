var express = require('express');
var router = express.Router();

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
});  //insert

router.get('/:id_user', (req, res) => {
  res.json({'xu_ly': 'thong tin user ' + req.params.id_user});
});   //create or update

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