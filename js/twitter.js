
// Twit authentication information
const Twit = require('twit');
const config = require('./config.js');
const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

// Module get User data from Twitter
module.exports.getUser = (request) => {
	return (req, res, next) => {
		T.get(request.url, function (err, data, res) {
			if(!err){
				req.screen_name = data.screen_name;
				next();
			} else {
				console.error(err.message);
			}
		});
	}
};

module.exports.getCredentials = (request) => {
	return (req, res, next) => {
		T.get(request.url, function (err, data, res) {
			if(!err){
				req.profile_image_url = data.profile_image_url;
				req.profile_banner = data.profile_banner;
				next();
			} else {
				console.error(err.message);
			}
		});
	}
};

// Module to get Tweets
module.exports.getRecentTweets = (request) => {
	return (req, res, next) => {
		T.get(request.url, {count: 5}, function (err, data, res) {
			if(!err) {
				req.tweets = data;
				next();
			} else {
				console.error(err.message);
			}
		});
	} 
};

// Module to get Friends
module.exports.getFriends = (request) => {
	return (req, res, next) => {
		T.get(request.url, {count: 5}, function (err, data, res) {
			if(!err){
				req.users = data.users;
				next();
			} else {
				console.error(err.message);
			}
		});
	}
} ;

// Module to get Direct Messages
module.exports.getDirectMessages = (request) => {
    return (req, res, next) => {
        T.get(request.url, {count : 5}, function (err, data, res) {
            if(!err){
                req.messages = data;
                next();
            } else {
                console.error(err.message);
            }
        });
    }
};

// Module to post Tweet
module.exports.postTweet = (request) => {
    return (req, res, next) => {
        if (req.body.tweet === undefined) {
            return next();
        }
        T.post(request.url, {status: req.body.tweet}, (err, data, response) => {
            if (data) {
                console.log('Posted tweet.');
                res.json({status : 200, message : 'OK'})
            }
        });
    }
};

