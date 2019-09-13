const unMarshalBinaryLengthPrefixed = require('./utils/amino')
const TYPE = require('./utils/types')

function clone(obj) {
    if(obj == null || typeof(obj) != 'object') {
        return obj;
    }
    if(Buffer.isBuffer(obj)) {
        return Buffer.from([])
    }
    var temp = new obj.constructor();
    for(var key in obj) {
        temp[key] = clone(obj[key]);
    }
    return temp;
}

/**
 * @param {string} hex
 * @param {string | class} type Transfer, placeOrder or cancelOrder
 */
function decode (hex, type) {
    if(typeof type === 'object') return unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), type).val
    else if (TYPE.hasOwnProperty(type)) {
        tempObject = clone(TYPE[type])
return unMarshalBinaryLengthPrefixed(Buffer.from(hex,'hex'), tempObject).val
    }
    else throw 'type should be one of the built-in types of passed in as object';
}

module.exports.decode = decode; 