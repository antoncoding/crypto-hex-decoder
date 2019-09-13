const decoder = require('../index')

test('bnb cancelOrder', () => {
  let cancelOrder =
    'd001f0625dee0a58166e681b0a14ba36f0fad74d8f41045463e4774f328f4af779e5120f42434853562e422d3130465f424e421a2b424133364630464144373444384634313034353436334534373734463332384634414637373945352d3239126e0a26eb5ae98721029729a52e4e3c2b4a4e52aa74033eedaf8ba1df5ab6d1f518fd69e67bbd309b0e1240d93fb0402b2b30e7ea08e123bb139ad68bf0a1577f38592eb22d11e127f09bbd3380f29b4bf15bdfa973454c5c8ed444f2e256e956fe98cfd21e886a946e21e5182220212001'
  let decodedTx = decoder.decode(cancelOrder, 'CancelOrder')
  expect(typeof decodedTx).toBe('object')
  expect(decodedTx).toHaveProperty('msg')
  expect(decodedTx).toHaveProperty('signatures')
  expect(decodedTx).toHaveProperty('msgType')
})
