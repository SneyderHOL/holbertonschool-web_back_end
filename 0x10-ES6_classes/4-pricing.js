import Currency from './3-currency';

export default class Pricing {
  constructor(amount, currency) {
    this.constructor.checkPropertiesType(amount, currency);
    this._amount = amount;
    this._currency = currency;
  }

  static checkPropertiesType(amount = null, currency = null) {
    if (amount !== null && typeof amount !== 'number') {
      throw TypeError('Amount must be a number');
    }
    if (currency !== null && !(currency instanceof Currency)) {
      throw (TypeError('Currency must be a Currency object'));
    }
  }

  get amount() {
    return this._amount;
  }

  set amount(amount) {
    this.constructor.checkPropertiesType(amount);
    this._amount = amount;
  }

  get currency() {
    return this._currency;
  }

  set currency(currency) {
    this.constructor.checkPropertiesType(null, currency);
    this._currency = currency;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  static convertPrice(amount, conversionRate) {
    if (typeof amount !== 'number') {
      throw (TypeError('amount must be a number'));
    }
    if (typeof conversionRate !== 'number') {
      throw (TypeError('conversionRate must be a number'));
    }
    return amount * conversionRate;
  }
}
