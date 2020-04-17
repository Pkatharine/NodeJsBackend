const express = require("express");
const bodyParser = require('body-parser');
var studentsController = require("./controllers/studentController");
var groupController = require("./controllers/groupController");
var teacherController = require("./controllers/teacherController");
var subjectController = require("./controllers/subjectController");
var markController = require("./controllers/markController");

const mongoose = require('./db.js');
const cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000, () => console.log('Server started at port 3000'));

app.use('/student/', studentsController);
app.use('/group/', groupController);
app.use('/teacher/', teacherController);
app.use('/subject/', subjectController);
app.use('/mark/', markController);




