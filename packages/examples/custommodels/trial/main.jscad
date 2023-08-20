// title      : Remote Control Holder Test
// author     : Wolfgang Fahl
// license    : Apache License
// revision   : 0.0.1
// tags       : Cube
// file       : RCHolder/main.jscad
include ("Box.jscad");

//
function main() {
  BoxFactory();
  width = 55;
  height = 45;
  len = 30;
  wall = 1.5;
  var boxes = [];
  box=BoxFactory.create(width, len, height, wall, false);
  boxo= BoxFactory.create(width,len,height,wall,false);

  x0=-width*1.5;
  y0=-95
  box.at(x0, y0, 0);
  var ls = [30, 25, 25, 20, 20, 25];
  i=0;
  x=0;
  ls.forEach(function(length) {
    box.length=length;
    if (++i>3) {
      box.x=x0;
      box.y=y0+len-wall;
      i=0;
    }
    boxo.x=box.x;
    boxo.y=box.y;
    boxo.z=box.z;
    boxes.push(box.box());
    boxes.push(boxo.box());
    box.move(width-wall,0,0);
  });
  return union(boxes);
}