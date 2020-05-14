const express = require('express');
const router = express.Router();

const passport= require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//SIGNUP
router.get('/sesion', isNotLoggedIn, (req, res) => {
    res.render ('auth/sesion');
});

router.post('/sesion', isNotLoggedIn, passport.authenticate('local.sesion', {
    successRedirect: '/profile',
    failureRedirect: '/sesion',
    failureFlash: true
   
}));

//SIGIN
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});



module.exports= router;

/*req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if(errors.length > 0){
        req.flash('message', errors[0].msg);
        res.redirect('/login');
    }*/ 