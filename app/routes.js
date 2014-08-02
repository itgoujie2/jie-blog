var Post = require('./models/post');
var mongoose = require('mongoose');

module.exports = function(app){

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
}