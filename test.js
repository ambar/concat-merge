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
    Array [
      Object {},
      Object {},
      Object {},
      Object {},
      Object {},
      Object {
        "0": 0,
      },
      Object {
        "b": Array [
          1,
          1,
          2,
        ],
      },
      Object {
        "a": 1,
        "l": Array [
          3,
        ],
        "o": null,
      },
      Object {
        "a": Object {
          "b": Object {
            "c": "c",
            "d": "d",
            "e": "e",
            "f": "f",
          },
        },
      },
      Object {
        "a": Array [
          Plugin {},
          Plugin {},
        ],
      },
      Object {
        "a": Plugin {
          "a": 1,
        },
      },
      Object {
        "a": Object {},
      },
      Object {
        "a": 1,
      },
    ]
  `)
})
