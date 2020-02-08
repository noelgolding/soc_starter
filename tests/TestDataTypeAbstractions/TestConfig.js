import { Config } from '../../lib/helpers/data_type_abstractions.js'

// Mocha Setup
mocha.setup('bdd');
const { expect } = chai;

/**
 * Test Suite
 */
describe('Test Config class', () => {
  const EMPTY_CONFIG_KEYS = ['label']
  /**
   * setUp
   */
  // beforeEach(() => {})

  /**
   * Test Methods
   */
  it('test the empty Config ', () => {
    const cfg = new Config()
    expect(cfg instanceof Object, 'Expect Config to be an instance of Object').to.be.true

    const keys = Object.keys(cfg)
    expect(keys.length).to.equal(EMPTY_CONFIG_KEYS.length, `unexpected number of keys: [${keys}]`)
    expect(keys).to.have.members(EMPTY_CONFIG_KEYS, `unexpected keys: ${keys}`)
    expect(cfg.label).to.equal(Config.DEFAULT_LABEL, `unexpected label`)
  })

  it('test the empty Config with a custom label ', () => {
    const expected_label = 'my custom label'
    const cfg = new Config(expected_label)
    expect(cfg.label).to.equal(expected_label, `unexpected label`)
  })

  it('test the empty Config with a custom label and properties ', () => {
    const expected_label = 'my custom label'
    const expected_properties = { prop1: 'foo', prop2: 'bar' }

    const cfg = new Config(expected_label, expected_properties)
    const actual_keys = Object.keys(cfg)
    const expected_keys = [...EMPTY_CONFIG_KEYS, ...Object.keys(expected_properties)]

    expect(cfg.label).to.equal(expected_label, `unexpected label`)
    expect(actual_keys.length).to.equal(expected_keys.length, `unexpected number of keys: ${actual_keys}`)
    expect(actual_keys).to.have.members(expected_keys, `unexpected keys: ${actual_keys}`)
  })

  it('test the empty Config with properties, but no label ', () => {
    const expected_properties = { prop1: 'foo', prop2: 'bar' }

    const cfg = new Config(expected_properties)
    const actual_keys = Object.keys(cfg)
    const expected_keys = [...EMPTY_CONFIG_KEYS, ...Object.keys(expected_properties)]

    expect(cfg.label).to.equal(Config.DEFAULT_LABEL, `unexpected label`)
    expect(actual_keys.length).to.equal(expected_keys.length, `unexpected number of keys: ${actual_keys}`)
    expect(actual_keys).to.have.members(expected_keys, `unexpected keys: ${actual_keys}`)
  })

  it('test the Config constructor with too many arguments ', () => {
    expect(() => new Config('string', {}, 3)).to.throw('invalid arguments')
    expect(() => new Config({}, 'string', 3)).to.throw('invalid arguments')
    expect(() => new Config(3, 'string', {}, 3)).to.throw('invalid arguments')
    expect(() => new Config(3, {}, 'string', 3)).to.throw('invalid arguments')
  })

  it('test the Config constructor with 2 int arguments ', () => {
    expect(() => new Config(1, 2)).to.throw('invalid arguments')
  })

  it('test the Config constructor with 1 int and 1 string arguments ', () => {
    expect(() => new Config(1, 'string')).to.throw('invalid arguments')
  })

  it('test the Config constructor with 1 string and 1 int arguments ', () => {
    expect(() => new Config('string', 1)).to.throw('invalid arguments')
  })

  it('test the Config constructor with 1 object and 1 int arguments ', () => {
    expect(() => new Config({ foo: 'string' }, 1)).to.throw('invalid arguments')
  })

  it('test the Config constructor with 1 int and 1 object arguments ', () => {
    expect(() => new Config(1, { foo: 'string' })).to.throw('invalid arguments')
  })

  it('test the Config constructor with 2 object arguments ', () => {
    expect(() => new Config({ foo: 'string' }, { bar: 'string' })).to.throw('invalid arguments')
  })

  it('test the Config constructor with 2 string arguments ', () => {
    expect(() => new Config('string1', 'string2')).to.throw('invalid arguments')
  })

  it('test add and get ', () => {
    const input_key = 'MyKey'
    const input_val = 'My Value'
    const cfg = new Config()
    cfg.add(input_key, input_val)

    expect(cfg.get(input_key)).to.equal(input_val)
    expect(cfg.get(input_key.toLowerCase())).to.equal(input_val)
    expect(cfg.get(input_key.toUpperCase())).to.equal(input_val)
  })

  it('test remove - case-sensitive ', () => {
    const input_key = 'prop1'
    const input_value = 'my val'
    const cfg = new Config({
      [input_key]: input_value
    })
    cfg.remove(input_key)
    expect(cfg.get(input_key)).to.be.undefined
  })

  it('test remove - case-insensitive ', () => {
    const input_key = 'prop1'
    const input_value = 'my val'
    const cfg = new Config({
      [input_key]: input_value
    })
    cfg.remove(input_key.toUpperCase())
    expect(cfg.get(input_key)).to.be.undefined
  })

  it('test remove - more than 1 ', () => {
    const input_props = { prop1: 'foo', prop2: 'bar', prop3: 'baz' }
    const cfg = new Config(input_props)
    cfg.remove('ProP1', 'prOp2')
    expect(cfg.get('prop1')).to.be.undefined
    expect(cfg.get('prop2')).to.be.undefined
    expect(cfg.get('prop3')).to.equal('baz')
  })

  it('test addAll ', () => {
    const cfg = new Config()
    const input_props = { prop1: 'testing', prop2: 'testing' }
    const expected_keys = [...EMPTY_CONFIG_KEYS, ...Object.keys(input_props)]
    cfg.addAll(input_props)
    expect(Object.keys(cfg)).to.have.members(expected_keys)
  })
})
