# Raw Transaction Hex Decoder

This library's methods return information of a transaction, given this transaction `HEX` as input.

Originally forked from [marcogbarcellos](https://github.com/marcogbarcellos/transaction-hex-decoder)'s repo. Now maintaining it myself and will keep adding new coins.

## Supported coins

* Ethereum
* Bitcoin (UTXO Models)
* Ripple
* Binance

## Usage

- `npm install raw-transaction-hex-decoder`

### Ethereum Raw Tx

```javascript
const txHexDecoder = require("raw-transaction-hex-decoder");

const ethEncodedRawTx = "0xf86e82cd70850bdfd63e00827918943c601b93eaad76d2f66f71a0b8c22dbbf2e71db688287bb23d4c9350008025a09f3842a8fd9d6228d4ee226524e249c81eba22c53a87855f2244b2064c8036d6a073c767ae047bce30dee587e5233649acbae36b10d97b39d11fb9b2ccabf9b925";
const ethDecodedRawTx = txHexDecoder.decodeEthRawTx(ethEncodedRawTx);
console.log("Decoded Transaction : "+JSON.stringify(ethDecodedRawTx));
/* OUTPUT Example:
{
   "nonce":52592,
   "gasPrice":51000000000,
   "gasLimit":31000,
   "to":"0x3c601b93eaad76d2f66f71a0b8c22dbbf2e71db6",
   "valueInWei":2917121160000000000,
   "valueInEther":2.91712116,
   "inputData":"0x",
   "v":"0x25",
   "r":"0x9f3842a8fd9d6228d4ee226524e249c81eba22c53a87855f2244b2064c8036d6",
   "s":"0x73c767ae047bce30dee587e5233649acbae36b10d97b39d11fb9b2ccabf9b925"
}*/
```

### Bitcoin Raw Tx

```javascript
const txHexDecoder = require("raw-transaction-hex-decoder");

const btcEncodedRawTx = "010000000001018c5eb9b0dc16998a093d7b14ade1f08c7e50e7850300f2b9c7ddbcb91940a6520000000017160014a766979873e93859be7ce57d2d0260abe8a4c081ffffffff03220200000000000017a914e9176b11d2e4c4fb15987fe404e6cb55f70c9236870000000000000000166a146f6d6e69000000000000001f0000000005f5e10056e400000000000017a914c7f51ad81af55f18a33dc5a95e79fe3b6e4726678702483045022100d5746ae871e84a30fec792d02656a156ea6ee2f1aecc62c05bfecb77b339ecef02206c2392c29918c01e3bceed93f62b448bdcf21f4a32e28e26be922f5234eb900a012102fe5ab04839d0fc726b0dc4a7e1a8104684c9e687bd64d3304b10538d7090e91900000000";
const btcDecodedRawTx = txHexDecoder.decodeBtcRawTx(btcEncodedRawTx);
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

### Ripple Raw Transaction

```javascript
const txHexDecoder = require("raw-transaction-hex-decoder");

let xrpRawTx = '1200002280000000240017E7FF2E7031990B201B02DB1E4E6140000001636BDDC0684000000000030D40732102C2EDA75565BA8D3CBD96FB28D53C9BE1B7A4DC1AF6FF1B2EBBD478D520BED52E744730450221009E691C9D9DDF7A338EA8EA10D0921704740093956A7FBA3C3F75E05E10D6AE640220571BFA190E36AD5540FDE1D075146D1DF61BADFC3B67C31578A91E47B63AC4438114C10AC406D469253B6DC27D26BD54AE891179F5DD8314D3A0F1993876211F413D4EDF0A70CEE0C8212DB8';
const decodedTx = txHexDecoder.decodeXrpRawTx(xrpRawTx);
console.log("XRP Decoded Transaction : "+JSON.stringify(decodedTx, null, 2));
/* XRP Output

{
  "TransactionType": "Payment",
  "Flags": 2147483648,
  "Sequence": 1566719,
  "DestinationTag": 1882298635,
  "LastLedgerSequence": 47914574,
  "Amount": "5962980800",
  "Fee": "200000",
  "SigningPubKey": "02C2EDA75565BA8D3CBD96FB28D53C9BE1B7A4DC1AF6FF1B2EBBD478D520BED52E",
  "TxnSignature": "30450221009E691C9D9DDF7A338EA8EA10D0921704740093956A7FBA3C3F75E05E10D6AE640220571BFA190E36AD5540FDE1D075146D1DF61BADFC3B67C31578A91E47B63AC443",
  "Account": "rJb5KsHsDHF1YS5B5DU6QCkH5NsPaKQTcy",
  "Destination": "rLHzPsX6oXkzU2qL12kHCH8G8cnZv1rBJh"
}

*/
```

### Binance Chain Raw Transaction Decode

```javascript

const txHexDecoder = require("raw-transaction-hex-decoder");
let bnbSend = 'ce01f0625dee0a4a2a2c87fa0a210a14d1a42a815fc6a339ecd8bfcd093dd1a835f40e1312090a03424e4210e8922612210a14e0a17a3ec9ddfd1d9c8b4e17df0622c679ffa89812090a03424e4210e89226126f0a26eb5ae987210298013db8d32124d1c11570cd37f8e52297bd18ea561cf990907f7aa03e486d6c1240ee378db6506d180dee42fdc54157c562fdd4d047a9c1c33ef407af6bd435a9023a2e0ebdb3061943a88b3a434d6b2ba8a4c970db218bd38fecf9796de973a43d182720cc011a097369676e61747572652001';
let decodedTx = txHexDecoder.decodeBnbRawTx(bnbSend, 'Transfer');
console.log(JSON.stringify(decodedTx));

/*
{"msg":
  [
    {
      "inputs":
      [
        {
          "address":
            {
              "type":"Buffer",
              "data":[209,164,42,129,95,198,163,57,236,216,191,205,9,61,209,168,53,244,14,19]
            },
          "coins":
          [
            {
              "denom":"BNB",
              "amount":625000
            }
          ]
        }
      ],
      "outputs":
      [
        {
          "address":
          {
            "type":"Buffer",
            "data":[224,161,122,62,201,221,253,29,156,139,78,23,223,6,34,198,121,255,168,152]
          },
          "coins":
          [
            {
              "denom":"BNB",
              "amount":625000
            }
          ]
        }
      ],
      "msgType":"MsgSend"
    }
  ],
  "signatures":
  [
    {
      "pub_key":
      {
        "type":"Buffer",
        "data":[235,90,233,135,33,2,152,1,61,184,211,33,36,209,193,21,112,205,55,248,229,34,151,189,24,234,86,28,249,144,144,127,122,160,62,72,109,108]
      },
      "signature":
      {
        "type":"Buffer",
        "data":[238,55,141,182,80,109,24,13,238,66,253,197,65,87,197,98,253,212,208,71,169,193,195,62,244,7,175,107,212,53,169,2,58,46,14,189,179,6,25,67,168,139,58,67,77,107,43,168,164,201,112,219,33,139,211,143,236,249,121,109,233,115,164,61]
      },
      "account_number":39,
      "sequence":204
    }
  ],
  "memo":"signature",
  "source":1,
  "data":"",
  "msgType":"StdTx"
}
*/

```
