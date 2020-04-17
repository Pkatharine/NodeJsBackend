const express = require("express");
var router = express.Router();

var {Teacher} = require("../models/teacher");
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    Teacher.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Teachers :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var teacher = new Teacher({
        fullName: req.body.fullName,
        position: req.body.position,
        isAllowed: req.body.isAllowed
    });
    teacher.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in teachers Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var teacher = {
        fullName: req.body.fullName,
        position: req.body.position,
        isAllowed: req.body.isAllowed
    };
    Teacher.findByIdAndUpdate(req.params.id, { $set: teacher }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Teacher Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Teacher.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Teacher Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;