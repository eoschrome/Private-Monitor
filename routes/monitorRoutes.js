const {
    KEY_PROVIDER,
    HTTP_END_POINT,
    CHAIN_ID,
    MONGODB,
} = require('config');
const MongoClient = require('mongodb').MongoClient;
//const db=require('mongodb').Db;
const assert = require('assert');
var express = require('express');
var router = express.Router();
const axios = require('axios');
var Eos = require('eosjs');
var ProgressBar = require('progressbar.js')
const circularJson = require('circular-json');

//MONGO DB
// Connection URL
const url = 'mongodb://' + encodeURIComponent(MONGODB.USER) + ':' + encodeURIComponent(MONGODB.PASSWORD) + '@' + MONGODB.ADDRESS + MONGODB.DB_NAME;

//EOSJS Options
var eos = Eos({
    keyProvider: KEY_PROVIDER, // private key
    httpEndpoint: HTTP_END_POINT,
    chainId: CHAIN_ID,
});

//GET INFO REQUESTS
router.get('/get_info', function (req, res) {
    eos.getInfo((error, info) => {
        res.send(info);
        //console.log(info);

    });
});
//Get the producer Schedule
router.get('/get_producer_schedule', function (req, res) {
    eos.getProducerSchedule((error, info) => {
        res.send(info);
        //console.log(info);
    });
});

router.get('/getNumberOfBlocks', function (req, res) {
    // Use connect method to connect to the server
    try {
        MongoClient.connect(url, {
            'useNewUrlParser': 'true'
        }, function (err, client) {
            if (err) console.log("Error"+err);

                var db = client.db('EOS');
            db.collection('blocks').countDocuments({}, function (err, result) {
                //console.log(JSON.stringify(result));  

                res.send(JSON.stringify(result));
                //console.log("Blocks:"+JSON.stringify(result))         
            });
            client.close();
        })

    } catch (error) {
        console.log("ERROR:" + error);
    }
})

router.get('/getNumberOfTrx', function (req, res) {

    try {
        MongoClient.connect(url, {
            'useNewUrlParser': 'true'
        }, function (err, client) {
            if (!err) //console.log("Connected successfully to "+url);

                var db = client.db('EOS');
            db.collection('transactions').countDocuments({}, function (err, result) {
                //console.log(JSON.stringify(result));  

                res.send(JSON.stringify(result));
                //console.log("TRX:"+JSON.stringify(result))         
            });
            client.close();
        })

    } catch (error) {
        console.log("ERROR:" + error);
    }
});

router.get('/getNonEmptyBlocks', function (req, res) {
    try {
        MongoClient.connect(url, {
            'useNewUrlParser': 'true'
        }, function (err, client) {
            if (!err) //console.log("Connected successfully to "+url);

                var db = client.db('EOS');
            db.collection('blocks').find({
                "block.transactions.status": {
                    $exists: true,
                    $ne: null
                }
            }).count({}, function (err, result) {
                //console.log(JSON.stringify(result));  

                res.send(JSON.stringify(result));
                //console.log("NE:"+JSON.stringify(result))         
            });
            client.close();
        })

    } catch (error) {
        console.log("ERROR:" + error);
    }
})

module.exports = router;