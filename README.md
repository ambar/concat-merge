# concat-merge

Recursively merge configs for webpack/rollup.

## Comparison

| name                                                                                                                                                     | immutable | concat           | dedupe           | clone            | multiple parameters | recommended |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------- | ---------------- | ---------------- | ------------------- | ----------- |
| concat-merge <br> [![concat-merge](https://badgen.net/bundlephobia/minzip/concat-merge)](https://bundlephobia.com/result?p=concat-merge)                 | `true`    | `true`           | `false`          | `true`           | yes                 | yes         |
| merge-deep <br> [![merge-deep](https://badgen.net/bundlephobia/minzip/merge-deep)](https://bundlephobia.com/result?p=merge-deep)                         | `true`    | `true`           | `true`           | `true`           | yes                 | yes         |
| deepmerge <br> [![deepmerge](https://badgen.net/bundlephobia/minzip/deepmerge)](https://bundlephobia.com/result?p=deepmerge)                             | `true`    | `true`           | `false`          | `false` (option) | no                  |             |
| lodash/merge <br> [![lodash.merge](https://badgen.net/bundlephobia/minzip/deepmerge)](https://bundlephobia.com/result?p=deepmerge)                       | `false`   | `false`          | `false`          | `true`           | yes                 |             |
| lodash/mergeWith <br> [![lodash.mergewith](https://badgen.net/bundlephobia/minzip/lodash.mergewith)](https://bundlephobia.com/result?p=lodash.mergewith) | `false`   | `false` (option) | `false` (option) | `true`           | yes                 | yes         |

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
