export default class Airport {
  constructor(name, code) {
    this.constructor.checkPropertiesType(name, code);
    this._name = name;
    this._code = code;
  }

  static checkPropertiesType(name = null, code = null) {
    if (name !== null && typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
    if (code !== null && typeof code !== 'string') {
      throw (TypeError('Code must be a string'));
    }
  }

  get code() {
    return this._code;
  }

  toString() {
    return `[object ${this.code}]`;
  }
}
