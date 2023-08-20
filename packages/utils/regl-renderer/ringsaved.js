/**
 * 3D Primitives Demonstration
 * @category Creating Shapes
 * @skillLevel 1
 * @description Demonstrating the basics of a variety of 3D primitives
 * @tags cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark
 * @licence MIT License
 */

// const jscad = require('@jscad/modeling')
import {jscad} from '@jscad/modeling'
const { cylinder, torus, cube, sphere, cuboid } = jscad.primitives
const { translate, rotateX } = jscad.transforms
const { union, intersect } = jscad.booleans
const { colorize, hexToRgb } = jscad.colors

const { subtract } = jscad.booleans
const { extrudeFromSlices, extrudeLinear, slice } = jscad.extrusions
const { geom2 } = jscad.geometries
const { hullChain } = jscad.hulls
const { mat4 } = jscad.maths
const { measureBoundingBox } = jscad.measurements
const { circle, ellipsoid } = jscad.primitives
const { vectorText } = jscad.text
const { scale, center } = jscad.transforms

const options = {
  // ringOuterRadius: 20,
  ringInnerRadius: 16,
  ringHeight: 35,
  jewelHeight: 10,
  jewelRadius: 8,
  strapColor: [0, 0, 0], // Default strap color is blue
  dialColor: [0, 0, 255], // Default dial color is white
}

const text = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  const message3D = extrudeLinear({ height: extrusionHeight }, message2D)
  return center({ axes: [true, true, false] }, message3D)
}

const getParameterDefinitions = (params) => [
  // { name: 'addLilypad', type: 'radio', checked: false, caption: 'Add a Lilypad:' },
  // { name: 'addNano', type: 'checkbox', checked: false, caption: 'Add a Nano Microcontroller:' },
  { name: 'addElectronics', type: 'radio', caption: 'Choose Microcontroller to add:', values:[0, 1, 2], captions:['None', 'Lilypad:(4mm radius, 4mm thick)', 'Nano:(4x4x5)mm'], initial: 0 },
  { name: 'ringOuterRadius', type: 'float', initial: 18, caption: 'Ring Thickness (in mm)' }, //works fine
  { name: 'thicknessValue', type: 'float', initial: 20, caption: 'Ring Radius (in mm)' }, //adds thickness and changes the inner radius of ring also
  { name: 'ringHeight', type: 'float', initial: options.ringHeight, caption: 'Jewel Position (in mm)' },
  { name: 'jewelHeight', type: 'float', initial: options.jewelHeight, caption: 'Jewel Height (in mm)' },
  { name: 'jewelRadius', type: 'float', initial: options.jewelRadius, caption: 'Jewel Radius (in mm)' },
  { name: 'strapColor', type: 'color', initial: '#0000FF', caption: 'Strap Color' },
  { name: 'dialColor', type: 'color', initial: '#006464', caption: 'Dial Color' },
  { name: 'Electronics-group', type: 'group', initial: 'closed', caption: 'Electronics Position w.r.t Jewel' },
  { name: 'ElectronicsXPosition', type: 'float', initial: 0, caption: 'Electronics X Position ' },
  { name: 'ElectronicsYPosition', type: 'float', initial: 0, caption: 'Electronics Y Position' },
  { name: 'ElectronicsZPosition', type: 'float', initial: options.ringHeight-options.jewelHeight+3, caption: 'Electronics Z Position' },
]



const initializeOptions = (params) => {
  options.strapColor = hexToRgb(params.strapColor)
  options.dialColor = hexToRgb(params.dialColor)
  options.ringOuterRadius = params.ringOuterRadius
  options.thicknessValue = params.thicknessValue
  options.ringHeight = params.ringHeight
  options.jewelHeight = params.jewelHeight
  options.jewelRadius = params.jewelRadius
}



