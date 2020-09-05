export function v(x, y) {
  return new Vector(x, y)
}

export default class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  clone() {
    return new Vector(this.x, this.y)
  }
}
