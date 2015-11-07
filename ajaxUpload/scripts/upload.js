define(function(require, exports, module) {
    var $ = require('jquery');
    var upload = require('upload');

    var jscfg = {
        timestamp : Date.parse(new Date()),
        token     : 0
    }

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }

    upload({
        formData : {
            timestamp: jscfg.timestamp,
                token: jscfg.token
        },
        el     : '#file',
//        url    : 'php/upload.php',
//        url: 'http://w/php/upload.php',
        url: 'http://shareup.airnut.com/share/AirUp',
        methed : 'post',
        type   : 'jpg;png;docx;txt',
//        mulit  : 'true',
//        size   : '23',
        auto   : 'true',
        buttonText : 'a',
        //width  : '640',
        //height : '280',
        success: function(file, data) {
            var data = JSON.parse(data);
            console.log(data);
        },
        error  : function(error) {
            console.log(error);
        }

    });
});
