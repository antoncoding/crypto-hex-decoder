const decoder = require('../index')
const util = require('../utils/bnb_addr_util')

test('bnb issue', () => {
  // test case for https://github.com/antoncoding/raw-transaction-hex-decoder/issues/1
  const from = 'bnb126fc4gys07jl9s7gqlgvzwjyy2mazk2m3afadt'
  const to = 'bnb1yvy4n68rkt6qyvufrqv3d46sndljlfaa75lur3'
  let txn =
    'yAHwYl3uCkwqLIf6CiIKFFaTiqCQf6Xyw8gH0ME6RCK30VlbEgoKA0JOQhCAwtcvEiIKFCMJWejjsvQCM4kYGRbXUJt/L6e9EgoKA0JOQhCAwtcvEmwKJuta6YchAztOCdLc4TZvGVFzR8Di8uWQc+wrWCiNMteTI+WOrxHZEkALKLqUsUE1yfgXLVMUqCfinHXlOp2TF3XuoQhPEVrU6SkjlmIB+IBhhJWJ4S8jEDx3ITNF9/4L9STfK3EDvhh/GBgaBHRlc3QgAQ=='
  let txnDt = Buffer.from(txn, 'base64').toString('hex')
  let decodedTx = decoder.decode(txnDt, 'Transfer')
  expect(util.encodeAddress(decodedTx.msg[0].inputs[0].address)).toBe(from)
  expect(util.encodeAddress(decodedTx.msg[0].outputs[0].address)).toBe(to)
})