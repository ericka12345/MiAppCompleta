const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {title, url, description } = req.body;
    const newlink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
await pool.query('INSERT INTO LINKS set ?', [newlink]);
req.flash('success', 'Link saved successfully');
    res.redirect('/links');

});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM LINKS WHERE user_id = ?', [req.user.id]);
    
    res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM LINKS WHERE ID = ? ', [id]);
    req.flash('success', 'Link Removed successfully');
    res.redirect('/links');

})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM LINKS WHERE ID = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});

});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newlink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE LINKS set ? WHERE id = ?', [newlink, id]);
    req.flash('success', 'Link Updated successfully');
    res.redirect('/links');
});
module.exports = router;