/* eslint-disable no-underscore-dangle */
class ProductDetail {
  constructor(detail) {
    this._id = detail.ProductDetailId;
    this._sizeId = detail.SizeId;
    this._colourId = detail.ColourId;
  }

  get id() { return this._id; }

  set id(value) { this._id = value; }

  get sizeId() { return this._sizeId; }

  set sizeId(value) { this._sizeId = value; }

  get colourId() { return this._colourId; }

  set colourId(value) { this._colourId = value; }

  get number() { return this._number; }

  set number(value) { this._number = value; }
}

module.exports = ProductDetail;
