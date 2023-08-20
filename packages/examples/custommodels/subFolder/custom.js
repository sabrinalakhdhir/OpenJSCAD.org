const jscad = require('@jscad/modeling')


function cube() {
    return cube({size: 10})
}

function sphere() {
    return sphere({radius: 10})
}

const main = (params) => {
    if (params == 0) {
        return cube()
    }
    else if(params == 1) {
        return sphere()
    }
    return 
}

module.exports ={main} 