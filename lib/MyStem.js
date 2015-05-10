'use strict';

var Promise      = require('es6-promises');
var childProcess = require('child_process');
var readline     = require('readline');

function MyStem(args) {
    args = args || {};

    if (!args.path) {
        throw '[path] REQUIRED. Please provide path to mystem binary';
    }

    this.path = args.path;
    this.handlers = [];
}

MyStem.prototype = {
    start: function() {
        this.mystemProcess = childProcess.spawn(this.path, ['--format', 'json', '--eng-gr', '-i']);
        var rd = readline.createInterface({ input: this.mystemProcess.stdout, terminal: false });

        rd.on('line', function(line) {
            var handler = this.handlers.shift();

            if (handler) {
                var data = JSON.parse(line)
                handler.resolve( this._get_lemma(data) );
            }
        }.bind(this));

        this.mystemProcess.on('error', function(err) {
            var handler = this.handlers.shift();

            if (handler) {
                handler.reject(err);
            }
        }.bind(this));
    },

    stop: function() {
        if (this.mystemProcess) {
            this.mystemProcess.kill();
        }
    },

    lemmatize: function(word) {
        word = word.replace(/(\S+)\s+.*/, '$1'); // take only first word. TODO
        return new Promise(function(resolve, reject) {
            if (!this.mystemProcess) {
                throw 'You should call MyStem.start()';
            }

            this.mystemProcess.stdin.write(word + '\n');

            this.handlers.push({
                resolve: resolve,
                reject: reject
            });
        }.bind(this));
    },

    _get_lemma: function(data) {
        return data[0].analysis[0].lex;
    }
};


module.exports = MyStem;