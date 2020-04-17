const mongoose = require('mongoose');
var Teacher = require("./teacher");
var Student = require("./student");
var Subject = require("./subject");

var Mark = mongoose.model('mark', {
    mark:{ type : Number},
    student: {type:Student},
    subject: {type: Subject},
    teacher: {type: Teacher},
});
module.exports = {Mark};