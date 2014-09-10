var mongoose = require('mongoose');
var config = require('./config/config');
var UserModel           = require('./app/models/user').UserModel;
var ClientModel         = require('./app/models/client').ClientModel;
var AccessTokenModel    = require('./app/models/accessToken').AccessTokenModel;
var RefreshTokenModel   = require('./app/models/refreshToken').RefreshTokenModel;
var faker               = require('Faker');

mongoose.connect(config.get('mongoose:url'));

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "itgoujie2", password: "a19880129" });
    user.save(function(err, user) {
        if(err) return log.error(err);
        else console.log("New user - %s:%s",user.username,user.password);
    });

    for(i=0; i<4; i++) {
        var user = new UserModel({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else console.log("New user - %s:%s",user.username,user.password);
        });
    }
});
