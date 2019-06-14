module.exports = {
    decodeEthRawTx: require("./src/eth.js"),
    decodeUTXORawTx: require("./src/btc.js"),
    decodeXrpRawTx: require('./src/xrp.js'),
    decodeBnbRawTx: require('./src/bnb')
}