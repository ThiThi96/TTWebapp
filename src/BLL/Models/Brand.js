class Brand {
  constructor(brand) {
    this._id = brand.BrandId;
    this._name = brand.BrandName;
    this._number = brand.NumberOfProducts;
  }

  get id() {
    return this._id
  }
  set id(value) {
    this._id = value
  }

  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }

  get number() {
    return this._number
  }
  set number(value) {
    this._number = value
  }
}

module.exports = Brand;
