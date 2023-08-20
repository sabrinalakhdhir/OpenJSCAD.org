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

const options = {
  ringOuterRadius: 20,
  ringInnerRadius: 3,
  ringHeight: 5,
  jewelHeight: 10,
  jewelRadius: 8,
  strapColor: [0, 0, 0], // Default strap color is blue
  dialColor: [0, 0, 255], // Default dial color is white
}

const getParameterDefinitions = () => [
  { name: 'ringOuterRadius', type: 'float', initial: options.ringOuterRadius, caption: 'Ring Radius' },
  { name: 'ringInnerRadius', type: 'float', initial: options.ringInnerRadius, caption: 'Ring Thickness' },
  { name: 'ringHeight', type: 'float', initial: options.ringHeight, caption: 'Jewel Position' },
  { name: 'jewelHeight', type: 'float', initial: options.jewelHeight, caption: 'Jewel Height' },
  { name: 'jewelRadius', type: 'float', initial: options.jewelRadius, caption: 'Jewel Radius' },
  { name: 'strapColor', type: 'color', initial: '#0000FF', caption: 'Strap Color' },
  { name: 'dialColor', type: 'color', initial: '#006464', caption: 'Dial Color' },
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
  
   const solid = [
     translate([0,0,options.ringHeight / 2 + options.jewelHeight / 2],colorize(options.strapColor,jewel)),
     rotateX(Math.PI / 2,colorize(options.dialColor,ring))
   ]
  return solid
}

module.exports = { main, getParameterDefinitions }
