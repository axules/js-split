function XRemovedElementX() {}

export default function jsSplit(pObj) {
  if (!pObj || arguments.length < 2 || arguments[1] == null) return [pObj];

  var parts = Array.prototype.slice.call(arguments, 1);

  if (Array.isArray(pObj)) {
    if (parts.length == 1 && typeof(parts[0]) == 'number') return splitArrayByCount(pObj, parts[0]);
    return splitArray(pObj, parts);
  }

  if (pObj instanceof Object) {
    return splitObject(pObj, parts);
  }

  if (typeof(pObj) == 'string') {
    if (parts.length == 1 && typeof(parts[0]) == 'number') return splitArrayByCount(pObj, parts[0]);
  }

  return [pObj];
}

export function select(pObj, part) {
  return jsSplit.call(this, pObj, part)[0];
}

function splitObject(pObj, partsKeys) {
  var objectRest = Object.assign({}, pObj);
  var result = partsKeys.map(function (keys) {
    if (Array.isArray(keys) || keys instanceof Object) {
      return (
        Array.isArray(keys) ? keys : Object.keys(keys)
      ).reduce(function (R, key) {
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
  if (count <= 0) return [pArr];
  var result = [];
  var partsCount = Math.ceil(pArr.length / count);
  for (var i = 0; i < partsCount; i++) {
    var p = i * count;
    result.push(pArr.slice(p, p + count));
  }
  return result;
}

function splitArray(pArr, partsIndexes) {
  var arrayRest = pArr.slice(0);
  var result = partsIndexes.map(function (indexes) {
    if (Array.isArray(indexes)) {
      return indexes.reduce(function (R, index) {
        if (pArr.length > index) {
          R.push(pArr[index]);
          arrayRest[index] = arrayRest[index] instanceof XRemovedElementX 
            ? arrayRest[index]
            : new XRemovedElementX();
        }
        return R;
      }, []);
    }
    return [];
  });

  result.push(arrayRest.filter(function(el) { return !(el instanceof XRemovedElementX) }));
  return result;
}
