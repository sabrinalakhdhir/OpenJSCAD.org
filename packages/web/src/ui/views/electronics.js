const html = require('nanohtml')
const path = require('path')

const electronicsData = require('../../../examples/electronics.json')

const electronics = (state, i18n) => {
  const baseUrl = new URL(window.location.href)
  const origin = (baseUrl.origin === 'null') ? 'file://' : baseUrl.origin
  let newPath = origin + path.dirname(baseUrl.pathname)
  newPath = newPath.endsWith('/') ? newPath : newPath + path.sep

  const electronicsMenus = []
  for (const groupName in electronicsData) {
    if (!Object.prototype.hasOwnProperty.call(electronicsData, groupName)) continue
    const electronicsElements = electronicsData[groupName].map((electronics) =>
      html`<li>
          <a class="electronics" title="${electronics.description}" data-path="${newPath}${electronics.filePath}" href="#"> ${electronics.title} </a>
        </li>`
    )
    electronicsMenus.push(html`<li>${groupName}<ul class="examples-list">${electronicsElements}</ul></li>`)
  }
  return html`<ul class="electronics-group">${electronicsMenus}</ul>`
}

module.exports = electronics
