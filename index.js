var path = require('path');
var express = require('express')
var routes = require('./routes/index');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express()
app.use(cookieParser('movie'));
app.use(session({
    secret: 'movie',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * set Views layout
 */

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

/**
 * set Routes
 */
app.get('/', routes.index);
app.post('/signup', routes.signup);

app.post('/login', routes.doLogin);
app.post('/search', routes.search);

app.get('/order', routes.order);
app.get('/orderlist', routes.orderlist);

app.get('/detail', routes.detail);
app.post('/buy', routes.buy);
app.get('/movielist', routes.movielist);
app.get('/getSold', routes.getSold);

app.get('/admin', require('./routes/admin/index').index);
app.get('/admin/login', require('./routes/admin/login').login);
app.post('/admin/login', require('./routes/admin/login').dologin);
app.get('/admin/logout', require('./routes/admin/login').adminlogout);

app.use('/admin/user', require('./routes/admin/user'))
app.use('/admin/movie', require('./routes/admin/movie'))
app.use('/admin/order', require('./routes/admin/order'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))
app.use(express.static("static"));
app.use(express.static('uploads'))