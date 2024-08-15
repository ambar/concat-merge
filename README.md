# concat-merge

[![test workflow](https://github.com/ambar/concat-merge/actions/workflows/test.yml/badge.svg)](https://github.com/ambar/concat-merge/actions/workflows/test.yml)

Recursively merge objects, especially for webpack/rollup configs.

## Comparison

| name                                                                                                                                                        | immutable | concat           | dedupe           | clone            | multiple parameters | recommended |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------- | ---------------- | ---------------- | ------------------- | ----------- |
| concat-merge <br> [![concat-merge](https://img.shields.io/bundlephobia/minzip/concat-merge)](https://bundlephobia.com/package/concat-merge)                 | `true`    | `true`           | `false`          | `true`           | yes                 | yes         |
| merge-deep <br> [![merge-deep](https://img.shields.io/bundlephobia/minzip/merge-deep)](https://bundlephobia.com/package/merge-deep)                         | `true`    | `true`           | `true`           | `true`           | yes                 | yes         |
| deepmerge <br> [![deepmerge](https://img.shields.io/bundlephobia/minzip/deepmerge)](https://bundlephobia.com/package/deepmerge)                             | `true`    | `true`           | `false`          | `false` (option) | no                  |             |
| lodash/merge <br> [![lodash.merge](https://img.shields.io/bundlephobia/minzip/lodash.merge)](https://bundlephobia.com/package/lodash.merge)                 | `false`   | `false`          | `false`          | `true`           | yes                 |             |
| lodash/mergeWith <br> [![lodash.mergewith](https://img.shields.io/bundlephobia/minzip/lodash.mergewith)](https://bundlephobia.com/package/lodash.mergewith) | `false`   | `false` (option) | `false` (option) | `true`           | yes                 | yes         |

## Install

```
npm install concat-merge
```

## Usage

```js
import concatMerge from 'concat-merge'

concatMerge(baseConfig, {
  input: 'entry.js',
  plugins: [inject({React: 'react'})],
})
```

lodash equivalent:

```js
import mergeWith from 'lodash/mergeWith'

const concatMerge = (...args) =>
  mergeWith({}, ...args, (prev, next) => {
    if (Array.isArray(prev)) {
      return prev.concat(next)
    }
  })
```
