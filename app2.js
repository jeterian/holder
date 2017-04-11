	'use strict';

	// Set Up (Packages, variables, etc.)
	const express = require('express');
	const Twit = require('twit');
	const pug = require('pug');
	const config = require('./config.js');

	var app = express();
	var friends;
	var timeLine;
	var messages;

	// View Engine, Directories for Static Resources and Templates
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/templates');

	// Server
	app.listen(3000, function() {
		console.log("Server is running on port 3000.");
	});

	// Main Page Handler
	app.get('/', function(req, res) {
		req.timelineTweets.then(function(info) {
			timeLine = info.data;
		
			req.directMessages.then(function(info) {
				message = info.data;
				
				req.followingUsers.then(function(info) {
					friends = info.data.users;

					res.render(__dirname + '/templates/index.pug',)
				})
			})
		})
	});

	// Receiving Data
	app.use((req, res, next) => {
		const login = twit.getUser(config);

		req.directMessages = twit.getDirectMessages(login);
		req.timelineTweets = twit.getTimeline(login);
		req.followingUsers = twit.getFollowing(login);
		next();
	});

	// Twit Plugin
	function getLogin(config) {
		return Twit(config);
	}

	function getTL(user) {
		return user.get('statuses/user_timeline', { screen_name: user.screen_name, count: 5});
	}

	function getMessages(user) {
		return user.get('direct_messages/sent', {screen_name: user.screen_name, count: 5});
	}

	function getFriends(user) {
		return user.get('friends/list', { screen_name: user.screen_name, count: 5 });
	}

	
