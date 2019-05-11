#!/usr/bin/env node

'use strict';

var fs      = require('fs');
var path    = require('path');
var mkdirp  = require('mkdirp');
var request = require('request');
var tar     = require('tar');
var extractZip = require('extract-zip');
var rimraf = require("rimraf");


// request = request.defaults({'proxy':'http://localhost:8080'})

var TARBALL_URLS = {
    'linux': {
        'ia32': "https://download.cdn.yandex.net/mystem/mystem-3.0-linux3.5-32bit.tar.gz",
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.1-linux-64bit.tar.gz",
    },
    'darwin': {
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.1-macosx.tar.gz"
    },
    'win32': {
        'ia32': "https://download.cdn.yandex.net/mystem/mystem-3.0-win7-32bit.zip",
        'x64': "http://download.cdn.yandex.net/mystem/mystem-3.1-win-64bit.zip",
    },
    'freebsd': {
        'x64': "https://download.cdn.yandex.net/mystem/mystem-3.0-freebsd9.0-64bit.tar.gz",
    }
};

main();

function main() {
    var targetDir  = path.join(__dirname, '..', 'vendor', process.platform);
    var tmpFile    = path.join(targetDir, 'mystem.tar.gz');
    var url        = TARBALL_URLS[process.platform][process.arch];
    var isZip      = url.match(/\.zip$/);

    console.log('Cleanup targetDir [%s]', targetDir);
    rimraf.sync(targetDir);

    mkdirp(targetDir, function(err){
        if (err) throw err;

        downloadFile(url, tmpFile, function(err) {
            if (err) throw err;

            extractFile(isZip, tmpFile, targetDir, function(err) {
                if (err) throw err;

                console.log('Unlink', tmpFile);

                fs.unlink(tmpFile, function(err) {
                    if (err) throw err;
                    console.log(`$tmpFile was deleted`);
                });
            });
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

function extractFile(isZip, src, dest, cb) {
    console.log('Extracting %s to %s', src, dest);

    if (isZip) {
        extractZip(src, {dir: dest}, cb);
    } else {
        tar.extract({ file: src,  cwd: dest }, null, cb);
    }
}
