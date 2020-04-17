const express = require("express");
var router = express.Router();
var {Subject} = require("../models/subject")
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    Subject.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Subjects :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var sub = new Subject({
        name: req.body.name,
        teacher: req.body.teacher,
        group: req.body.group
    });
    sub.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in subject Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var sub = {
            name: req.body.name,
            teacher: req.body.teacher,
            group: req.body.group
        };
    Subject.findByIdAndUpdate(req.params.id, { $set: sub }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in subjects Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Subject.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in subjects Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;