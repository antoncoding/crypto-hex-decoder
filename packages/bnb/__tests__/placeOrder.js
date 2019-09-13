const decoder = require('../index')

test('placeOrder', () => {
  let placeOrder =
    'de01f0625dee0a66ce6dc0430a14ba36f0fad74d8f41045463e4774f328f4af779e5122b424133364630464144373444384634313034353436334534373734463332384634414637373945352d33331a0d4144412e422d4236335f424e42200228013080c2d72f3880c2d72f4001126e0a26eb5ae98721029729a52e4e3c2b4a4e52aa74033eedaf8ba1df5ab6d1f518fd69e67bbd309b0e1240851fc9542342321af63ecbba7d3ece545f2a42bad01ba32cff5535b18e54b6d3106e10b6a4525993d185a1443d9a125186960e028eabfdd8d76cf70a3a7e3100182220202001'
  let decodedTx = decoder.decodePlaceOrder(placeOrder)
  expect(typeof decodedTx).toBe('object')
  expect(decodedTx).toHaveProperty('msg')
  expect(decodedTx).toHaveProperty('signatures')
  expect(decodedTx).toHaveProperty('msgType')
})
