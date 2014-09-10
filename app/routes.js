var Post = require('./models/post');
var User = require('./models/user');
var mongoose = require('mongoose');
var oauth2 = require('../config/oauth2');

require('../config/oauth');

module.exports = function(app, passport){

	app.get('/api/post/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});

	app.get('/api/posts', function(req, res){

		Post.find(function(err, posts){
			if (err) res.send(err);

			res.json(posts);
		});
	});

	app.post('/api/posts', function(req, res){

		Post.create({
			title : req.body.title,
			text : req.body.text
		}, function(err, posts){
			if (err) res.send(err);

			Post.find(function(err, posts){
				if (err) res.send(err);

				res.json(posts);
			});
		});
	});

	app.delete('/api/posts/:id', function(req, res){
		Post.remove({
			_id : req.params.id
		}, function(err, post){
			if (err) res.send(err);

			Post.find(function(err, posts){
				if (err) res.send(err);

				res.json(posts);
			});
		});
	});

	app.put('/api/posts/:id', function(req, res){
		Post.update({_id : req.params.id}, {
			title : req.body.title,
			text : req.body.text
		}, function(err, number, response){
			if (err) res.send(err);

			Post.find(function(err, posts){
				if (err) res.send(err);

				res.json(posts);
			});
		});
	});

	// app.post('/signup', function(req, res, next) {
	// 	console.log(req.body.email);
	//   User.create({
	//   	email : req.body.email,
	//   	password : req.body.password
	//   }, function(err, user){
	//   	if (err) res.send(err);

	//   });
	//   res.send(200);
	// });
	app.post('/signup', function(req, res, next){

		var user = new User({
			email : req.body.email,
			password : req.body.password
		});

		user.save(function(err){
			if (err) {
				console.log(err);
				return next(err);
			}

			res.send(200);
		});
	});


	app.get('*', function(req, res){
		res.redirect('/');
	});

	// app.post('/login', passport.authenticate('local-login'), function(req, res){
	// 	//res.redirect('/');
	// 	console.log('yes');
	// 	//res.status(200).end();
	// 	res.json({user : req.user});
	// });
	app.post('/login', function(req, res){
		console.log('called'),
		oauth2.token	
	});


	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on 
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
}