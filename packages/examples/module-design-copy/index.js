/**
 * Modular Project Design Example
 * @category Projects
 * @skillLevel 1
 * @description Demonstrating the structure of a multi-file project
 * @tags measurements, bounds, boundingbox
 * @authors Moissette Mark, Simon Clark
 * @licence MIT License
 */
const jscad = require('@jscad/modeling')
const { colorize, hexToRgb } = jscad.colors
const { translate, rotateZ } = require('@jscad/modeling').transforms

const ringShape = require('./subFolder/ringsaved.js')
const LED = require('./LED.stl')
const blob = require('./blob.stl')
const Buzzer = require('./buzzer.stl')
const LCD = require('./LCD.stl')
//can import list of electronics available for this item. 
//Eg for ring you cant have big LCD screen, but LED, Buzzer, etc is possible.

const getParameterDefinitions = () => {
  const globalParams = [
    { name: 'showRing', type: 'checkbox', checked: true, caption: 'Show ring:' },
    { name: 'AddElectronics', type: 'checkbox', checked: false, caption: 'Add Electronics:' },
    { nume: 'numberofRings' , type: 'int', initial: 1, caption: 'Number of Rings:'},
  ]

  const electronicsParams = [
    { name: 'ElectronicsXPosition', type: 'float', initial: 0, caption: 'Electronics X Position' },
    { name: 'ElectronicsYPosition', type: 'float', initial: 0, caption: 'Electronics Y Position' },
    { name: 'ElectronicsZPosition', type: 'float', initial: 0, caption: 'Electronics Z Position' },
  ]

  // const ElectronicsParams = [
  //   { name: 'Electronics-group', type: 'group', initial: 'closed', caption: 'Add Electronics' },
  //   { name: 'showLED', type: 'checkbox', checked: false, caption: 'Show LED:' },
  //   { name: 'showBuzzer', type: 'checkbox', checked: false, caption: 'Show Buzzer:' },
  //   { name: 'showLCD', type: 'checkbox', checked: false, caption: 'Show LCD:' },
  // ]
  // const LEDParams = [
  //   { name: 'LED-group', type: 'group', initial: 'closed', caption: 'LED' },
  //   { name: 'LEDXPosition', type: 'float', initial: 0, caption: 'LED X Position' },
  //   { name: 'LEDYPosition', type: 'float', initial: 0, caption: 'LED Y Position' },
  //   { name: 'LEDZPosition', type: 'float', initial: 0, caption: 'LED Z Position' },
  // ]

  // const buzzerParams = [
  //   { name: 'Buzzer-group', type: 'group', initial: 'closed', caption: 'Buzzer' },
  //   { name: 'BuzzerXPosition', type: 'float', initial: 0, caption: 'Buzzer X Position' },
  //   { name: 'BuzzerYPosition', type: 'float', initial: 0, caption: 'Buzzer Y Position' },
  //   { name: 'BuzzerZPosition', type: 'float', initial: 0, caption: 'Buzzer Z Position' },
  // ]

  // const LCDParams = [
  //   { name: 'LCD-group', type: 'group', initial: 'closed', caption: 'LCD' },
  //   { name: 'LCDXPosition', type: 'float', initial: 0, caption: 'LCD Rotation' },
  //   { name: 'LCDRotation', type: 'float', initial: 0, caption: 'LCD X Position' },
  //   { name: 'LCDYPosition', type: 'float', initial: 0, caption: 'LCD Y Position' },
  //   { name: 'LCDZPosition', type: 'float', initial: 0, caption: 'LCD Z Position' },
   

  // ]
  // // Load the parameters defined in the mountPlate sub-file, and add them to the project parameters.
  const ringParams = ringShape.getParameterDefinitions()
  
  globalParams.push(...ringParams)
  // globalParams.push(...ElectronicsParams)
  // globalParams.push(...LEDParams)
  // globalParams.push(...buzzerParams)
  // globalParams.push(...LCDParams)
  globalParams.push(...electronicsParams)

  return globalParams
}
let results = []
const main = (params) => {
  console.log("params: ", params)
  
  results = params.showRing ? results.concat(
    ringShape
    .main({
      ringOuterRadius: params.ringOuterRadius,
      ringInnerRadius: params.ringInnerRadius,
      ringHeight: params.ringHeight,
      jewelHeight: params.jewelHeight,
      jewelRadius: params.jewelRadius,
      strapColor: params.strapColor, 
      dialColor:  params.dialColor,
    })
  ) : results
  // results = params.showLED ? results.concat(translate([params.LEDXPosition,params.LEDYPosition,params.LEDZPosition],LED)) : results
  // results = params.showBuzzer ? results.concat(translate([params.BuzzerXPosition,params.BuzzerYPosition,params.BuzzerZPosition],Buzzer)) : results
  // results = params.showLCD ? results.concat(translate([params.LCDRotation,params.LCDYPosition,params.LCDZPosition],rotateZ(-Math.PI/params.LCDXPosition,LCD))) : results
  results = params.AddElectronics ? results.concat(translate([params.ElectronicsXPosition,params.ElectronicsYPosition,params.ElectronicsZPosition],blob)) : results
  
  return results
}

module.exports = { main, getParameterDefinitions }
