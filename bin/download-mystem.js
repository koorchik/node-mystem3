#!/usr/bin/env node

'use strict';

var fs      = require('fs');
var path    = require('path');
var mkdirp  = require('mkdirp');
var request = require('request');
var targz   = require('tar.gz');

var TARBALL_URLS = {
    'linux': {
        'ia32': "http://download.cdn.yandex.net/mystem/mystem-3.0-linux3.5-32bit.tar.gz",
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.0-linux3.1-64bit.tar.gz",
    },
    'darwin': {
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.0-macosx10.8.tar.gz"
    },
    'win32': {
        'ia32': "http://download.cdn.yandex.net/mystem/mystem-3.0-win7-32bit.zip",
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.0-win7-64bit.zip",
    },
    'freebsd': {
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.0-freebsd9.0-64bit.tar.gz",
    }
};

main();

function main() {
    var targetDir  = path.join(__dirname, '..', 'vendor', process.platform);
    var tmpFile    = path.join(targetDir, 'mystem.tar.gz');
    var url        = TARBALL_URLS[process.platform][process.arch];

    mkdirp(targetDir, function(err){
        if (err) throw err;

        downloadFile(url, tmpFile, function(err) {
            if (err) throw err;

            unzipFile(tmpFile, targetDir, function(err) {
                if (err) throw err;
                console.log('Unlink', tmpFile);
                fs.unlink(tmpFile);
            })
        });
    });
}

function downloadFile(url, dest, cb) {
    console.log('Downloading %s', url);
    var file = fs.createWriteStream(dest);

    var req = request.get(url);
    req.pipe(file).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });

    file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
    });
};

function unzipFile(src, dest, cb) {
    console.log('Extracting %s', src);

    new targz().extract(src, dest, cb);
}

