const unMarshalBinaryLengthPrefixed = require('./utils/amino')
const TYPE = require('./utils/types')

/**
 * @param hex
 * @param type Transfer, placeOrder or cancelOrder
 */
module.exports = function(hex, type=Transfer) {
    if (!TYPE.hasOwnProperty(type)) throw 'BNB amino type not supported.'
    let { val: decodedRawTx } = unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), TYPE[type])
    return decodedRawTx
}
