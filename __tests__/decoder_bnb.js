const txHexDecoder = require("../index"); 
const util = require('../src/utils/bnb_addr_util');

test('bnb send', ()=>{
    let bnbSend = 'ce01f0625dee0a4a2a2c87fa0a210a14d1a42a815fc6a339ecd8bfcd093dd1a835f40e1312090a03424e4210e8922612210a14e0a17a3ec9ddfd1d9c8b4e17df0622c679ffa89812090a03424e4210e89226126f0a26eb5ae987210298013db8d32124d1c11570cd37f8e52297bd18ea561cf990907f7aa03e486d6c1240ee378db6506d180dee42fdc54157c562fdd4d047a9c1c33ef407af6bd435a9023a2e0ebdb3061943a88b3a434d6b2ba8a4c970db218bd38fecf9796de973a43d182720cc011a097369676e61747572652001';
    let decodedTx = txHexDecoder.decodeBnbRawTx(bnbSend, 'Transfer');
    expect(util.encodeAddress(decodedTx.msg[0].inputs[0].address)).toBe("bnb16xjz4q2lc63nnmxchlxsj0w34q6lgrsnhff60l");
    expect(typeof decodedTx).toBe('object')
    expect(decodedTx).toHaveProperty('msg')
    expect(decodedTx).toHaveProperty('signatures')
    expect(decodedTx).toHaveProperty('msgType')
}, 3000)

test('bnb placeOrder', ()=>{
    let placeOrder = "de01f0625dee0a66ce6dc0430a14ba36f0fad74d8f41045463e4774f328f4af779e5122b424133364630464144373444384634313034353436334534373734463332384634414637373945352d33331a0d4144412e422d4236335f424e42200228013080c2d72f3880c2d72f4001126e0a26eb5ae98721029729a52e4e3c2b4a4e52aa74033eedaf8ba1df5ab6d1f518fd69e67bbd309b0e1240851fc9542342321af63ecbba7d3ece545f2a42bad01ba32cff5535b18e54b6d3106e10b6a4525993d185a1443d9a125186960e028eabfdd8d76cf70a3a7e3100182220202001";
    let decodedTx = txHexDecoder.decodeBnbRawTx(placeOrder, 'PlaceOrder');
    expect(typeof decodedTx).toBe('object')
    expect(decodedTx).toHaveProperty('msg')
    expect(decodedTx).toHaveProperty('signatures')
    expect(decodedTx).toHaveProperty('msgType')
})

test('bnb cancelOrder', ()=>{
    let cancelOrder = 'd001f0625dee0a58166e681b0a14ba36f0fad74d8f41045463e4774f328f4af779e5120f42434853562e422d3130465f424e421a2b424133364630464144373444384634313034353436334534373734463332384634414637373945352d3239126e0a26eb5ae98721029729a52e4e3c2b4a4e52aa74033eedaf8ba1df5ab6d1f518fd69e67bbd309b0e1240d93fb0402b2b30e7ea08e123bb139ad68bf0a1577f38592eb22d11e127f09bbd3380f29b4bf15bdfa973454c5c8ed444f2e256e956fe98cfd21e886a946e21e5182220212001';
    let decodedTx = txHexDecoder.decodeBnbRawTx(cancelOrder, 'CancelOrder');
    expect(typeof decodedTx).toBe('object')
    expect(decodedTx).toHaveProperty('msg')
    expect(decodedTx).toHaveProperty('signatures')
    expect(decodedTx).toHaveProperty('msgType')
})

test('bnb issue', ()=>{
  // test case for https://github.com/antoncoding/raw-transaction-hex-decoder/issues/1
  const from = "bnb126fc4gys07jl9s7gqlgvzwjyy2mazk2m3afadt"
  const to = "bnb1yvy4n68rkt6qyvufrqv3d46sndljlfaa75lur3"
  let txn = "yAHwYl3uCkwqLIf6CiIKFFaTiqCQf6Xyw8gH0ME6RCK30VlbEgoKA0JOQhCAwtcvEiIKFCMJWejjsvQCM4kYGRbXUJt/L6e9EgoKA0JOQhCAwtcvEmwKJuta6YchAztOCdLc4TZvGVFzR8Di8uWQc+wrWCiNMteTI+WOrxHZEkALKLqUsUE1yfgXLVMUqCfinHXlOp2TF3XuoQhPEVrU6SkjlmIB+IBhhJWJ4S8jEDx3ITNF9/4L9STfK3EDvhh/GBgaBHRlc3QgAQ==";
  let txnDt = Buffer.from(txn, "base64").toString('hex');
  let decodedTx = txHexDecoder.decodeBnbRawTx(txnDt, 'Transfer')
  expect(util.encodeAddress(decodedTx.msg[0].inputs[0].address)).toBe(from);
  expect(util.encodeAddress(decodedTx.msg[0].outputs[0].address)).toBe(to);
})

test('bnb base64', ()=>{
    let txn = "xAHwYl3uCk4qLIf6CiMKFOfWS4XKCqy2D0eDhU1Tz/okobYdEgsKA0JOQhCAyK+gJRIjChRWk4qgkH+l8sPIB9DBOkQit9FZWxILCgNCTkIQgMivoCUSbAom61rphyECPYFbIkkUUiC/tnsPu9KwAf/8PpcwSTCAE/FWqsJCQJASQJIUtRhIFVlytl+Ob5sobS7sERp7+7EmDrupYRS7N1KfOhUxoRFJCja7kbXXR9CPx5aSUJk3dCIh2Q+A7Cwf5lAYFiAB";
    let txnDt = Buffer.from(txn, "base64").toString('hex');
    
    class Token {
    constructor(opts) {
        opts = opts || {}
        this.denom = opts.denom || ""
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
        
        this.msgType = "MsgSend"
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
            this.memo = opts.memo || ""
            this.source = opts.source || 0
            this.data = opts.data || Buffer.alloc(0)
            
            this.msgType = "stdTx"
        }
    }

    const decodeType = new stdTx()
    let decodedTx = txHexDecoder.decodeBnbRawTx(txnDt, decodeType)
    expect(typeof decodedTx).toBe('object')
    expect(decodedTx).toHaveProperty('msgs')
    expect(decodedTx).toHaveProperty('signatures')
    expect(decodedTx).toHaveProperty('msgType')
})