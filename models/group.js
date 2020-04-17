const mongoose = require('mongoose');

var Group = mongoose.model('group', {
    groupName:{ type : Number}
});
module.exports = {Group};