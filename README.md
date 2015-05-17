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

# AUTHOR
koorchik (Viktor Turskyi)

# TODO

* Add support for all mystem grammemes

# BUGS
Please report any bugs or feature requests to Github https://github.com/koorchik/node-mystem3/issues

# LICENSE AND COPYRIGHT

Copyright 2015 Viktor Turskyi.

This program is free software; you can redistribute it and/or modify it under the terms of the the Artistic License (2.0). You may obtain a copy of the full license at:

http://www.perlfoundation.org/artistic_license_2_0

Any use, modification, and distribution of the Standard or Modified Versions is governed by this Artistic License. By using, modifying or distributing the Package, you accept this license. Do not use, modify, or distribute the Package, if you do not accept this license.

If your Modified Version has been derived from a Modified Version made by someone other than you, you are nevertheless required to ensure that your Modified Version complies with the requirements of this license.

This license does not grant you the right to use any trademark, service mark, tradename, or logo of the Copyright Holder.

This license includes the non-exclusive, worldwide, free-of-charge patent license to make, have made, use, offer to sell, sell, import and otherwise transfer the Package with respect to any patent claims licensable by the Copyright Holder that are necessarily infringed by the Package. If you institute patent litigation (including a cross-claim or counterclaim) against any party alleging that the Package constitutes direct or contributory patent infringement, then this Artistic License to you shall terminate on the date that such litigation is filed.

Disclaimer of Warranty: THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS' AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



