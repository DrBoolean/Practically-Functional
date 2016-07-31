const {assert} = require('chai')
const {List, Map} = require('immutable-ext')

describe("Monoid Exercises", () => {

  const Sum = x =>
  ({
    x: x,
    concat: o => Sum(x + o.x),
    toString: () => `Sum(${x})`
  })
  Sum.empty = () => Sum(0)

  const Product = x =>
  ({
    x: x,
    concat: o => Product(x * o.x),
    toString: () => `Product(${x})`
  })
  Product.empty = () => Product(1)

  const Any = x =>
  ({
    x: x,
    concat: o => Any(x || o.x),
    toString: () => `Any(${x})`
  })
  Any.empty = () => Any(false)




  // Ex1: reimplement sum using foldMap and the Sum Monoid
  // =========================

  const sum = xs => List(xs).foldMap(Sum, Sum.empty())


  it("Ex1: sum", () => {
    assert.equal(String(sum([1,2,3])), "Sum(6)")
  })


  // Ex2: reimplement lessThanZero using foldMap and the Any Monoid
  // =========================

  const anyLessThanZero = xs =>
    List(xs).foldMap(x => Any(x < 0 ? true : false), Any.empty())


  it("Ex2: anyLessThanZero", () => {
    assert.equal(String(anyLessThanZero([-2, 0, 4])), "Any(true)")
     assert.equal(String(anyLessThanZero([2, 0, 4])), "Any(false)")
  })


  // Ex3: Rewrite the reduce with a Max monoid (see Sum/Product/Any templates above)
  // =========================
  const Max = x =>
  ({
    x: x,
    concat: o => Max(x > o.x ? x : o.x),
    toString: () => `Max(${x})`
  })
  Max.empty = () => Max(-Infinity)

  const max = xs =>
    List(xs).foldMap(Max, Max.empty())


  it("Ex3: max", () => {
    assert.equal(String(max([-2, 0, 4])), "Max(4)")
    assert.equal(String(max([12, 0, 4])), "Max(12)")
  })

  // Ex4 (Bonus): Write concat for Tuple
  // =========================

  const Tuple = (_1, _2) =>
  ({
    _1,
    _2,
    concat: o =>
      Tuple(_1.concat(o._1), _2.concat(o._2))
  })

  it("Ex4: tuple", () => {
    const t1 = Tuple(Sum(1), Product(2))
    const t2 = Tuple(Sum(5), Product(2))
    const t3 = t1.concat(t2)
    assert.equal(String(t3._1), "Sum(6)")
    assert.equal(String(t3._2), "Product(4)")
  })
})
