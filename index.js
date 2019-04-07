var path = require('path');
var express = require('express')
var routes = require('./routes/index');

var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express()

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
app.get('/signup', routes.signup);
app.get('/login', routes.login);
app.get('/order', routes.order);
app.get('/detail', routes.detail);
app.post('/buy', routes.buy);
app.get('/admin', require('./routes/admin/index').index);
app.get('/admin/login', require('./routes/admin/login').login);
app.get('/admin/register', require('./routes/admin/login').register);
app.get('/admin/register', require('./routes/admin/login').register);
app.use('/admin/user', require('./routes/admin/user'))
app.use('/admin/movie', require('./routes/admin/movie'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))
app.use(express.static("static"));
app.use(express.static('uploads'))