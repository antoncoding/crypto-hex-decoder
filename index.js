module.exports = {
    decodeRawUTXO: require("./src/btc"),    
    decodeBnbRawTx: require('./src/bnb'),
    encodeBnbAddress: require('./src/utils/bnb_addr_util').encodeAddress,
    decodeBnbAddress: require('./src/utils/bnb_addr_util').decodeAddress
}