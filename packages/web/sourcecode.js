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

const getParameterDefinitions = (params) => [{ name: 'addElectronics', type: 'checkbox', checked:1, caption: 'Add Electronics:' },{ name: 'ringOuterRadius', type: 'float', initial:5, caption: 'Ring Radius' },
