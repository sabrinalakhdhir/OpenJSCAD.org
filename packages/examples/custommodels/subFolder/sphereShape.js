/*
// title       : Modular Project Design Example
// author      : Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the structure of a multi-file project
// file        : sphereShape.js
// tags        : project, module, code, files, subfolder
*/

const { sphere } = require('@jscad/modeling').primitives
const { colorize } = require('@jscad/modeling').colors
const { translateZ, translate } = require('@jscad/modeling').transforms
// const LED = require('../LED.stl')

const sphereShape = (radius, x) => colorize([1, 0, 0, 1], translateZ(x+radius, sphere({ radius })))
// const setLED = () => {
//     translate([-5, 6, 0], LED)
// }

module.exports = {sphereShape}
