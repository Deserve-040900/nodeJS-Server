var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // var x = 97 + 91;
  // res.send('respond with a resource ' + x);

  res.json({
    "data": "danh sach user " + JSON.stringify(req.query)
  });

  // var data = {
  //   data: "boylove"
  // };
  // res.json(data);

});

router.post('/', (req, res) => {
  res.json({'xu_ly': 'import nhieu user 1 luc'});
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