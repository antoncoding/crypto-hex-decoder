const unMarshalBinaryLengthPrefixed = require('./utils/amino')
const addressUtil = require('./utils/bnb_addr_util')
const TYPE = require('./utils/types')

function decode(hex, testnet=false){
  try{
    return decodeTransfer(hex, testnet)
  } catch (error){
    try{
      return decodePlaceOrder(hex, testnet)
    } catch (error){
      try{
        return decodeCancelOrder(hex, testnet)
      } catch(error){
        throw new Error('Transaction Type not supported')
      }
    }
  }
}

/**
 * Decode standard transfer transaction.
 * @param {string} hex
 * @param {boolean} testnet default = false
 **/
function decodeTransfer(hex, testnet=false) {
  let clonedType = clone(TYPE.Transfer)
  let tx = unMarshalBinaryLengthPrefixed(Buffer.from(hex, 'hex'), clonedType).val
  tx.msg.map(item => {
    item.inputs.map(input => {
      input.address = addressUtil.encodeAddress(input.address, testnet)
    })
    item.outputs.map(output => {
      output.address = addressUtil.encodeAddress(output.address, testnet)
    })
  })
  return tx
}

/**
 * Decode bnb Place Order transaction
 * @param {string} hex
 * @param {boolean} testnet default = false
 */
function decodePlaceOrder(hex, testnet=false){
  let clonedType = clone(TYPE.PlaceOrder)
  let tx = unMarshalBinaryLengthPrefixed(Buffer.from(hex, 'hex'), clonedType).val
  tx.msg.map(item => {
    item.sender = addressUtil.encodeAddress(item.sender, testnet)
  })
  return tx
}

/**
 * Decode bnb Cancel Order transaction
 * @param {string} hex
 * @param {boolean} testnet default = false
 */
function decodeCancelOrder(hex, testnet=false){
  let clonedType = clone(TYPE.CancelOrder)
  let tx = unMarshalBinaryLengthPrefixed(Buffer.from(hex, 'hex'), clonedType).val
  tx.msg.map(item => {
    item.sender = addressUtil.encodeAddress(item.sender, testnet)
  })
  return tx
}

/**
 * @param {string} hex
 * @param {class} type
 */
function decodeCustomType(hex, type) {
  if (typeof type === 'object') return unMarshalBinaryLengthPrefixed(Buffer.from(hex, 'hex'), type).val
  else throw 'type should be an object'
}

/**
 * clone obj
 * @author @YordanPavlov
 */
function clone(obj) {
  if (obj == null || typeof obj != 'object') {
    return obj
  }
  if (Buffer.isBuffer(obj)) {
    return Buffer.from([])
  }
  var temp = new obj.constructor()
  for (var key in obj) {
    temp[key] = clone(obj[key])
  }
  return temp
}

module.exports.decode = decode
module.exports.decodeCustomType = decodeCustomType
module.exports.decodeTransfer = decodeTransfer
module.exports.decodePlaceOrder = decodePlaceOrder
module.exports.decodeCancelOrder = decodeCancelOrder