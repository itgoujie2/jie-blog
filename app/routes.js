var Post = require('./models/post');

module.exports = function(app){

	app.get('/api/posts', function(req, res){

		Post.find(function(err, posts){
			if (err) res.send(err);

			res.json(posts);
		});
	});

	
}