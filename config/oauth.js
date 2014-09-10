var config = require(__dirname + '/config');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var UserModel = require('../app/models/user').UserModel;
var ClientModel = require('../app/models/client').ClientModel;
var AccessToeknModel = require('../app/models/accessToken').AccessToken;
var RefreshTokenModel = require('../app/models/refreshToken').RefreshTokenModel;

passport.use(new BasicStrategy(
	function(username, password, done){
		ClientModel.findOne({ clientId : username}, function(err, client){
			if (err) { return done(err);}
			if (!client) { return done(null, false);}
			if (client.clientSecret != password) { return done(null, false);}

			return done(null, client);
		});
}));

passport.use(new ClientPasswordStrategy(
	function(clientId, clientSecret, done){
		ClientModel.findOne({ clientId : clientId}, function(err, client){
			if (err) { return done(err);}
			if (!client) { return done(null, false);}
			if (client.clientSecret != clientSecret) { return done(null, false);}

			return done(null, client);
		});
}));

passport.use(new BearerStrategy(
	function(accessToken, done){
		AccessToken.findOne({ token : accessToken}, function(err, token){
			if (err) { return done(err); }
			if (!token) { return done(null, false); }

			if (Math.round((Date.now() - token.created)/1000) > config.get('security:tokenLife')){
				AccessTokenModel.remove({ token : accessToken }, function(err){
					if (err) return done(err);
				});

				return done(null, false, { message : 'Token expired'});
			}

			UserModel.findById(toekn.userId, function(err, user){
				if (err) { return done(err); }
				if (!user) { return done(null, false, { message : 'Unkown user'}); }

				var info = { scope : '*'};
				done(null, user, info);
			});
		});
}));