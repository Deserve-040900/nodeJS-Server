module.exports = {
    auth: (req, res, next) => {
        //console.log(req.header('Authenticate));
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
}