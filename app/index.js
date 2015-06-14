
var express = require('express')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , path = require('path')
  

var app = express()
  , http = require('http').Server(app)
  , PORT = process.env.PORT || 3000


// Set up express server
app.set('trust proxy', 1);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/../build')));



/*************
 *          *
 *  Routes  *
 *          *
 * **********/

app.get('*'
  , function(req, res){
      res.render('main');
  });


http.listen(PORT, function(){
  console.log('Listening on port', PORT);
});
