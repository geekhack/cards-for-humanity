var async = require('async');
//add a jwt
var jwt = require('jsonwebtoken');
//get the config for this
var config = require('./config');


module.exports = function(app, passport, auth) 
{
    //User Routes
    var users = require('../app/controllers/users');

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/chooseavatars', users.checkAvatar);
    app.get('/signout', users.signout);

    //Setting up the users api//////////////has been replaced by the new method////////////////////////
    //app.post('/users', users.create);

    app.post('/users/avatars', users.avatars);

    // Donation Routes
    app.post('/donations', users.addDonation);

    ///////////haxs been replaced by the new session :)
    //app.post('/users/session',users.session);

    //process the user login here */
    app.post('/users/session',users.session_new);

      /* login the user. */
    app.get('/api/auth/login', function(req, res, next) 
    {   
       res.redirect('/');
    });
///////////////////////////////////////////CREATE USER///////////////////////////////////////////
    //create the user first
    app.post('/users',users.create_user);

    /* for user signup. *////////////////////////////////////////////////////////
    app.get('/api/auth/signup',function(req,res,next)
    {
        return res.redirect('/#!/');
    });
///////////////////////////////////////////////////////////////////////////////

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    // Answer Routes
    var answers = require('../app/controllers/answers');
    app.get('/answers', answers.all);
    app.get('/answers/:answerId', answers.show);
    // Finish with setting up the answerId param
    app.param('answerId', answers.answer);

    // Question Routes
    var questions = require('../app/controllers/questions');
    app.get('/questions', questions.all);
    app.get('/questions/:questionId', questions.show);
    // Finish with setting up the questionId param
    app.param('questionId', questions.question);

    // Avatar Routes
    var avatars = require('../app/controllers/avatars');
    app.get('/avatars', avatars.allJSON);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/play', index.play);
    app.get('/', index.render);

};
