/**
 * 3D Primitives Demonstration
 * @category Creating Shapes
 * @skillLevel 1
 * @description Demonstrating the basics of a variety of 3D primitives
 * @tags cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder, torus } = jscad.primitives
const { translate, rotateX } = jscad.transforms
const { union } = jscad.booleans
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
  ringInnerRadius: 3,
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

const getParameterDefinitions = (params) => [{ name: 'addElectronics', type: 'checkbox', checked:false, caption: 'Add Electronics:' },{ name: 'ringOuterRadius', type: 'float', initial:40, caption: 'Ring Radius' },{ name: 'ringInnerRadius', type: 'float', initial: params? params.ringInnerRadius : options.ringInnerRadius, caption: 'Ring Thickness' },
  { name: 'ringHeight', type: 'float', initial: options.ringHeight, caption: 'Jewel Position' },
  { name: 'jewelHeight', type: 'float', initial: options.jewelHeight, caption: 'Jewel Height' },
  { name: 'jewelRadius', type: 'float', initial: options.jewelRadius, caption: 'Jewel Radius' },
  { name: 'strapColor', type: 'color', initial: '#0000FF', caption: 'Strap Color' },
  { name: 'dialColor', type: 'color', initial: '#006464', caption: 'Dial Color' },
  { name: 'Electronics-group', type: 'group', initial: 'closed', caption: 'Electronics' },
  { name: 'ElectronicsXPosition', type: 'float', initial: 0, caption: 'Electronics X Position' },
  { name: 'ElectronicsYPosition', type: 'float', initial: 0, caption: 'Electronics Y Position' },
  { name: 'ElectronicsZPosition', type: 'float', initial: options.ringHeight-options.jewelHeight+3, caption: 'Electronics Z Position' },
]



const initializeOptions = (params) => {
  options.strapColor = hexToRgb(params.strapColor)
  options.dialColor = hexToRgb(params.dialColor)
  options.ringOuterRadius = params.ringOuterRadius
  options.ringInnerRadius = params.ringInnerRadius
  options.ringHeight = params.ringHeight
  options.jewelHeight = params.jewelHeight
  options.jewelRadius = params.jewelRadius
}



const main = (params) => {
  initializeOptions(params)

   //const jewel = colorize([0,255,0],translate([0, 0, options.ringHeight / 2 + options.jewelHeight / 2], cylinder({ height: options.jewelHeight, radius: options.jewelRadius })))
 // const ring = colorize([255,0,0],rotateX(Math.PI / 2, torus({ outerRadius: options.ringOuterRadius, innerRadius: options.ringInnerRadius, height: options.ringHeight })))

  //const solid = union(colorize([0,0,255],ring), colorize([255,0,0],jewel))

  const jewel = cylinder({ height: options.jewelHeight, radius: options.jewelRadius })
  const ring = torus({ outerRadius: options.ringOuterRadius, innerRadius: options.ringInnerRadius, height: options.ringHeight })
  const blob = [scale([0.06,0.06,0.5],text("Electronics", 2, 2)),cylinder({ height: 1, radius: 5 })]
  
  
   var solid = [
     translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],colorize(options.strapColor,jewel)),
     rotateX(Math.PI / 2,colorize(options.dialColor,ring))
   ]
   
   
   solid = params.addElectronics ? solid.concat(translate([params.ElectronicsXPosition,params.ElectronicsYPosition,params.ElectronicsZPosition],blob)) : solid
   solid.push("Electronics")

  return solid
}

module.exports = { main, getParameterDefinitions }
