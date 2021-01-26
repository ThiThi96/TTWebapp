/* eslint-disable no-underscore-dangle */
class OrderDetail {
  constructor(detail) {
    this._id = detail.id;
    this._productId = detail.ProductId;
    this._price = detail.Price;
    this._discount = detail.Discount ? detail.Discount : 0;
    this._image = detail.Image;
    this._name = detail.ProductName;
    this._quantity = detail.Quantity;
    this._detailTotal = detail.DetailTotal ? detail.DetailTotal : 0;
  }

  get id() { return this._id; }

  set id(value) { this._id = value; }

  get productId() { return this._productId; }

  set productId(value) { this._productId = value; }

  get price() { return this._price; }

  set price(value) { this._price = value; }

  get discount() { return this._discount; }

  set discount(value) { this._discount = value; }

  get image() { return this._image; }

  set image(value) { this._image = value; }

  get name() { return this._name; }

  set name(value) { this._name = value; }

  get quantity() { return this._quantity; }

  set quantity(value) { this._quantity = value; }

  get total() {
    return this._detailTotal - this._detailTotal * (this._discount / 100);
  }

  set total(value) { this._quantity = value; }
}

module.exports = OrderDetail;
