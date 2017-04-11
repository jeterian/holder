'use strict';

// General Setup: Plugins, Variables, Etc.
const express = require('express');
const app = express();
const path = require('path');
const bodyPar = require('body-parser');
const twitter = require('./twitter.js');
const routes = require('../routes/index.js');
const config = require('./config.js');
const Twit = require('twit');
const socket = require('socket.io');


const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

// View Engine, Static Directory
app.set('views', path.join(__dirname, "..", "views"));
app.set('view engine', 'pug');
app.use(bodyPar.json());
app.use(bodyPar.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Router
app.use('/', routes);

// Middleware to get information from Twitter
app.use(twitter.getUser({url: 'account/settings'}));
app.use(twitter.getCredentials({url: 'account/verify_credentials'}));
app.use(twitter.getRecentTweets({url: 'statuses/home_timeline', count: 5}));
app.use(twitter.getFriends({url: 'friends/list', count: 5}));
app.use(twitter.getDirectMessages({url: 'direct?messages', count: 5}));
app.use(twitter.postTweet({url: 'statuses/update'}));

// ERRORS
	// 404

	app.use((req, res, next) => {
		const err = new Error('Page not found');
		err.status = 404;
		next(err);
	});

	// 500 
	if (app.get('env') === 'development') {
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			status: err.status
		});
	});

// Server
var server = app.listen(3000, function() {
	console.log('Server is running on port 3000')
});

var io = socket.listen(server);


module.exports = app;