const main = (params) => {
  initializeOptions(params)

   //const jewel = colorize([0,255,0],translate([0, 0, options.ringHeight / 2 + options.jewelHeight / 2], cylinder({ height: options.jewelHeight, radius: options.jewelRadius })))
 // const ring = colorize([255,0,0],rotateX(Math.PI / 2, torus({ outerRadius: options.ringOuterRadius, innerRadius: options.ringInnerRadius, height: options.ringHeight })))

  //const solid = union(colorize([0,0,255],ring), colorize([255,0,0],jewel))

  const ring = torus({ outerRadius: options.ringOuterRadius+options.thicknessValue, innerRadius: options.ringOuterRadius-1, height: options.ringHeight })
  const blob1 = translate([0, 0, 2.8],[scale([0.06,0.06,0.5],text("Electronics", 1, 1)),cylinder({ height: 4, radius: 4 })])
  const blob2 = translate([0, 0, 2.8],[scale([0.06,0.06,0.5],text("Electronics", 1, 1)),cuboid({ size: [5, 5, 4] })])
  var jewel = translate([0, 0, 0.8],cylinder({ height: options.jewelHeight/2, radius: options.jewelRadius }))
  

  var solid;
  console.log("ELECTORNCIS",params.addElectronics),
   params.addElectronics == 1 ? 
    solid = [
     translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],colorize(options.strapColor,subtract(jewel,translate([params.ElectronicsXPosition,params.ElectronicsYPosition,params.ElectronicsZPosition],blob1)))),
    //  translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],scale([0.04,0.04,0.5],text("Electronics", 2, 2))),
     translate([0,0,(options.ringHeight / 2 + options.jewelHeight)+10],colorize(options.dialColor,jewel)),
    //  translate([0,0,options.ringHeight + options.jewelHeight],colorize(options.dialColor,blob)),
     rotateX(Math.PI / 2,colorize(options.dialColor,ring))
    ]
    :
    params.addElectronics == 2 ? 
    
    solid = [
      translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],colorize(options.strapColor,subtract(jewel,translate([params.ElectronicsXPosition,params.ElectronicsYPosition,params.ElectronicsZPosition],blob2)))),
     //  translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],scale([0.04,0.04,0.5],text("Electronics", 2, 2))),
      translate([0,0,(options.ringHeight / 2 + options.jewelHeight)+10],colorize(options.dialColor,jewel)),
     //  translate([0,0,options.ringHeight + options.jewelHeight],colorize(options.dialColor,blob)),
      rotateX(Math.PI / 2,colorize(options.dialColor,ring))
     ]
    :
    solid = [
        translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],colorize(options.strapColor,jewel,)),
        //  translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],scale([0.04,0.04,0.5],text("Electronics", 2, 2))),
        translate([0,0,options.ringHeight / 2 + options.jewelHeight],colorize(options.dialColor,jewel)),
        //  translate([0,0,options.ringHeight + options.jewelHeight],colorize(options.dialColor,blob)),
        rotateX(Math.PI / 2,colorize(options.dialColor,ring))
      ]
   
   
  //  solid = params.addElectronics ? solid.concat(translate([params.ElectronicsXPosition,params.ElectronicsYPosition,params.ElectronicsZPosition],blob)) : solid
  //  solid = params.addElectronics ? subtract(blob, solid) : solid
  //  solid.push("Electronics")

   const aCube = colorize([1, 0, 0], translate([-4.5, 0, 0], cube()))
  const aSphere = colorize([0, 1, 0], translate([-5.2, -0.8, 0.8], sphere({ segments: 32 })))

  // const aUnion = union(jewel, blob)
  const aSubtract = subtract(solid, blob1)
  // const aIntersection = intersect(jewel, blob )
  return [
  //   aCube,
  //   aSphere,
    // translate([3, 0, 0], aUnion),
    // translate([6, 0, 0], aSubtract),
    // translate([9, 0, 0], aIntersection),
    aSubtract,
    solid
  ]

  // return solid
}

var w = new Array();
function a() {
   w.push( cube() );
    return w;
}

module.exports = { main, getParameterDefinitions, a }
