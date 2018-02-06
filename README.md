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

### [Initialize Matrix with Green Font and Black Backgroud](https://emb417.github.io/what-is-the-matrix/matrix-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'matrix-theme',
      'fontColor': '0,255,0',
      'themeColor': '0,0,0'
    } );
  </script>
...
```

### [Initialize Matrix with Green Font and White Backgroud](https://emb417.github.io/what-is-the-matrix/matrix-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'white-theme',
      'fontColor': '0,255,0',
      'themeColor': '255,255,255'
    } );
  </script>
...
```

### [Initialize Matrix with Override Values for Fast Decay](https://emb417.github.io/what-is-the-matrix/fast-decay-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'fast-decay-theme',
      'themeAlpha': '0.5'
    } );
  </script>
...
```

### [Initialize Matrix with Override Values for Slow Rain](https://emb417.github.io/what-is-the-matrix/slow-rain.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'slow-rain',
      'fontSpeed': '500'
    } );
  </script>
...
```

### [Initialize Matrix with Various Font Sizes](https://emb417.github.io/what-is-the-matrix/matrix-3d-theme.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'matrix-3d-theme',      
      'fontColor': '0,255,0',
      'fontSizeOffsets': [-4,0,4,32],
      'fontSpeed': 80,
      'themeColor': randomRGBColor(),
      'themeAlpha': 0.1,
      'themeColor': '0,0,0',
    } );
  </script>
...
```

### [Initialize Matrix with Override Values for New Charset](https://emb417.github.io/what-is-the-matrix/new-chars.html)
```
...
  <script>
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'new-chars',
      'charset': ['A','B','C','X','Y','Z']
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
