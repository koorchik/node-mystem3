[![Build Status](https://travis-ci.org/koorchik/node-mystem3.svg)](https://travis-ci.org/koorchik/node-mystem3)

MyStem
------

This module contains a wrapper for an excellent morphological analyzer for Russian language Yandex Mystem 3.1 (3.0 for 32bit architectures). A morphological analyzer can perform lemmatization of text and derive a set of morphological attributes for each token.


This module start mystem as separate process and commucates with it. 
This allows to avoid process start overhead.

## Example

```javascript

var MyStem = require('mystem3');

var myStem = new MyStem();
myStem.start(); // Run mystem in separate process

myStem.lemmatize("немцы").then(function(lemma) {
    console.log(lemma);
}).then(function() {
    myStem.stop(); // Or you can write process.exit();
}).catch(console.error);

```

## Methods

### new MyStem(options)

Return myStem object. Supported options are:

1. "path" (optional, by default module downloads mystem binary itself) - path to mystem executable. If PATH env variable contains path to the folder with mystem binary then you can write ```new MyStem({"path": "mystem"})```

### myStem.start()

Starts mystem as separate process and establishes commucation with it. This gives huge performance boost. As we do not need to start mystem for every word

### myStem.stop()

Stops mystem process. Will be automatically stopped on process.exit();


### myStem.lemmatize(word)

Returns promise with lemmatized version for passed word

### myStem.extractAllGrammemes(word)

Returns promise with array of lemmatized version for passed word and all grammemes

## AUTHOR

@koorchik (Viktor Turskyi)

## CONTRIBUTORS

@bulgakovk

