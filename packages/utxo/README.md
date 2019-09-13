# UTXO Raw Tx

```javascript
const utxoDecoder = require("@crypto-hex-decoder/utxo");

const btcEncodedRawTx = "010000000001018c5eb9b0dc16998a093d7b14ade1f08c7e50e7850300f2b9c7ddbcb91940a6520000000017160014a766979873e93859be7ce57d2d0260abe8a4c081ffffffff03220200000000000017a914e9176b11d2e4c4fb15987fe404e6cb55f70c9236870000000000000000166a146f6d6e69000000000000001f0000000005f5e10056e400000000000017a914c7f51ad81af55f18a33dc5a95e79fe3b6e4726678702483045022100d5746ae871e84a30fec792d02656a156ea6ee2f1aecc62c05bfecb77b339ecef02206c2392c29918c01e3bceed93f62b448bdcf21f4a32e28e26be922f5234eb900a012102fe5ab04839d0fc726b0dc4a7e1a8104684c9e687bd64d3304b10538d7090e91900000000";
const btcDecodedRawTx = utxoDecoder.decode(btcEncodedRawTx);
console.log("Decoded transaction : "+JSON.stringify(btcDecodedRawTx));
/* OUTPUT Example:
{
  "version":1,
  "locktime":0,
  "ins":[
    {
      "hash":"8c5eb9b0dc16998a093d7b14ade1f08c7e50e7850300f2b9c7ddbcb91940a652",
      "index":0,
      "script":
      {
        "hex":"160014a766979873e93859be7ce57d2d0260abe8a4c081"
      },
      "sequence":4294967295,
      "witness":
      {
        "signature":"d5746ae871e84a30fec792d02656a156ea6ee2f1aecc62c05bfecb77b339ecef6c2392c29918c01e3bceed93f62b448bdcf21f4a32e28e26be922f5234eb900a",
        "publicKey":"02fe5ab04839d0fc726b0dc4a7e1a8104684c9e687bd64d3304b10538d7090e919",
        "hashType":1
      },
      "type":"Segwit"
    }
  ],
  "outs":[
    {
      "value":546,
      "script":"OP_HASH160 e9176b11d2e4c4fb15987fe404e6cb55f70c9236 OP_EQUAL"
    },
    {
      "value":0,
      "script":"OP_RETURN 6f6d6e69000000000000001f0000000005f5e100"
    },
    {
      "value":58454,
      "script":"OP_HASH160 c7f51ad81af55f18a33dc5a95e79fe3b6e472667 OP_EQUAL"
    }
  ],
  "totalValue":59000
}
*/

```
