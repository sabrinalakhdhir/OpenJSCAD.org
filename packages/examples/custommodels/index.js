const jscad = require('@jscad/modeling')
// const html = require('nanohtml')

const custom = require('./subFolder/custom')
const sphere = require('./subFolder/sphereShape')
const { sphereShape } = require('./subFolder/sphereShape')
const ringsaved = require('./subFolder/ringsaved')


const dom = () => {
  const output = `
    <div id='header'>
      <span id='jscadName'>
        <h3>JSCAD</h3>
      </span>
    </div>
    `
    return output
}

var w = new Array();
const main = () => {
 
    //call sphereShape mulitple times to get multiple spheres

    for (let i = 0; i < 10; i++) {
        w.push(sphereShape(10,i*2))
        w.push(ringsaved.main())
    }
    return w
}

module.exports = {main}