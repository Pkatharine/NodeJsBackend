const express = require("express");
var router = express.Router();

var {Student} = require("../models/student");
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    Student.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Students :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var stud = new Student({
        fullName: req.body.fullName,
        group: req.body.group,
        isAllowed: req.body.isAllowed
    });
    stud.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in student Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var stud = {
        fullName: req.body.fullName,
        group: req.body.group,
        isAllowed: req.body.isAllowed
    };
    Student.findByIdAndUpdate(req.params.id, { $set: stud }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Student Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Student Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;