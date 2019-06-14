module.exports={
  Order: {
    msg: [{
      sender: Buffer.from([]),
      id: '',
      symbol: '',
      ordertype: 0,
      side: 0,
      price: 0,
      quantity: 0,
      timeinforce: 0,
      msgType: 'NewOrderMsg'
    }],
    signatures: [{
      pub_key: Buffer.from([]),
      signature: Buffer.from([]),
      account_number: 0,
      sequence: 0
    }],
    memo: "",
    msgType: "StdTx"
  },
  Send:{
    msg:[{
      inputs:
      [
        {
          address:Buffer.from([]),
          coins:[{
            denom:"",
            amount:0
          }]
        }
      ],
      outputs:[
        {
          address:Buffer.from([]),
          coins:[{
            denom:"",
            amount:0
          }]
        }
      ],
      msgType:"MsgSend"
    }],
    signatures:[
      {
        pub_key:Buffer.from([]),
        signature:Buffer.from([]),
        account_number:0,
        sequence:0
      }
    ],
    memo:"",
    source:0,
    data:"",
    msgType:"StdTx"
  }
}