/**
 * whatIsTheMatrix accepts a configOverride object...
 * @param {Object} configOverride - see parameters below...
 * @param {string} canvasId - defaults to 'what-is-the-matrix'
 * @param {number} canvasHeight - defaults to window.innerHeight
 * @param {number} canvasWidth - defaults to window.innerWidth
 * @param {number} textSize - defaults to window.outerWidth / 100
 * @param {number} textDecay - defaults to 0.002
 * @param {Array} charset - default size 50, starting at char code 65393
 * @param {number} speed - default is 50ms
 */
const whatIsTheMatrix = ( configOverride ) => {

  // config object, spreads configOverride after defaults are set
  const config = {
    'canvasId': 'what-is-the-matrix',
    'canvasHeight': window.innerHeight,
    'canvasWidth': window.innerWidth,
    'textSize': Math.floor( window.outerWidth / 100 ),
    'textDecay': 0.002,
    'charset': Array.from( new Array(50), (x, i) => String.fromCharCode(i + 65393) ),
    'speed': 50,
    ...configOverride
  }

  // create canvas for drawing
  const cnvs = document.createElement('canvas');
    // set an id for custom styling
    cnvs.setAttribute('id', config.canvasId);
    cnvs.setAttribute('style', 'background: black');

  // append the canvas to the html body
  document.body.appendChild(cnvs);
    // default height and width based on current window size
    cnvs.setAttribute('height', config.canvasHeight);
    cnvs.setAttribute('width', config.canvasWidth);

  // using a 2d context for rendering in the canvas
  const ctx = cnvs.getContext('2d');

  // determine possible y positions based on canvas width
  const yPositions = Array( Math.round( config.canvasWidth / config.textSize ) ).join(0).split('');

  // draw a character every 50ms
  setInterval( () => {
    // fade to black
    ctx.fillStyle = `rgba( 0, 0, 0, ${( config.textSize * config.textDecay )} )`;
    // create rectangle
    ctx.fillRect( 0, 0, config.canvasWidth, config.canvasHeight );
    // use matrix green
    ctx.fillStyle = '#0F0';
    // set text size with arial font
    ctx.font = `${ config.textSize }pt arial`;

    // what is the matrix, chaotic randomness (read: this is the maths)
    yPositions.map( ( y, index, text, x ) => {
      // grab a character from the array
      text = config.charset[ Math.floor( Math.random() * config.charset.length ) ];
      // select a column
      x = index * config.textSize;
      // draw a character
      ctx.fillText( text, x, y );
      // if next position is off the screen, get new random starting position
      // otherwise draw next character below previous character
      if(y > ( Math.random() * 1e4) ) {
        const randomStartPosition = Math.floor( Math.random() * 10 ) * Math.floor( Math.random() * 10 );
        yPositions[index] = randomStartPosition * config.textSize;
      }
      else {
        yPositions[index] = Math.abs( y + config.textSize );
      }
    });
  }, config.speed );
};
