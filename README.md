# What is the Matrix?

This was a fun project using random maths to replicate the Matrix digital rain visualization.  The initial implementation was a background for a website, but I tried to make it "modular" so it can be configured as a widget of sorts.

This repo has a basic implementation of the main function, whatIsTheMatrix, found in index.js.

The function takes an optional parameter, an override object with these parameters:

* @param {string} canvasId - defaults to 'what-is-the-matrix'
* @param {number} canvasHeight - defaults to window.innerHeight
* @param {number} canvasWidth - defaults to window.innerWidth
* @param {number} textSize - defaults to window.outerWidth / 100
* @param {number} textDecay - defaults to 0.002
* @param {Array} charset - default size 50, starting at char code 65393
* @param {number} speed - default is 50ms

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

### [Initialize Matrix with Override Values for Fast Decay](https://emb417.github.io/what-is-the-matrix/fast-decay.html)
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
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'matrix-override',
      'textDecay': '0.005'
    } );
  </script>
</html>
```

### [Initialize Matrix with Override Values for Slow Rain](https://emb417.github.io/what-is-the-matrix/slow-rain.html)
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
    // init the matrix with overrides
    whatIsTheMatrix( {
      'canvasId': 'matrix-override',
      'speed': '500'
    } );
  </script>
</html>
```
