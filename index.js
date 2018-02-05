/**
 * whatIsTheMatrix accepts a configOverride object...
 * @param {Object} configOverride - see parameters below...
 * @param {number} canvasHeight - defaults to window.innerHeight
 * @param {string} canvasId - defaults to 'what-is-the-matrix'
 * @param {number} canvasWidth - defaults to window.innerWidth
 * @param {Array} charset - default size 42, starting at char code 65393
 * @param {number} fontAlpha - font transparency, defaults to 0.8
 * @param {string} fontColor - rgb, defaults to random
 * @param {string} fontFace - defaults to arial
 * @param {number} fontSize - pt, defaults to window.outerWidth / 100
 * @param {Array} fontSizeOffsets - randomly adds to fontSize, defaults to [0]
 * @param {number} fontSpeed - ms, default is 100ms
 * @param {string} themeColor - rgb, default is random
 * @param {number} themeAlpha - font decay, defaults to 0.2
 */

const randomFloor = ( length = 0 ) => Math.floor( Math.random() * length );

const randomRGBColor = () => Array.from( new Array(3), ( x, i ) => randomFloor(256) ).join(',');

const whatIsTheMatrix = ( configOverride ) => {

  // config object, spreads configOverride after defaults are set
  const config = {
    'canvasHeight': window.innerHeight,
    'canvasId': 'what-is-the-matrix',
    'canvasWidth': window.innerWidth,
    'charset': Array.from( new Array(42), (x, i) => String.fromCharCode(i + 65393) ),
    'fontAlpha': 0.8,
    'fontColor': randomRGBColor(),
    'fontFace': 'arial',
    'fontSize': Math.floor( window.outerWidth / 100 ),
    'fontSizeOffsets': [0],
    'fontSpeed': 100,
    'themeAlpha': 0.2,
    'themeColor': randomRGBColor(),
    ...configOverride
  }

  // create canvas for drawing
  const cnvs = document.createElement('canvas');
    // set an id for custom styling
    cnvs.setAttribute('id', config.canvasId);
    cnvs.setAttribute('style', `background: rgb( ${ config.themeColor } )`);

  // append the canvas to the html body
  document.body.appendChild(cnvs);
    // default height and width based on current window size
    cnvs.setAttribute('height', config.canvasHeight);
    cnvs.setAttribute('width', config.canvasWidth);

  // using a 2d context for rendering in the canvas
  const ctx = cnvs.getContext('2d');

  // create array of columns based on canvas width
  const columns = Array( Math.round( config.canvasWidth / config.fontSize ) ).join(0).split('');

  // draw a character every 50ms
  setInterval( () => {
    // set background color
    ctx.fillStyle = `rgba( ${ config.themeColor }, ${ config.themeAlpha } )`;
    // create rectangle
    ctx.fillRect( 0, 0, config.canvasWidth, config.canvasHeight );

    // what is the matrix, chaotic beauty (read: this is the maths)
    columns.map( ( y, index, character, x ) => {
      // randomly decide to get new random starting position
      // OR draw next character below previous character
      if(y > ( Math.random() * 1e4) ) {
        const randomStartPosition = randomFloor(10) * randomFloor(10);
        columns[index] = randomStartPosition * config.fontSize;
      }
      else {
        columns[index] = Math.abs( y + config.fontSize );
      }
      // set font color
      ctx.fillStyle = `rgba( ${ config.fontColor }, ${ config.fontAlpha } ) `;
      // set font size and font face
      ctx.font = `${ config.fontSize + config.fontSizeOffsets[ randomFloor(config.fontSizeOffsets.length) ] }pt ${ config.fontFace }`;
      // grab a character from the array
      character = config.charset[ randomFloor(config.charset.length) ];
      // select a column
      x = index * config.fontSize;
      // draw a character
      ctx.fillText( character, x, y );
    });
  }, config.fontSpeed );
};
