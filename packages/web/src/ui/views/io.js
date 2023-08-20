const html = require('nanohtml');
const FileSaver = require('file-saver');
const { Scene, Mesh, MeshNormalMaterial, WebGLRenderer } = require('three');
const editor = require('./editor').getEditorSourceCode();
const examplesData = require('../../../examples/examples.json') //see if I can access the code of ring.js and update parameters by using a function 

let designparameter;
const io = (state, i18n) => {
  // console.log("state in io:", state.design.parameterValues);
  designparameter = state.design.parameterValues;
  const formatsList = state.io.availableExportFormats.map(({ name, displayName }) => {
    displayName = i18n.translate(displayName);
    const selected = state.io.exportFormat
      ? state.io.exportFormat.toLowerCase() === name.toLowerCase()
      : undefined;
    return html`<option value=${name} selected='${selected}'>${displayName}</option>`;
  });

  const exportAvailable = state.io.availableExportFormats.length > 0;
  const saveFile = () => {
    let substring1 = "const getParameterDefinitions = (params) => [";
    let substring2 = "{ name: 'ringInnerRadius', type: 'float', initial: params? params.ringInnerRadius : options.ringInnerRadius, caption: 'Ring Thickness' },"
    let code = require('./editor').getEditorSourceCode()
    console.log("require('./editor').getEditorSourceCode():", code.slice(0, code.indexOf(substring1) + substring1.length))
    let code1 = code.slice(0, code.indexOf(substring1) + substring1.length)
   
    let code3 = code.slice(code.indexOf(substring2))

    let code2 = "{ name: 'addElectronics', type: 'checkbox', checked:" + designparameter.addElectronics + ", caption: 'Add Electronics:' }," +
    "{ name: 'ringOuterRadius', type: 'float', initial:"+ designparameter.ringOuterRadius+ ", caption: 'Ring Radius' },"
  //   { name: 'ringInnerRadius', type: 'float', initial: params? params.ringInnerRadius : options.ringInnerRadius, caption: 'Ring Thickness' },
  //   { name: 'ringHeight', type: 'float', initial: options.ringHeight, caption: 'Jewel Position' },
  //   { name: 'jewelHeight', type: 'float', initial: options.jewelHeight, caption: 'Jewel Height' },
  //   { name: 'jewelRadius', type: 'float', initial: options.jewelRadius, caption: 'Jewel Radius' },
  //   { name: 'strapColor', type: 'color', initial: '#0000FF', caption: 'Strap Color' },
  //   { name: 'dialColor', type: 'color', initial: '#006464', caption: 'Dial Color' },
  //   { name: 'Electronics-group', type: 'group', initial: 'closed', caption: 'Electronics' },
  //   { name: 'ElectronicsXPosition', type: 'float', initial: 0, caption: 'Electronics X Position' },
  //   { name: 'ElectronicsYPosition', type: 'float', initial: 0, caption: 'Electronics Y Position' },
  //   { name: 'ElectronicsZPosition', type: 'float', initial: options.ringHeight-options.jewelHeight+3, caption: 'Electronics Z Position' },
  // ]"
    
    console.log("state change", designparameter);
    let codefinal = code1 + code2 + code3;
    console.log("codefinal:", codefinal);
    //Add functionality so that require('./editor').getEditorSourceCode() is replaced by designparameter in the appropriate place and then saved
    
    
    const blob = new Blob([codefinal], {
      type: 'text/javascript;charset=utf-8',
    });
    FileSaver.saveAs(blob, 'sourcecode.js');
  };

  const handleFileLoad = (event) => {
    const existingCode = require('./editor').getEditorSourceCode();
    console.log("existingCode:", existingCode);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      // Process the loaded file without overwriting the existing code
      const loadedCode = existingCode + e.target.result;
      // Perform necessary operations with the loadedCode
      // ...
    };
    reader.readAsText(file);
  };

  return html`
    <span id='io'>
    
      <span id='exports' style='visibility:${exportAvailable ? 'visible' : 'hidden'}'>
        <input type="file" id="fileLoader" multiple webkitdirectory mozdirectory msdirectory odirectory directory  accept="application/javascript"/>
        <button id='save' aria-label='save' onclick=${saveFile}>Save Code</button>
        
        <select id='exportFormats'>${formatsList}</select>
        <input type='button' value="${i18n`Export Model`}" id="exportBtn"/>
      </span>
    </span>
  `;
};

module.exports = io;
