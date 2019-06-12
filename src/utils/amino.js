
const encodings = require('protocol-buffers-encodings')
const Buffer = require("safe-buffer")
const is  = require("is_js")

const varString = encodings.string
const varBool = encodings.bool
const varBytes = encodings.bytes
const varint = encodings.varint
   
const decoder = (bytes, varType) => {
const val = varType.decode(bytes, 0)
const offset = varType.encodingLength(val)
return { val, offset }
}

/**
 * js amino UnmarshalBinaryLengthPrefixed
 * @param {Buffer} bytes
 * @param {Object} type
 * @returns {Object} 
 *  */
module.exports = function unMarshalBinaryLengthPrefixed(bytes, type){
if(bytes.length === 0)
    throw new TypeError("Cannot decode empty bytes")

// read byte-length prefix
const{ offset: len } = decoder(bytes, varint)

if(len < 0)
    throw new Error(`Error reading msg byte-length prefix: got code ${len}`)

bytes = bytes.slice(len)

return unMarshalBinaryBare(bytes, type)
}

/**
 * js amino UnmarshalBinaryBare
 * @param {Buffer} bytes
 * @param {Object} type
 * @returns {Object} 
 *  */
function unMarshalBinaryBare (bytes, type) {
if(!is.object(type)) 
    throw new TypeError("type should be object")

if(!Buffer.isBuffer(bytes))
    throw new TypeError("bytes must be buffer")

if(is.array(type)) {
    if(!is.object(type[0]))
    throw new TypeError("type should be object")

    return decodeArrayBinary(bytes, type[0])
}

return decodeBinary(bytes, type)
}

const decodeBinary = (bytes, type, isLengthPrefixed) => {
if(Buffer.isBuffer(type)) {
    return decoder(bytes, varBytes)
}

if(is.array(type)) {
    return decodeArrayBinary(bytes, type)
}

if(is.number(type)) {
    return decoder(bytes, varint)
}

if(is.boolean(type)) {
    return decoder(bytes, varBool)
}

if(is.string(type)) {
    return decoder(bytes, varString)
}

if(is.object(type)) {
    return decodeObjectBinary(bytes, type, isLengthPrefixed)
}

return
}

const decodeObjectBinary = (bytes, type, isLengthPrefixed) => {
let objectOffset = 0

// read byte-length prefix
if(isLengthPrefixed){
    const{ offset: len } = decoder(bytes, varint)
    bytes = bytes.slice(len)
    objectOffset += len
}

// If registered concrete, consume and verify prefix bytes.
if(type.msgType) {
    bytes = bytes.slice(4)
    objectOffset += 4
}

let lastFieldNum = 0
const keys = Object.keys(type)
keys.forEach((key, index) => {
    if (is.array(type[key])) {
    const { offset, val } = decodeArrayBinary(bytes, type[key][0])
    objectOffset += offset
    type[key] = val
    bytes = bytes.slice(offset)
    } else {
    const { fieldNum, typ } = decodeFieldNumberAndTyp3(bytes)

    //if this field is default value, continue
    if(index+1 < fieldNum || fieldNum < 0) return

    if(fieldNum <= lastFieldNum) {
        throw new Error(`encountered fieldNum: ${fieldNum}, but we have already seen fnum: ${lastFieldNum}`)
    }

    lastFieldNum = fieldNum

    if(index+1 !== fieldNum) {
        throw new Error("field number is not expected")
    }

    const typeWanted = typeToTyp3(type[key])
    
    if(typ !== typeWanted) {
        throw new Error("field type is not expected")
    }

    //remove 1 byte of type
    bytes = bytes.slice(1)

    const { val, offset } = decodeBinary(bytes, type[key], true)
    type[key] = val

    //remove decoded bytes
    bytes = bytes.slice(offset)
    objectOffset += offset + 1
    }
})

return { val: type, offset: objectOffset }
}

const decodeArrayBinary = (bytes, type) => {
const arr = []
let arrayOffset = 0
let { fieldNum: fieldNumber } = decodeFieldNumberAndTyp3(bytes)

while(true) {
    const { fieldNum } = decodeFieldNumberAndTyp3(bytes)

    if(fieldNum !== fieldNumber || fieldNum < 0) break
    
    //remove 1 byte of encoded field number and type
    bytes = bytes.slice(1)

    //is default value, skip and continue read bytes
    if(bytes.length > 0 && bytes[0] === 0x00) continue

    const { offset, val } = decodeBinary(bytes, type, true)

    arr.push({...val})
    bytes = bytes.slice(offset)

    //add 1 byte of type
    arrayOffset += offset + 1
    fieldNumber = fieldNum
}

// console.log(arr)
return { val: arr, offset: arrayOffset }
}

const decodeFieldNumberAndTyp3 = (bytes) => {
if(bytes.length < 2) {
    //default value
    return { fieldNum: -1 }
}
const { val } = decoder(bytes, varint)
const typ = val & 7
let fieldNum = val >> 3
if(fieldNum > (1<<29 -1)) {
    throw new Error(`invalid field num ${fieldNum}`)
}

return { fieldNum, typ }
}

const typeToTyp3 = (type) => {
  if(is.boolean(type)){
    return 0
  }

  if(is.number(type)){
    if(is.integer(type)){
      return 0
    }else{
      return 1
    }
  }

  if(is.string(type) || is.array(type) || is.object(type)){
    return 2
  }
}

const size = function (items, iter, acc) {
  if (acc === undefined) acc = 0
  for (var i = 0; i < items.length; ++i) acc += iter(items[i], i, acc)
  return acc
}

const isAbstractCodec = function (codec) {
  return (codec &&
    typeof codec.encode === "function" &&
    typeof codec.decode === "function" &&
    typeof codec.encodingLength === "function")
}

