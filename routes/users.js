var express = require('express');
var router = express.Router();
//import Login from '../src/common//Login.jsx'



// Register -------------------------------------------------------------



// Login -------------------------------------------------------------
router.get('/Login', function (req, res) {

    res.render('Login'); // load the single view file (angular will handle the page changes on the front-end)
});

/*router.post('/register', function(req, res) {
   var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
		req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

console.log(name)
	var errors = req.validationErrors();
      	if(errors){
			  console.log("errors are there")
		res.render('register',{
			errors:errors
			
		});
	} else {
		console.log("success")
	}
});*/

module.exports = router;