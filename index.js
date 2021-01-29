const isObject = (v) => v !== null && typeof v === 'object'

const isPlainObject = (v) => {
  if (!isObject(v)) {
    return false
  }
  if (!('constructor' in v)) {
    return true
  }
  let proto = Object.getPrototypeOf(v)
  return !proto || !Object.getPrototypeOf(proto)
}

const concatMerge = (a, b) => {
  a = isObject(a) ? a : {}
  b = isObject(b) ? b : {}
  const r = {}
  const keys = Object.keys(a).concat(Object.keys(b))
  for (const key of keys) {
    const va = a[key]
    if (key in b) {
      const vb = b[key]
      if (Array.isArray(va)) {
        r[key] = Array.isArray(vb) ? va.concat(vb) : vb
      } else if (isObject(va)) {
        r[key] = isObject(vb)
          ? isPlainObject(va)
            ? concatMerge(va, vb)
            : Object.assign(va, vb)
          : vb
      } else {
        r[key] = vb
      }
    } else {
      r[key] = va
    }
  }
  return r
}

export default concatMerge
