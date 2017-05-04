var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    title: String,
    desc: String,
    body: String,
    user: String,
    date: String
});

module.exports = mongoose.model('Post', PostSchema);