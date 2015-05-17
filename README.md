[![Build Status](https://travis-ci.org/koorchik/node-mystem3.svg)](https://travis-ci.org/koorchik/node-mystem3)

MyStem
------

This module contains a wrapper for an excellent morphological analyzer for Russian language Yandex Mystem 3.0 released in June 2014. A morphological analyzer can perform lemmatization of text and derive a set of morphological attributes for each token.


This module start mystem as separate process and commucates with it. 
This allows to avoid process start overhead.

## Example

```javascript

var MyStem = require('node-mystem');

var myStem = new MyStem();
myStem.start(); // Run mystem in separate process

myStem.lemmatize("немцы").then(function(lemma) {
    console.log(lemma);
}).then(function() {
    myStem.stop(); // Stop mystem process
}).catch(console.error);

```