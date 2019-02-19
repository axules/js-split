import jsSplit from '../index';

const testData = [
  [null, [{ a: true }], [null]],
  [false, [{ a: true }], [false]],
  [true, [{ a: true }], [true]],
  [undefined, [{ a: true }], [undefined]],
  [111223, [['a', 'b']], [111223]],
  [3.1415926, [2], [3.1415926]],
];

describe('jsSplit', () => {
  test.each(testData)('jsSplit(%j, ...%j) = %j', (obj, parts, expected) => {
    const result = jsSplit(obj, ...parts);
    expect(result).toEqual(expected);
  });
});
