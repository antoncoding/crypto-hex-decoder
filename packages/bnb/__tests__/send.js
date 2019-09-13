const decoder = require('../index')
const util = require('../utils/bnb_addr_util')

test('transfer', () => {
  let bnbSend =
    'ce01f0625dee0a4a2a2c87fa0a210a14d1a42a815fc6a339ecd8bfcd093dd1a835f40e1312090a03424e4210e8922612210a14e0a17a3ec9ddfd1d9c8b4e17df0622c679ffa89812090a03424e4210e89226126f0a26eb5ae987210298013db8d32124d1c11570cd37f8e52297bd18ea561cf990907f7aa03e486d6c1240ee378db6506d180dee42fdc54157c562fdd4d047a9c1c33ef407af6bd435a9023a2e0ebdb3061943a88b3a434d6b2ba8a4c970db218bd38fecf9796de973a43d182720cc011a097369676e61747572652001'
  let decodedTx = decoder.decode(bnbSend, 'Transfer')
  expect(util.encodeAddress(decodedTx.msg[0].inputs[0].address)).toBe('bnb16xjz4q2lc63nnmxchlxsj0w34q6lgrsnhff60l')
  expect(typeof decodedTx).toBe('object')
  expect(decodedTx).toHaveProperty('msg')
  expect(decodedTx).toHaveProperty('signatures')
  expect(decodedTx).toHaveProperty('msgType')
}, 3000)

test('transfer Interface', () => {
  let hexData =
    'ce01f0625dee0a4a2a2c87fa0a210a14d1a42a815fc6a339ecd8bfcd093dd1a835f40e1312090a03424e4210e8922612210a14e0a17a3ec9ddfd1d9c8b4e17df0622c679ffa89812090a03424e4210e89226126f0a26eb5ae987210298013db8d32124d1c11570cd37f8e52297bd18ea561cf990907f7aa03e486d6c1240ee378db6506d180dee42fdc54157c562fdd4d047a9c1c33ef407af6bd435a9023a2e0ebdb3061943a88b3a434d6b2ba8a4c970db218bd38fecf9796de973a43d182720cc011a097369676e61747572652001'
  let decodedTx = decoder.decodeTransfer(hexData)
  expect(decodedTx.msg[0].inputs[0].address).toBe('bnb16xjz4q2lc63nnmxchlxsj0w34q6lgrsnhff60l')
  expect(decodedTx.msg[0].outputs[0].address).toBe('bnb1uzsh50kfmh73m8ytfcta7p3zceull2ycnttw5s')
  expect(typeof decodedTx).toBe('object')
  expect(decodedTx).toHaveProperty('msg')
  expect(decodedTx).toHaveProperty('signatures')
  expect(decodedTx).toHaveProperty('msgType')
}, 3000)