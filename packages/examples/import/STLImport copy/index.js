/**
 * STL Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing STL files. Drag the whole STLImport folder into JSCAD
 * @tags stl, import
 * @authors Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { cylinder } = jscad.primitives
const LED = require('./LED.stl')
const utils = require('./utils.js')
const ring = require('./ringsaved.js')
const { union } = require('@jscad/modeling').booleans

const { translate, scale, rotateZ } = require('@jscad/modeling').transforms

const main = () => {
  let hexRadius = utils.hexWidthToRadius(12)
  
  return union(
    translate([0, 0, 13], rotateZ(-Math.PI / 3, scale([0.25, 0.25, 0.25], LED))),
    translate([-5, 6, 0], ring.main( 
      {
        ringOuterRadius: 20,
        ringInnerRadius: 3,
        ringHeight: 5,
        jewelHeight: 10,
        jewelRadius: 8,
        strapColor: [0,0,0], 
        dialColor: [0,0,0], 
      }
    )))
}

module.exports = { 
  main 
  }
