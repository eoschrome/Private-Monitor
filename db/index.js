const mongodb = require('mongodb').MongoClient;
const assert = require('assert');
const {MONGODB} = require('config');

// Connection URL
const url = 'mongodb://211.195.229.80:27017/';

// Database Name
const dbName = 'EOS';

// Use connect method to connect to the server
const connect = () => {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        client.close();
    });
};

module.exports=connect;
