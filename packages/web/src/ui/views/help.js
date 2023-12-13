const html = require('nanohtml')


const help = (state, i18n) => {
  const exampleUl = require('./examples')(state, i18n)
  //const electronicsUl = require('./electronics')(state, i18n)
  const io = require('./io.js')(state, i18n)
  
  return html`
    <section id='help' class="popup-menu" style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <input type="file" value="${i18n`load project`}" id="fileLoader" multiple webkitdirectory mozdirectory msdirectory odirectory directory  accept="application/javascript"/>
        <label for="fileLoader"> ${i18n`load project`}> </label>
      </div>
      <div>
      <h2 style = margin-top:5% >OR</h2>
        <h3>${i18n`Choose from Preexisting Designs`}:</h3>
        ${exampleUl}
        
      </div>
    </section>
  `
}

module.exports = help

// commented out after ${exampleUI} : ${electronicsUl}
