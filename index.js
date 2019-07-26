module.exports = {
    decodeEthRawTx: require("./src/eth.js"),
    decodeRawUTXO: require("./src/btc.js"),
    decodeXrpRawTx: require('./src/xrp.js'),
    decodeBnbRawTx: require('./src/bnb'),
    encodeBnbAddress: require('./src/utils/bnb_addr_util')
}