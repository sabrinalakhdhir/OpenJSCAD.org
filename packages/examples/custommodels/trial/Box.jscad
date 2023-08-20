// title      : Box Test
// author     : Wolfgang Fahl
// license    : Apache License
// revision   : 0.0.1
// tags       : Cube
// file       : Box.jscad
class Box {
  constructor(width, length, height, wall, center) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.wall = wall;
    this.center = center;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  /**
   *  create a box
   */
  box() {
    return difference(
      cube({
        size: [this.width, this.length, this.height],
        center: this.center
      }),
      cube({
        size: [this.width - this.wall * 2, this.length - this.wall * 2, this.height - this.wall],
        center: this.center
      }).translate([this.wall, this.wall, this.wall])
    ).translate([this.x, this.y, this.z])
  }

  at(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  move(x, y, z) {
    this.at(this.x + x, this.y + y, this.z + z);
  }
}

BoxFactory=function () {
   BoxFactory.create=function(pWidth, pLength, pHeight, pWall, pCenter) {
     return new Box(pWidth,pLength,pHeight,pWall,pCenter);
   }
}