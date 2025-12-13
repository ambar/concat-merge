import {test, expect} from 'vitest'
import concatMerge from './index'

class Plugin {
  constructor(props) {
    Object.assign(this, props)
  }
}

const cases = [
  [],
  [null, null],
  [true, false],
  [1, 0],
  ['a', 'b'],
  // unknow behavior
  [[1], [0]],
  // concat, no dedupe
  [{b: [1]}, {b: [1, 2]}],
  [{a: 1, l: [3]}, {o: null}],
  [{a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}}],
  [{a: [new Plugin()]}, {a: [new Plugin()]}],
  // value clone
  [{a: new Plugin()}, {a: {a: 1}}],
  // override
  [{a: {}}, {a: new Plugin()}],
  // top level clone
  [new Plugin(), {a: 1}],
]

test('match result', () => {
  expect(cases.map((args) => concatMerge(...args))).toMatchInlineSnapshot(`
    [
      {},
      {},
      {},
      {},
      {},
      {
        "0": 0,
      },
      {
        "b": [
          1,
          1,
          2,
        ],
      },
      {
        "a": 1,
        "l": [
          3,
        ],
        "o": null,
      },
      {
        "a": {
          "b": {
            "c": "c",
            "d": "d",
            "e": "e",
            "f": "f",
          },
        },
      },
      {
        "a": [
          Plugin {},
          Plugin {},
        ],
      },
      {
        "a": Plugin {
          "a": 1,
        },
      },
      {
        "a": {},
      },
      {
        "a": 1,
      },
    ]
  `)
})

test('multiple parameters', () => {
  expect(concatMerge({a: 1}, {b: 2}, {c: 3})).toMatchInlineSnapshot(`
    {
      "a": 1,
      "b": 2,
      "c": 3,
    }
  `)
})

test('prototype pollution protection', () => {
  const defaultUser = {
    username: 'guest',
    role: 'visitor',
  }

  const maliciousPayload = JSON.parse(`{
    "__proto__": {
      "isAdmin": true,
      "role": "admin"
    }
  }`)

  const mergedUser = concatMerge(defaultUser, maliciousPayload)
  // no pollution
  expect(mergedUser.isAdmin).toBeUndefined()
  expect(mergedUser.role).toBe('visitor')
  expect(mergedUser.username).toBe('guest')
  // no pollution to Object.prototype
  expect(Object.prototype.isAdmin).toBeUndefined()
  expect(Object.prototype.role).toBeUndefined()
})
