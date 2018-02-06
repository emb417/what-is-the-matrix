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

const randomStartPosition = () => randomFloor(10) * randomFloor(10);

const randomFontSize = ( config ) => config.fontSize + config.fontSizeOffsets[ randomFloor(config.fontSizeOffsets.length) ];

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

  // create array of columns based on canvas width and font size
  // and populate with random y start positions
  const columns = Array.from( new Array( Math.round( config.canvasWidth / config.fontSize ) ),
                              ( x, i ) => ({
                                'xPosition': i * config.fontSize,
                                'yPosition': randomFloor((randomStartPosition()) * config.fontSize),
                                'fontSize': randomFontSize( config ),
                              })
                            );

  // create canvas for drawing
  const cnvs = document.createElement('canvas');
    // set an id for custom styling
    cnvs.setAttribute('id', config.canvasId);
    cnvs.setAttribute('style', `background: rgb( ${ config.themeColor } )`);
    // default height and width based on current window size
    cnvs.setAttribute('height', config.canvasHeight);
    cnvs.setAttribute('width', config.canvasWidth);
    // using a 2d context for rendering in the canvas
    const ctx = cnvs.getContext('2d');
    // append the canvas to the html body
    document.body.appendChild(cnvs);

  // draw a character at an interval based on font speed
  setInterval( () => {
    // resets background color for fade effect
    ctx.fillStyle = `rgba( ${ config.themeColor }, ${ config.themeAlpha } )`;
    ctx.fillRect( 0, 0, config.canvasWidth, config.canvasHeight );

    // what is the matrix, chaotic beauty (read: this is the maths)
    columns.map( ( column, index, character ) => {
      // set font color, size and face
      ctx.fillStyle = `rgba( ${ config.fontColor }, ${ config.fontAlpha } ) `;
      ctx.font = `${ column.fontSize }pt ${ config.fontFace }`;
      // grab a random character from the charset and draw in column x at position y
      ctx.fillText( config.charset[ randomFloor(config.charset.length) ], column.xPosition, column.yPosition );
      // randomly decide to get new random starting position
      // OR draw next character below previous character
      if(column.yPosition > ( Math.random() * 1e4) ) {
        column.fontSize = randomFontSize( config );
        column.yPosition = (randomStartPosition()) * column.fontSize;
      }
      else {
        column.yPosition = Math.abs( column.yPosition + column.fontSize );
      }
    });
  }, config.fontSpeed );
};
