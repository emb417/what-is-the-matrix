# What is the Matrix?

This was a fun project using random maths to replicate the Matrix digital rain visualization.  The initial implementation was a background for a website, but I tried to make it "modular" so it can be configured as a widget of sorts.

This repo has a basic implementation of the main function, whatIsTheMatrix, found in [index.js](./index.js).

The function takes an optional parameter, an override object [(see index.js)](./index.js).

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

### [Initialize Matrix with Override Values for New Charset](https://emb417.github.io/what-is-the-matrix/new-chars.html)
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
      'charset': ['A','B','C','X','Y','Z']
    } );
  </script>
</html>
```
