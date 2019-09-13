const decoder = require('../index')

test('base64', () => {
  let txn =
    'xAHwYl3uCk4qLIf6CiMKFOfWS4XKCqy2D0eDhU1Tz/okobYdEgsKA0JOQhCAyK+gJRIjChRWk4qgkH+l8sPIB9DBOkQit9FZWxILCgNCTkIQgMivoCUSbAom61rphyECPYFbIkkUUiC/tnsPu9KwAf/8PpcwSTCAE/FWqsJCQJASQJIUtRhIFVlytl+Ob5sobS7sERp7+7EmDrupYRS7N1KfOhUxoRFJCja7kbXXR9CPx5aSUJk3dCIh2Q+A7Cwf5lAYFiAB'
  let txnDt = Buffer.from(txn, 'base64').toString('hex')

  class Token {
    constructor(opts) {
      opts = opts || {}
      this.denom = opts.denom || ''
      this.amount = opts.amount || 0
    }
  }

  class Input {
    constructor(opts) {
      opts = opts || {}
      this.address = opts.address || Buffer.alloc(0)
      this.coins = opts.coins || [new Token()]
    }
  }

  class Output {
    constructor(opts) {
      opts = opts || {}
      this.address = opts.address || Buffer.alloc(0)
      this.coins = opts.coins || [new Token()]
    }
  }

  class MsgSend {
    constructor(opts) {
      opts = opts || {}
      this.inputs = opts.inputs || new Input()
      this.outputs = opts.outputs || new Output()

      this.msgType = 'MsgSend'
    }
  }

  class StdSignature {
    constructor(opts) {
      opts = opts || {}
      this.pub_key = opts.pub_key || Buffer.from([])
      this.signature = opts.signature || Buffer.from([])
      this.account_number = opts.account_number || 0
      this.sequence = opts.sequence || 0
    }
  }

  class stdTx {
    constructor(opts) {
      opts = opts || {}
      this.msgs = opts.msgs || [new MsgSend()]
      this.signatures = opts.signatures || new StdSignature()
      this.memo = opts.memo || ''
      this.source = opts.source || 0
      this.data = opts.data || Buffer.alloc(0)

      this.msgType = 'stdTx'
    }
  }

  const decodeType = new stdTx()
  let decodedTx = decoder.decode(txnDt, decodeType)
  expect(typeof decodedTx).toBe('object')
  expect(decodedTx).toHaveProperty('msgs')
  expect(decodedTx).toHaveProperty('signatures')
  expect(decodedTx).toHaveProperty('msgType')
})
