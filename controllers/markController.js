const express = require("express");
var router = express.Router();

var { Mark } = require("../models/mark")
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    Mark.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Marks :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var m = new Mark({
        mark: req.body.mark,
        student: req.body.student,
        subject: req.body.subject,
        teacher: req.body.teacher
    });
    m.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in marks Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var m = {
        mark: req.body.mark,
        student: req.body.student,
        subject: req.body.subject,
        teacher: req.body.teacher
    };
    Mark.findByIdAndUpdate(req.params.id, { $set: m }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in marks Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Mark.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in marks Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;