# What is the Matrix?

This was a fun project using random maths to replicate the Matrix digital rain visualization.  The initial implementation was a background for a website, but I tried to make it "modular" so it can be configured as a widget of sorts.

This repo has a basic implementation of the main function, whatIsTheMatrix, found in [index.js](./index.js).

The function takes an optional parameter, an override object [(see index.js)](./index.js), then uses ES.Next object spread to set overrides (read: only works with latest chrome and firefox, see the [original implementation](#original-matrix-implementation) for support across all browsers but limited overrides).

## Usage Example

### [Initialize Matrix with Default Values](https://emb417.github.io/what-is-the-matrix/)
```
<html>
  <head>
    <meta charset="utf-8">
    <title>What is the Matrix?</title>
    <style>
    * { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
  </body>
  <script src='index.js'></script>
  <script>
    // init the matrix with defaults
    whatIsTheMatrix();
  </script>
</html>
```

### [Initialize Matrix with Green Font](https://emb417.github.io/what-is-the-matrix/green-font.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'green-font',
      'fontColors': ['0,255,0'],
    } );
  </script>
...
```

### [Initialize Matrix with White Backgroud](https://emb417.github.io/what-is-the-matrix/white-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'white-theme',
      'themeColor': '255,255,255',
    } );
  </script>
...
```

### [Initialize Matrix with Fast Decay](https://emb417.github.io/what-is-the-matrix/fast-decay.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'fast-decay',
      'themeAlpha': '0.5'
    } );
  </script>
...
```

### [Initialize Matrix with Slow Rain](https://emb417.github.io/what-is-the-matrix/slow-rain.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'slow-rain',
      'fontSpeed': '500',
    } );
  </script>
...
```

### [Initialize Matrix with 3D Theme and Multi-colored](https://emb417.github.io/what-is-the-matrix/3d-theme.html)
```
...
  <script>
  // init the matrix with overrides
  whatIsTheMatrix( {
    'canvasId': '3d-theme',
    'fontColors': [
      //'255,0,0',      //red
      '0,255,0',      //green
      //'0,0,255',      //blue
      '255,255,255',  //white
      //'0,0,0',        //black
      //'255,255,0',    //yellow
      //'0,255,255',    //aqua
      //'255,0,255',    //purple
    ],
    'fontSizeOffsets': [
      0.3,
      0.6,
      1.0,
      1.3,
      1.6,
      2.0,
      3.0,
      4.0,
    ],
    'fontSpeed': 50,
    'themeAlpha': 0.05,
  } );
  </script>
...
```

### [Initialize Matrix with Custom Charset](https://emb417.github.io/what-is-the-matrix/custom-chars.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'custom-chars',
      'charset': ['A','B','C','X','Y','Z'],
    } );
  </script>
...
```

### [Initialize Matrix with Random Background Color](https://emb417.github.io/what-is-the-matrix/random-background-color-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'random-background-color-theme',
      'themeColor': randomRGBColor(),
    } );
  </script>
...
```

### [Initialize Matrix with Random Font Color](https://emb417.github.io/what-is-the-matrix/random-font-color.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'random-font-color',
      'fontColors': [(randomRGBColor())],
    } );
  </script>
...
```

### [Original Matrix Implementation](https://emb417.github.io/what-is-the-matrix/vanilla-es5.html)
```
<html><head>
 <meta charset="utf-8">
 <title>Matrix</title>
<style>
* {margin: 0; padding: 0;}
body {background: black;}
canvas {display: block;}
</style>
</head>
 <body>
<script>
var whatIsTheMatrix = function(ts,td){
  var cnvs = document.createElement('canvas');
  cnvs.setAttribute('id','theMatrix');
  document.body.appendChild(cnvs);
    cnvs.setAttribute('height',window.innerHeight);
    cnvs.setAttribute('width',window.innerWidth);
  var ctx = cnvs.getContext("2d");
  textSize = ts || (Math.floor(window.outerWidth/100));
  textDecay = td || 0.002;
  var charset = " 0123456789";
    for (i = 0; i < 50; i++){charset += String.fromCharCode(i + 65393);}
    charset = charset.slice(11).split("");
  var yPositions = Array(Math.round(cnvs.width/textSize)).join(0).split('');
  var draw = function () {
    ctx.fillStyle='rgba(0,0,0,'+(textSize*textDecay)+')';
    ctx.fillRect(0,0,cnvs.width,cnvs.height);
    ctx.fillStyle='#0F0';
    ctx.font = textSize+'pt arial';
    yPositions.map(
      function(y, index, text, x){
        text = charset[Math.floor(Math.random()*charset.length)];
        x = (index * textSize);
        ctx.fillText(text, x, y);
         if(y > (Math.random()*1e4))
         {
            var randomStartPosition = Math.floor(Math.random()*10)*Math.floor(Math.random()*10);
            yPositions[index]=randomStartPosition*textSize;
         }
         else
         {
            yPositions[index] = Math.abs(y + textSize);
         }
      });
    };
setInterval(draw, 50);
};
whatIsTheMatrix();
</script>
</body></html>
```
