var assert = require('chai').assert;

var MyStem = require('../lib/MyStem');

test('Lemmatize known word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.lemmatize("немцы").then(function(lemma) {
        assert.equal( lemma, "немец");
    }).then(function() {
        myStem.stop();
        done();
    });
});


test('Lemmatize unknown word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.lemmatize("кркркрк").then(function(lemma) {
        assert.equal( lemma, "кркркрк");
    }).then(function() {
        myStem.stop();
        done();
    });
});

test('Lemmatize non word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.lemmatize("123яблоко").then(function(lemma) {
        assert.equal( lemma, "123яблоко");
    }).then(function() {
        myStem.stop();
        done();
    });
});