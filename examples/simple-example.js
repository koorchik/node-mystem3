'use strict';

var MyStem = require('../lib/MyStem');
var Promise = require('es6-promises');

var myStem = new MyStem();

myStem.start();

var words = ['карусели', 'немцы', 'печалька'];

var promises = words.map(function(word) {
    return myStem.lemmatize(word)
});

Promise.all(promises).then(function(lemmas) {
    console.log(lemmas);
    myStem.stop();
});
