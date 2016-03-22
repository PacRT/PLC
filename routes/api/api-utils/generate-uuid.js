/**
 * Created by Hardik on 3/22/16.
 */
var uuid = require('node-uuid');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());
var node_uuid =  {
    getRandomUUID : function () {
        return  uuid.v1({
            node: [0x01, 0xef, 0xa1, 0xcd, 0x89, 0xab],
            clockseq: 0x3dde,
            msecs: new Date().getTime() + random.integer(10, 50000) * 1000000,
            nsecs: 1000
        });
    }
}

module.exports = node_uuid