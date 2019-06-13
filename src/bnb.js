const unMarshalBinaryLengthPrefixed = require('./utils/amino')
const TYPE = require('./utils/types')

/**
 * @param hex
 * @param type Send, Order or Cancel
 */
module.exports = function(hex, type) {
    let {val: decodedRawTx} = unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), TYPE[type])
    return decodedRawTx
}
