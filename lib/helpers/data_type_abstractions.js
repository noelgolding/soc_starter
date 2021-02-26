/*
 * A properties object with case-insesitive names.
 * @memberof simplegameengine.config
 */
class Config extends Object {
  static DEFAULT_LABEL = 'config label'
  /**
   * @param {string} [label = "config label"] optional useful for debugging.
   * @param {Object} [properties = {}] optional properties to be set during instantiation
   */
  constructor() {
    super()
    if (arguments.length > 2) throw 'invalid arguments'
    if (arguments.length === 2) {
      if (typeof(arguments[0]) === 'string' && arguments[1] instanceof Object) {
        this.label = arguments[0]
        this.addAll(arguments[1])
      } else if (typeof(arguments[1]) === 'string' && arguments[0] instanceof Object) {
        this.label = arguments[1]
        this.addAll(arguments[0])
      } else {
        throw 'invalid arguments'
      }
    } else if (arguments.length === 1) {
      if (arguments[0] instanceof Object) {
        this.label = Config.DEFAULT_LABEL
        this.addAll(arguments[0])
      } else if (typeof(arguments[0] === 'string')) {
        this.label = arguments[0]
      } else {
        throw 'invalid arguments'
      }
    } else {
      this.label = Config.DEFAULT_LABEL
    }
  }

  addAll(props) {
    props = props || {}
    for (let key in props) {
      this.add(key, props[key])
    }
  }

  /**
   * Stores the name-value pair.
   * If the name already exists, the value will be overwritten.
   * The name is case-insesitive. "Name", "NAME", "name" and "NaMe" are all treated as the same.
   * @param {string} name a case-insesitive property name
   * @param {*} value the new value to be stored
   */
  add(key, value) {
    this[key.toLowerCase()] = value
  }

  /**
   * Returns the value that is associated with the property name.
   * @param {string} name the name of the property to return
   * @returns {*} the value that is associated with the property name or undefined if the property name has not been set.
   */
  get(key) {
    return this[key.toLowerCase()]
  }

  remove(...keys) {
    for (let key of keys) {
      delete(this[key.toLowerCase()])
    }
  }
}

class SimpleGameConfig extends Config {
  constructor(default_cfg, config) {
    default_cfg = default_cfg || {}
    config = config || {}
    config = {
      ...default_cfg,
      ...config
    }
    let label = (config.label) ? config.label : "SimpleGameConfig"
    delete config.label
    super(label, config)
  }

  get(key) {
    let value = this.getRawValue(key)
    let max_iterations = 5
    let current_iteration = 0
    while (typeof value === "function" && current_iteration++ < max_iterations) {
      value = value()
    }
    return value
  }

  getRawValue(key) {
    return super.get(key)
  }

  keys() {
    return keys(this).sort() // hmmmm, I forget why I wanted these sorted :/
  }
}

/**
 * @namespace collections
 */

/**
 * A List of items
 * @memberof collections 
 */
class List extends Array {
  /**
   * @param {...*} items optional items to initialize the List with
   */
  constructor(...items) {
    super(...items)
  }

  /**
   * Appends an item to the end of the list
   * @function
   * @param {*} item to add
   */
  add = this.push

  /**
   * Return an item at the specified index
   * @param {int} index index of the item to return
   * @returns {*} item at the specified index or undefined if the index is out of bounds
   */
  get(i) {
    return this[i]
  }

  /**
   * Removes an item at the specified index and returns it
   * @param {int} index index of the item to remove and return
   * @returns {*} item at the specified index or undefined if the index is out of bounds
   */
  remove(i) {
    let value = this.get(i)
    this.splice(i, 1)
    return value
  }
}

/**
 * A LIFO (Last In First Out) data structure.
 * Similar to a stack of dishes.  
 * For each dish you wash and dry, you put it on top. 
 * When you are ready to use a dish you remove the last dish that was added to the top of the stack.
 * @memberof collections 
 */
class Stack extends List {
  /**
   * @param {...*} items optional items to initialize the Stack with
   */
  constructor(...items) {
    super(...items)
  }

  /**
   * Adds an item to the top of the Stack
   * @function
   * @param {*} item to add
   */
  push = super.push

  /**
   * Removes an item from the top of the Stack and returns it
   * @function
   * @returns {*} an item from the top of the Stack or undefined if Stack is empty
   */
  pop = super.pop
}

/**
 * A FIFO (First In First Out) data structure.
 * Similar to a checkout line at the grocery store.
 * The first person in line is the first to get checked out, then the next and so on.
 * New people are added to the end of the line.
 * @memberof collections 
 */
class Queue extends List {
  /**
   * @param {...*} items optional items to initialize the Queue with
   */
  constructor(...items) {
    super(...items)
  }

  /**
   * Adds an item to the end of the Queue
   * @param {*} item to add
   */
  enqueue = super.push

  /**
   * Removes an item from the front of the Queue and returns it
   * @returns {*} an item from the front of the Queue or undefined if Queue is empty
   */
  dequeue = super.shift
}
