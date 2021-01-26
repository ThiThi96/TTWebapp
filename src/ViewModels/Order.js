const Status = {
  OnHold: {
    Value: 1,
    Description: 'On hold',
  },
  BeingPrepared: {
    Value: 2,
    Description: 'Being prepared',
  },
  Cancelled: {
    Value: 3,
    Description: 'Cancelled',
  },
  Received: {
    Value: 4,
    Description: 'Received',
  },
};

const orders = [
  {
    id: 1,
    date: '31/10/2019',
    subTotal: '$ 150.00',
    shippingCost: '$ 10',
    total: '$ 160.00',
    tax: '$ 0.00',
    products: [
      {
        id: 1,
        name: 'White Blouse Armani',
        category: 'Ladies',
        brand: 'Armani',
        price: '$124.00',
        image: '/img/product1.jpg',
        quantity: 2,
        discount: '$0.00',
        total: '$248',
      },
      {
        id: 3,
        name: 'Fur coat',
        category: 'Ladies',
        brand: 'Armani',
        price: '$200.00',
        image: '/img/product3.jpg',
        quantity: 3,
        discount: '$0.00',
        total: '$600',
      },

    ],
    status: Status.OnHold,
  },
  {
    id: 2,
    date: '22/04/2020',
    shippingCost: '$ 10',
    total: '$ 310',
    tax: '$ 0.00',
    products: [
      {
        id: 1,
        name: 'White Blouse Armani',
        category: 'Ladies',
        brand: 'Armani',
        price: '$124.00',
        image: '/img/product1.jpg',
        quantity: 2,
      },
      {
        id: 3,
        name: 'Fur coat',
        category: 'Ladies',
        brand: 'Armani',
        price: '$200.00',
        image: '/img/product3.jpg',
        quantity: 3,
      },

    ],
    status: Status.BeingPrepared,
  },
  {
    id: 3,
    date: '03/02/2020',
    total: '$ 600',
    shippingCost: '$ 10',
    tax: '$ 0.00',
    products: [
      {
        id: 1,
        name: 'White Blouse Armani',
        category: 'Ladies',
        brand: 'Armani',
        price: '$124.00',
        image: '/img/product1.jpg',
        quantity: 2,
      },
      {
        id: 3,
        name: 'Fur coat',
        category: 'Ladies',
        brand: 'Armani',
        price: '$200.00',
        image: '/img/product3.jpg',
        quantity: 3,
      },

    ],
    status: Status.Cancelled,
  },
  {
    id: 4,
    date: '07/04/2020',
    shippingCost: '$ 10',
    total: '$ 164',
    tax: '$ 0.00',
    products: [
      {
        id: 1,
        name: 'White Blouse Armani',
        category: 'Ladies',
        brand: 'Armani',
        price: '$124.00',
        image: '/img/product1.jpg',
        quantity: 2,
      },
      {
        id: 3,
        name: 'Fur coat',
        category: 'Ladies',
        brand: 'Armani',
        price: '$200.00',
        image: '/img/product3.jpg',
        quantity: 3,
      },

    ],
    status: Status.Received,
  },
  {
    id: 5,
    date: '07/03/2020',
    shippingCost: '$ 10',
    total: '$ 232',
    tax: '$ 0.00',
    products: [
      {
        id: 1,
        name: 'White Blouse Armani',
        category: 'Ladies',
        brand: 'Armani',
        price: '$124.00',
        image: '/img/product1.jpg',
        quantity: 2,
      },
      {
        id: 3,
        name: 'Fur coat',
        category: 'Ladies',
        brand: 'Armani',
        price: '$200.00',
        image: '/img/product3.jpg',
        quantity: 3,
      },

    ],
    status: Status.Received,
  },
];

module.exports = {
  orders,
  statusEnums: Status,
};
