/**
 * whatIsTheMatrix accepts a configOverride object...
 * @param {Object} configOverride - see parameters below...
 * @param {number} canvasHeight - defaults to window.innerHeight
 * @param {string} canvasId - defaults to 'what-is-the-matrix'
 * @param {number} canvasWidth - defaults to window.innerWidth
 * @param {Array} charset - default size 42, starting at char code 65393
 * @param {number} fontAlpha - font transparency, defaults to 0.8, then each column randomizes
 * @param {string} fontColor - rgb, defaults to random
 * @param {string} fontFace - defaults to arial
 * @param {number} fontSize - pt, defaults to window.outerWidth / 100
 * @param {Array} fontSizeOffsets - randomly adds to fontSize, defaults to [0]
 * @param {number} fontSpeed - ms, default is 80ms
 * @param {number} themeAlpha - font decay, defaults to 0.09
 * @param {string} themeColor - rgb, default is black
 */

const randomArrayIndex = ( length = 0 ) => Math.floor( Math.random() * length );
const randomRGBColor = () => Array.from( new Array(3), ( x, i ) => randomArrayIndex(256) ).join(',');
const randomRoll = ( size ) => Math.abs( Math.random() * size );
const selectFontAlpha = ( configOverride = null ) => configOverride && configOverride.fontAlpha || Math.random();
const selectFontColor = ( configOverride = null ) => configOverride && configOverride.fontColor || randomRGBColor();
const selectFontSize = ( config ) => config.fontSize * config.fontSizeOffsets[ randomArrayIndex(config.fontSizeOffsets.length) ];

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
    'fontSizeOffsets': [1],
    'fontSpeed': 80,
    'themeAlpha': 0.09,
    'themeColor': '0,0,0',
    ...configOverride
  }

  // create array of columns based on canvas width and font size
  // and populate with fixed x position, random y start position
  // and font transparency, font color, and font size based on overrides or defaulted
  const columns = Array.from( new Array( Math.round( config.canvasWidth / config.fontSize ) ),
                              ( x, i ) => ({
                                'fontAlpha': selectFontAlpha( configOverride ),
                                'fontColor': selectFontColor( configOverride ),
                                'fontSize': config.fontSize,
                                'xPosition': i * config.fontSize,
                                'yPosition': randomArrayIndex( randomRoll(100) * config.fontSize),
                              })
                            );

  // create canvas for drawing
  const cnvs = document.createElement('canvas');
    // set canvas id, background, height and width
    cnvs.setAttribute('id', config.canvasId);
    cnvs.setAttribute('style', `background: rgb( ${ config.themeColor } )`);
    cnvs.setAttribute('height', config.canvasHeight);
    cnvs.setAttribute('width', config.canvasWidth);
    // use the 2d context for rendering
    const ctx = cnvs.getContext('2d');
    // append the canvas to the html body
    document.body.appendChild(cnvs);

  // draw a character at an interval based on font speed
  setInterval( () => {
    // overlays transparent background color for fade effect
    ctx.fillStyle = `rgba( ${ config.themeColor }, ${ config.themeAlpha } )`;
    ctx.fillRect( 0, 0, config.canvasWidth, config.canvasHeight );

    // what is the matrix, chaotic beauty (read: this is the maths)
    columns.map( ( column, index, character ) => {
      // set font color, size and face
      ctx.fillStyle = `rgba( ${ column.fontColor }, ${ column.fontAlpha } ) `;
      ctx.font = `${ column.fontSize }pt ${ config.fontFace }`;
      // grab a random character from the charset and draw in column x at position y
      ctx.fillText( config.charset[ randomArrayIndex(config.charset.length) ],
                    column.xPosition,
                    column.yPosition
                  );
      // randomly decide to get new random starting position
      // OR draw next character below previous character
      if( column.yPosition > ( Math.random() * 1e4 ) ) {
        column.fontAlpha = selectFontAlpha( configOverride );
        column.fontColor = selectFontColor( configOverride );
        column.fontSize = selectFontSize( config );
        column.yPosition = randomRoll(100) * column.fontSize;
      }
      else {
        column.yPosition = Math.abs( column.yPosition + column.fontSize + 2 );
      }
    });
  }, config.fontSpeed );
};
