# Binance Raw Transaction Decode

![npm](https://img.shields.io/npm/v/@crypto-hex-decoder/bnb.svg) ![license](https://img.shields.io/npm/l/@crypto-hex-decoder/bnb) ![](https://img.shields.io/snyk/vulnerabilities/npm/@crypto-hex-decoder/bnb) ![](https://img.shields.io/bundlephobia/min/@crypto-hex-decoder/bnb)

Amino decoder for decoding binance chain hex transactions.

## Installation

```shell
npm i @crypto-hex-decoder/bnb
```

## Run Tests

```shell
npm test
```

## Usage

```javascript

const bnbDecoder = require("@crypto-hex-decoder/bnb");
let bnbSend = 'ce01f0625dee0a4a2a2c87fa0a210a14d1a42a815fc6a339ecd8bfcd093dd1a835f40e1312090a03424e4210e8922612210a14e0a17a3ec9ddfd1d9c8b4e17df0622c679ffa89812090a03424e4210e89226126f0a26eb5ae987210298013db8d32124d1c11570cd37f8e52297bd18ea561cf990907f7aa03e486d6c1240ee378db6506d180dee42fdc54157c562fdd4d047a9c1c33ef407af6bd435a9023a2e0ebdb3061943a88b3a434d6b2ba8a4c970db218bd38fecf9796de973a43d182720cc011a097369676e61747572652001';
let decodedTx = bnbDecoder.decode(bnbSend, 'Transfer');
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
