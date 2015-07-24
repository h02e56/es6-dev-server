// factory pattern
export function factory () {
  let counter = 0
  let add = () => {
    return ++counter
  }
  return {counter, add}
}

// class sintactic sugar for prottoypre oop
export function Foo () {
  let Foo = class Foo {
    constructor (x = 0, y = 0) {
      this.x = x
      this.y = y
      this.render = () => {
        return `(${this.x}, ${this.y})`
      }
    }
  }
  return new Foo()
}

