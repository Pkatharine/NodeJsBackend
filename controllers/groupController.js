const express = require("express");
var router = express.Router();

var {Group} = require("../models/group");
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    Group.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Groups :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var group = new Group({
        groupName: req.body.groupName
    });
    group.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in group Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var group = {
        groupName: req.body.groupName
    };
    Group.findByIdAndUpdate(req.params.id, { $set: group }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in group Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Group.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Group Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;