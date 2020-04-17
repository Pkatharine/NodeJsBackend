const mongoose = require('mongoose');

var Teacher = mongoose.model('teacher', {
    fullName: { type : String },
    position: { type : String},
    isAllowed: {type: Boolean}
});
module.exports = {Teacher};