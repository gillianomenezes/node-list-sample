var mongoose = require('mongoose'),
    mongoUrl = "mongodb://localhost/amazeriffic";

// connect to the amazeriffic data store in mongo
mongoose.connect(mongoUrl);

var TodoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model('ToDo', TodoSchema);

module.exports = ToDo;