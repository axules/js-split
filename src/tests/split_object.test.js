import jsSplit, { select } from '../index';

const testData = [
  [{ a: 1, b: 2, c: 3, d: 4 }, [null], [{ a: 1, b: 2, c: 3, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [], [{ a: 1, b: 2, c: 3, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [[]], [{}, { a: 1, b: 2, c: 3, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['u1', 'u2']], [{}, { a: 1, b: 2, c: 3, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [[], []], [{}, {}, { a: 1, b: 2, c: 3, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a'], ['c']], [{ a: 1 }, { c: 3 }, { b: 2, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'aa'], ['c']], [{ a: 1 }, { c: 3 }, { b: 2, d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'b'], ['c']], [{ a: 1, b: 2 }, { c: 3 }, { d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'b'], ['c'], ['d']], [{ a: 1, b: 2 }, { c: 3 }, { d: 4 }, {}]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'b', 'unreal'], ['c']], [{ a: 1, b: 2 }, { c: 3 }, { d: 4 }]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'b'], ['c'], ['d', 'e']], [{ a: 1, b: 2 }, { c: 3 }, { d: 4 }, {}]],
  [{ a: 1, b: 2, c: 3, d: 4 }, [['a', 'b'], ['b', 'c'], ['c', 'd']], [{ a: 1, b: 2 }, { b: 2, c: 3 }, { c: 3, d: 4 }, {}]],
];

describe('jsSplit for object', () => {
  test.each(testData)('jsSplit(%j, ...%j) = %j', (obj, parts, expected) => {
    const result = jsSplit(obj, ...parts);
    expect(result).toEqual(expected);
  });
});

describe('select for object', () => {
  test.each(testData)('select(%j, ...%j) = %j', (obj, parts, expected) => {
    const result = select(obj, ...parts);
    expect(result).toEqual(expected[0]);
  });
});
