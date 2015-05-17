var assert = require('chai').assert;

var MyStem = require('../lib/MyStem');

test('Lemmatize', function(done) {
    var myStem = new MyStem();
    myStem.start();

    myStem.lemmatize("немцы").then(function(lemma) {
        assert.equal( lemma, "немец");
    }).then(function() {
        myStem.stop();
        done();
    });
});