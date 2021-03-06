var express = require('express');

var bodyParser = require('body-parser');

var Router = require('./routes');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
var cors=require("cors")
app.use(cors())
// view engine setup
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/

//加载主外键关系及创建数据库
require('./models/ref');

Router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status: 0,
        data: err.message
    });
});

module.exports = app;
