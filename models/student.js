const mongoose = require('mongoose');
var Group = require("./group");

var Student = mongoose.model('student', {
    fullName:{ type : String},
    group: { type : Group},
    isAllowed: {type: Boolean}
});
module.exports = {Student};