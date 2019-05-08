# js-split

## What is it?

It is simple function that gets Object (or Array, or String) and returns parts of this.

## Installation

```
npm install --save js-split
```

# How it works?
Sometimes we need split object by keys and we cant do it by JS native functions. `js-split` can help you with it!

This package includes two functions: main function that exported by default and extra function `select`.

```javascript
import jsSplit, { select } from 'js-split';
...
```

## Split Objects

### jsSplit(myObject: Object, partKeys1: Array or Object, [partKeys2: Array or Object, ...]): Array

`result` is Array that contains all parts and rest of `myObject` (**[part1, part2, ..., rest]**)


```javascript
  import jsSplit from 'js-split';
  const v1 = jsSplit({a: 1, b: 2, c: 3, d: 4}, ['a'], ['c']); 
  // v1 = [{a: 1}, {c: 3}, {b: 2, d: 4}]
  const v2 = jsSplit({a: 1, b: 2, c: 3, d: 4}, {a: true}, {c: -1}); 
  // v2 = [{a: 1}, {c: 3}, {b: 2, d: 4}]
```

## Split Arrays

### jsSplit(myArray: Array, partKeys1: Array, [partKeys2: Array, ...]): Array

`result` is Array that contains all parts and rest of `myArray` (**[part1, part2, ..., rest]**)

```javascript
  import jsSplit from 'js-split';
  const v1 = jsSplit([1,2,3,4], [0,3], [1]); 
  // v1 = [[1,4],[2],[3]]
```

**or**
### jsSplit(myArray: Object, partLength: Number): Array
`result` is Array that contains all parts of `myArray`, each part is `partLength` size.

```javascript
  import jsSplit from 'js-split';
  const v1 = jsSplit([1,2,3,4,5], 2); 
  // v1 = [[1,2], [3,4], [5]]
```

## Split Strings

### jsSplit(myText: String, partLength: Number): Array

`result` is Array that contains all parts of `myText`, each part is `partLength` size.

```javascript
  import jsSplit from 'js-split';
  const v1 = jsSplit('Hello, people!', 3); 
  // v1 = ['Hel', 'lo,', ' pe', 'opl', 'e!']
```

## Additional function `Select`

`select(...)` it is equal of `jsSplit(...)[0]` and it has been added for extra situation when you need to get only first result.

```javascript
import jsSplit from 'js-split';
// ...
const firstPart = jsSplit(myObj, partKeys)[0];
// ...
```

**OR** the same result by `select`

```javascript
import { select } from 'js-split';
// ...
const firstPart = select(myObj, partKeys);
// ...
```

# Examples

### `jsSplit` for String
```javascript
import jsSplit from 'js-split';

jsSplit('It is text', 1); 
// = ['I', 't', ' ', 'i', 's', ' ', 't', 'e', 'x', 't']
jsSplit('It is text', 3); 
// = ['It ', 'is ', 'tex', 't']
jsSplit('It is text', 100); 
// = ['It is text']
```

### `select` for String
```javascript
import { select } from 'js-split';

select('It is text', 1); 
// = 'I'
select('It is text', 3); 
// = 'It '
select('It is text', 100); 
// = 'It is text'
```

### `jsSplit` for Array
```javascript
import jsSplit from 'js-split';

jsSplit([1,2,3,4], 2); 
// = [[1,2], [3,4]]
jsSplit([1,2,3,4], 3); 
// = [[1,2,3], [4]]
jsSplit([1,2,3,4], 4); 
// = [[1,2,3,4]]
jsSplit([1,2,3,4], 10); 
// = [[1,2,3,4]]
jsSplit([1,2,3,4], [], []); 
// = [[],[],[1,2,3,4]]
jsSplit([1,2,3,4], [1,3]); 
// = [[2,4],[1,3]]
jsSplit([1,2,3,4], ['1', '3']); 
// = [[2,4],[1,3]]
jsSplit([1,2,3,4], [1,3], [0]); 
// = [[2,4],[1],[3]]
jsSplit([1,2,3,4], [1,3], [0], [99]); 
// = [[2,4],[1],[],[3]]
jsSplit([1,2,3,4], [1,3], [0], [2], [99]); 
// = [[2,4],[1],[3],[],[]]

// you can reuse indexes
jsSplit([1,2,3,4], [1,3], [0,1]); 
// = [[2,4],[1,2],[3]]
```

### `select` for Array
```javascript
import { select } from 'js-split';

select([1,2,3,4], 2); 
// = [1,2]
select([1,2,3,4], 3); 
// = [1,2,3]
select([1,2,3,4], 10); 
// = [1,2,3,4]
select([1,2,3,4], [1,3]); 
// = [2,4]
```

### `jsSplit` for Object
```javascript
import jsSplit from 'js-split';

jsSplit({a: 1, b: 2, c: 3, d: 4}, []); 
// = [{},{a: 1, b: 2, c: 3, d: 4}]
jsSplit({a: 1, b: 2, c: 3, d: 4}, {}); 
// = [{},{a: 1, b: 2, c: 3, d: 4}]
jsSplit({a: 1, b: 2, c: 3, d: 4}, ['a'],['c']); 
// = [{a: 1},{c: 3},{b: 2, d: 4}]
jsSplit({a: 1, b: 2, c: 3, d: 4}, {a: true},{c: false}); 
// = [{a: 1},{c: 3},{b: 2, d: 4}]

// undefined values can't be added to result
jsSplit({a: 1, b: 2, c: 3, d: 4}, ['a', 'aa'],['c']); 
// = [{a: 1},{c: 3},{b: 2, d: 4}]

// you can reuse keys
jsSplit({a: 1, b: 2, c: 3, d: 4}, ['a', 'b'],['b', 'c'],['c', 'd']); 
// = [{a: 1, b: 2}, {b: 2, c: 3}, {c: 3, d: 4}, {}]
```

### `select` for Object
```javascript
import { select } from 'js-split';

select({a: 1, b: 2, c: 3, d: 4}, []); 
// = {}
select({a: 1, b: 2, c: 3, d: 4}, ['a', 'b']); 
// = {a: 1, b: 2}
select({a: 1, b: 2, c: 3, d: 4}, ['a', 'b', 'unreal']); 
// = {a: 1, b: 2}
```
