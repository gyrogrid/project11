var express = require('express');
var app = express();
var credentials = require('./creds.js');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());
app.use(function(req, res, next){
	// if there's a flash message, transfer
	// it to the context, then clear it
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/process', function(req, res){
	res.render('index');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});