var express = require('express');
var app = express();




var fs = require('fs'); // this engine requires the fs module
app.engine('html', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', ''+ options.title +'')
    .replace('#message#', ''+ options.message +'');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'html'); // register the template engine



app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/about', function (req, res) {
  res.render('about', { title: 'Hey', message: 'Hello there!'});
});


var birds = require('./birds');
app.use('/birds', birds);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});