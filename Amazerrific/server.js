var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    ToDosController = require('./controllers/ToDoController');
    
var app = express();
app.use(bodyParser.urlencoded({"extended" : "true"}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
http.createServer(app).listen(3000);

app.get('/ToDos.json', ToDosController.index);
app.post('/ToDos', ToDosController.create);
app.put('/ToDos/:id', ToDosController.update);
app.delete('/ToDos/:id', ToDosController.destroy);
app.get('/Tags', ToDosController.tags);
app.get('/findByTag/:tag', ToDosController.findByTag);