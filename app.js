var express = require('express')
, path = require('path')
, morgan = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, fs = require('fs')
, FileStreamRotator = require('file-stream-rotator');
var util = require('util');

var app = express();

var logDirectory = path.join(__dirname, 'log')
var log_stdout = process.stdout;
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'clarifai-access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
var appLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'app-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
var errLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'err-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: accessLogStream}));

console.log = function(data) { //
  var d = new Date();
  var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0"+ d.getDate()).slice(-2)+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + (d.getMinutes())).slice(-2) + ":" + ("0" + (d.getSeconds())).slice(-2);
  appLogStream.write(datestring + " " + util.format(data) + '\n');
  // log_file.write(util.format(d) + '\n');
  log_stdout.write(datestring + " " + util.format(data) + '\n');
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MainRouter = require('./lib/routers/main_router');
var mainRouter = new MainRouter();

app.use('/', mainRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err)
    var d = new Date();
    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0"+ d.getDate()).slice(-2)+ " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + (d.getMinutes())).slice(-2) + ":" + ("0" + (d.getSeconds())).slice(-2);

    errLogStream.write(datestring + " " + util.format(err) + '\n');
  });
}*/

module.exports = app;
