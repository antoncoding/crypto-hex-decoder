const unMarshalBinaryLengthPrefixed = require('./utils/amino')
const TYPE = require('./utils/types')

/**
 * @param {string} hex
 * @param {string | class} type Transfer, placeOrder or cancelOrder
 */
module.exports = function(hex, type) {
    if(typeof type === 'object') return unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), type).val
    else if (TYPE.hasOwnProperty(type)) return unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), TYPE[type]).val
    else throw 'type should be one of the built-in types of passed in as object';
}
