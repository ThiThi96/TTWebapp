/* eslint-disable no-param-reassign */
function compareHelper(lvalue, rvalue, options) {
  if (arguments.length < 3) { throw new Error("Handlerbars Helper 'compare' needs 2 parameters"); }

  const operator = options.hash.operator || '==';

  const operators = {
    // eslint-disable-next-line eqeqeq
    '==': (l, r) => l == r,
    '===': (l, r) => l === r,
    // eslint-disable-next-line eqeqeq
    '!=': (l, r) => l != r,
    '<': (l, r) => l < r,
    '>': (l, r) => l > r,
    '<=': (l, r) => l <= r,
    '>=': (l, r) => l >= r,
    // eslint-disable-next-line valid-typeof
    typeof(l, r) { return typeof l === r; },
  };

  if (!operators[operator]) { throw new Error(`Handlerbars Helper 'compare' doesn't know the operator ${operator}`); }

  const result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  }
  return options.inverse(this);
}

function Times(n, block) {
  let accum = '';
  for (let i = 0; i < n; i += 1) {
    block.data.index = i;
    block.data.position = i + 1;
    block.data.first = i === 0;
    block.data.last = i === (n - 1);
    accum += block.fn(this);
  }
  return accum;
}

module.exports = {
  compare: compareHelper,
  loop: Times,
};
