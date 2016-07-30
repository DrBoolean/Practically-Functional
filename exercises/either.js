const {assert} = require('chai')

describe("Either Exercises", () => {

  // Definitions
  // ====================
  const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    toString: () => `Right(${x})`
  })

  const Left = x =>
  ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    toString: () => `Left(${x})`
  })

  const fromNullable = x =>
    x != null ? Right(x) : Left(null)

  const tryCatch = f => {
    try {
      return Right(f())
    } catch(e) {
      return Left(e)
    }
  }

  const logIt = x => {
    console.log(x)
    return x
  }

  const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

  // Exercise: Either
  // Goal: Refactor each example using Either
  // Bonus: no curlies
  // =========================


  // Ex1: Refactor streetName to use Either instead of nested if's
  // =========================
  const street = user => {
    const address = user.address

    if(address) {
      return address.street
    } else {
      return 'no street'  
    }
  }


  it("Ex1: street", () => {
    const user = { address: { street: { name: "Willow" } } }
    assert.deepEqual(street(user), {name: "Willow"})
    assert.equal(street({}), "no street")
  })

  // Ex1: Refactor streetName to use Either instead of nested if's
  // =========================
  const streetName = user => {
    const address = user.address

    if(address) {
      const street = address.street

      if(street) {
        return street.name
      }
    }

    return 'no street'
  }

  it("Ex1: streetName", () => {
    const user = { address: { street: { name: "Willow" } } }
    assert.equal(streetName(user), "Willow")
    assert.equal(streetName({}), "no street")
    assert.equal(streetName({ address: { street: null } }), "no street")
  })


  // Ex2: Refactor parseDbUrl to return an Either instead of try/catch
  // =========================
  const parseDbUrl = cfg => {
    try {
      const c = JSON.parse(cfg) // throws if it can't parse
      return c.url.match(DB_REGEX)
    } catch(e) {
       return null
    }
  }

  it("Ex1: parseDbUrl", () => {
    const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}' 
    assert.equal(parseDbUrl(config)[1], "sally")
    assert.equal(parseDbUrl(), null)
  })



  // Ex3: Using Either and the functions above, refactor startApp
  // =========================
  const startApp = cfg => {
    const parsed = parseDbUrl(cfg)

    if(parsed) {
      const [_, user, password, db] = parsed
      return `starting ${db}, ${user}, ${password}`
    } else {
      return "can't get config"
    }
  }




  it("Ex3: startApp", () => {
    const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
    assert.equal(String(startApp(config)), "starting mydb, sally, muppets")
    assert.equal(String(startApp()), "can't get config")
  })

})
