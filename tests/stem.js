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

test('Fetch all grammemes known word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.fetchAllGrammemes("немцы").then(function(lemma) {
        /*
        Существительное, мужской род, одушевлённое, именительный падеж, множественное число
         */
        assert.deepEqual( lemma, ['немец', 'S', 'm', 'anim=nom', 'pl' ]);
    }).then(function() {
        myStem.stop();
        done();
    });
});

test('Fetch all grammemes non word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.fetchAllGrammemes("шоп78шол").then(function(lemma) {
        assert.equal( lemma, "шоп78шол");
    }).then(function() {
        myStem.stop();
        done();
    });
});

test('Fetch all grammemes unknown word', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.fetchAllGrammemes("хелоу").then(function(lemma) {
        assert.equal( lemma[0], "хелоу");
    }).then(function() {
        myStem.stop();
        done();
    });
});