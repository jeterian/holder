const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('get request');
	res.render('index', {
		tweets : req.tweets,
        users : req.users,
        friendsCount : req.friendsCount,
        messages : req.messages,
        screen_name : req.screen_name,
        profile_banner : req.profile_banner,
        profile_image : req.profile_image_url,
	});
	console.log(profile_banner);
});

router.post('/', (req, res, next) => {
	res.render('index', {
		tweets : req.tweets,
        users : req.users,
        friendsCount : req.friendsCount,
        messages : req.messages,
        screen_name : req.screen_name,
        profile_banner : req.profile_banner,
        profile_image : req.profile_image_url,
        tweet : req.body.tweet
	});
});

module.exports = router;