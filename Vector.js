export function v(x, y) {
  return new Vector(x, y)
}

export default class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  equals(that) {
    return this.x === that.x && this.y === that.y
  }

  add(that) {
    this.x += that.x
    this.y += that.y
    return this
  }

  clone() {
    return new Vector(this.x, this.y)
  }
}
