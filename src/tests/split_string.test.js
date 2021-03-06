import jsSplit, { select } from '../index';

const testData = [
  ['It is text', [null], ['It is text']],
  ['It is text', [], ['It is text']],
  ['It is text', ['lalala'], ['It is text']],
  ['It is text', [0], ['It is text']],
  ['It is text', [1], ['I', 't', ' ', 'i', 's', ' ', 't', 'e', 'x', 't']],
  ['It is text', [3], ['It ', 'is ', 'tex', 't']],
  ['It is text', [100], ['It is text']],
];

describe('jsSplit for String', () => {
  test.each(testData)('jsSplit(%j, ...%j) = %j', (obj, parts, expected) => {
    const result = jsSplit(obj, ...parts);
    expect(result).toEqual(expected);
  });
});

describe('select for String', () => {
  const selectTestData = testData.map(el => [el[0], el[1][0], el[2][0]]);
  test.each(selectTestData)('select(%j, %j) = %j', (obj, part, expected) => {
    const result = select(obj, part);
    expect(result).toEqual(expected);
  });
});
