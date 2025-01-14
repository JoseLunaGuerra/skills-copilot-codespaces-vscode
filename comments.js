//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', function (req, res) {
  res.send(comments);
});

app.post('/comments', function (req, res) {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('Comment added');
    }
  });
});

app.listen(3000, function () {
  console.log('Server running at http://