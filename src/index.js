function XRemovedArrayElement() {}

export default function jsSplit(pObj) {
  if (!pObj || arguments.length < 2 || !arguments[1]) return [pObj];

  const parts = Array.prototype.slice.call(arguments, 1);

  if (Array.isArray(pObj)) {
    if (parts.length == 1 && typeof parts[0] == 'number') return splitArrayByCount(pObj, parts);
    return splitArray(pObj, parts);
  }

  if (pObj instanceof Object) {
    return splitObject(pObj, parts);
  }

  if (typeof pObj == 'string') {
    splitString(pObj, parts);
  }
  return [pObj];
}

export function select() {
  return jsSplit.apply(this, arguments)[0];
}

function splitObject(pObj, partsKeys) {
  const objectRest = Object.assign({}, pObj);
  const result = partsKeys.map(function (keys) {
    if (Array.isArray(keys)) {
      return keys.reduce(function (R, key) {
        if (pObj.hasOwnProperty(key)) {
          R[key] = pObj[key];
          delete objectRest[key];
        }
        return R;
      }, {});
    }
    return {};
  });

  result.push(objectRest);
  return result;
}

function splitArrayByCount(pArr, count) {
  const result = [];
  for (var i = 0; i < pArr.length; i += count) {
    result.push(pArr.slice(i, count));
  }
  return result;
}

function splitArray(pArr, partsIndexes) {
  const arrayRest = pArr.slice(0);
  const result = partsIndexes.map(function (indexes) {
    if (Array.isArray(indexes)) {
      return indexes.reduce(function (R, index) {
        if (pArr.length > index) {
          R.push(pArr[index]);
          arrayRest[index] = new XRemovedArrayElement();
        }
        return R;
      }, []);
    }
    return [];
  });

  result.push(arrayRest.filter(function(el) { return !(el instanceof XRemovedArrayElement) }));
  return result;
}

function splitString(pString, parts) {
  return [pString];
}