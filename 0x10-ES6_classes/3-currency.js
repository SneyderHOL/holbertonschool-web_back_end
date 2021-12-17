export default class Currency {
  constructor(code, name) {
    this.constructor.checkPropertiesType(code, name);
    this._code = code;
    this._name = name;
  }

  static checkPropertiesType(code = null, name = null) {
    if (code !== null && typeof code !== 'string') {
      throw TypeError('Code must be a string');
    }
    if (name !== null && typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
  }

  get code() {
    return this._code;
  }

  set code(code) {
    this.constructor.checkPropertiesType(code);
    this._code = code;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this.constructor.checkPropertiesType(null, name);
    this._name = name;
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
