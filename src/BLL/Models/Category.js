/* eslint-disable no-underscore-dangle */
class Category {
  constructor(category) {
    this._id = category.CategoryId;
    this._name = category.CategoryName;
    this._number = category.Number ? category.Number : 0;
    this._subCategories = [];
  }

  get id() { return this._id; }

  set id(value) { this._id = value; }

  get name() { return this._name; }

  set name(value) { this._name = value; }

  get number() { return this._number; }

  set number(value) { this._number = value; }

  get subCategories() { return this._subCategories; }

  set subCategories(value) { this._subCategories = value; }
}

module.exports = Category;
