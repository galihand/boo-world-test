'use strict';
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());
app.use('/comment', require('./routes/comment')());


// start server
const server = app.listen(port);

// const mongodb = MongoMemoryServer.create({
//     instance: {
//         dbName: 'boo-test',
//     },
//     binary: {
//         arch: 'x64',
//     }
// });
const mongodb = MongoMemoryServer.create();

mongodb.then((mongo) => {
    const uri = mongo.getUri();
    mongoose.connect(uri);
    console.log('MongoDB started. Listening on %s', uri);
}).catch((err) => {
    console.error('MongoDB failed to start', err);
})

console.log('Express started. Listening on %s', port);
