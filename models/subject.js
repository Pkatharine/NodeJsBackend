const mongoose = require('mongoose');
var Group = require("./group");
var Teacher = require("./teacher");


var Subject = mongoose.model('subject', {
    name:{ type : String},
    teacher:{ type : Teacher},
    group:{ type : Group},
});
module.exports = {Subject};